"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { ProjectItem } from "../types";
import {
  fetchProjects,
  createProjects,
  updateProject,
  deleteProject,
} from "../utils/api";
import Image from "next/image";

/* ── constants ───────────────────────────────────────────── */

const CATEGORIES = [
  "Exterior Facade",
  "Interior Systems",
  "Commercial Glass",
  "Specialized Engineering",
];

/* ── helpers ─────────────────────────────────────────────── */

const createProject = (): ProjectItem => ({
  id: crypto.randomUUID(),
  serverId: undefined,
  title: "",
  category: CATEGORIES[0],
  location: "",
  alt: "",
  imageFile: null,
  imagePreview: "",
  imageUrl: undefined,
  isDirty: false,
});

/** Map a backend document to local state */
const mapServerProject = (doc: any): ProjectItem => ({
  id: crypto.randomUUID(),
  serverId: doc._id,
  title: doc.title ?? "",
  category: doc.category ?? CATEGORIES[0],
  location: doc.location ?? "",
  alt: doc.alt ?? "",
  imageFile: null,
  imagePreview: doc.imageUrl ?? "",
  imageUrl: doc.imageUrl ?? "",
  isDirty: false,
});

/* ── component ───────────────────────────────────────────── */

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [deletedServerIds, setDeletedServerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ─── Fetch on mount ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      const res = await fetchProjects();
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(mapServerProject);
        setProjects(mapped.length ? mapped : [createProject()]);
      } else {
        setProjects([createProject()]);
      }
      setLoading(false);
    })();
  }, []);

  // ─── Field Updates ───────────────────────────────────────
  const update = (id: string, field: keyof ProjectItem, value: any) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value, isDirty: true } : p
      )
    );
  };

  const handleImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, imageFile: file, imagePreview: preview, isDirty: true }
          : p
      )
    );
  };

  // ─── Add / Remove ───────────────────────────────────────
  const addProject = () => setProjects((prev) => [...prev, createProject()]);

  const removeProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (target?.serverId) {
      setDeletedServerIds((prev) => [...prev, target.serverId!]);
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── Save ────────────────────────────────────────────────
  const handleSave = async () => {
    const invalid = projects.find((p) => !p.title.trim());
    if (invalid) {
      setMessage("Title is required for all projects.");
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      // 1. Delete removed existing projects
      for (const sid of deletedServerIds) {
        const res = await deleteProject(sid);
        if (!res.success) throw new Error(`Delete failed for ${sid}`);
      }

      // 2. Separate new vs existing-dirty projects
      const newProjects = projects.filter((p) => !p.serverId);
      const dirtyExisting = projects.filter((p) => p.serverId && p.isDirty);

      // 3. Bulk-create new projects
      if (newProjects.length > 0) {
        const res = await createProjects(
          newProjects.map((p) => ({
            title: p.title,
            category: p.category,
            location: p.location,
            alt: p.alt,
            imageFile: p.imageFile,
          }))
        );
        if (!res.success) throw new Error(res.error || "Create failed");
      }

      // 4. Patch each modified existing project
      for (const p of dirtyExisting) {
        const res = await updateProject(p.serverId!, {
          title: p.title,
          category: p.category,
          location: p.location,
          alt: p.alt,
          imageFile: p.imageFile,
        });
        if (!res.success)
          throw new Error(res.error || `Update failed for ${p.serverId}`);
      }

      // 5. Re-fetch to sync state with server
      const fetched = await fetchProjects();
      if (fetched.success && Array.isArray(fetched.data)) {
        setProjects(fetched.data.map(mapServerProject));
      }

      setDeletedServerIds([]);
      setMessage("Projects saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // ─── Render ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.tabContent}>
        <p>Loading projects…</p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <div>
          <h2>Projects</h2>
          <p>Manage portfolio project entries.</p>
        </div>
        <button onClick={addProject} className={styles.addBtn}>
          <span className="material-symbols-outlined">add</span>
          Add Project
        </button>
      </div>

      <div className={styles.itemsList}>
        {projects.map((project, index) => (
          <div key={project.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <h3>Project #{index + 1}</h3>
              <button
                onClick={() => removeProject(project.id)}
                className={styles.removeBtn}
                disabled={projects.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>

            <div className={styles.itemCardBody}>
              {/* Image */}
              <div className={styles.imageUpload}>
                <label className={styles.imageUploadLabel}>
                  {project.imagePreview ? (
                    <img src={project.imagePreview} alt="Preview" />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span className="material-symbols-outlined">
                        cloud_upload
                      </span>
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImage(project.id, e.target.files?.[0] || null)
                    }
                    hidden
                  />
                </label>
              </div>

              {/* Fields */}
              <div className={styles.fieldsGrid}>
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      update(project.id, "title", e.target.value)
                    }
                    placeholder="e.g. The Zenith Plaza"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={project.category}
                    onChange={(e) =>
                      update(project.id, "category", e.target.value)
                    }
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={project.location}
                    onChange={(e) =>
                      update(project.id, "location", e.target.value)
                    }
                    placeholder="e.g. Dubai, UAE"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Image Alt Text</label>
                  <input
                    type="text"
                    value={project.alt}
                    onChange={(e) => update(project.id, "alt", e.target.value)}
                    placeholder="e.g. Corporate Tower Facade"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <div className={styles.saveBar}>
        {message && (
          <span
            className={`${styles.saveMessage} ${
              message.includes("success")
                ? styles.saveSuccess
                : styles.saveError
            }`}
          >
            {message}
          </span>
        )}
        <button
          onClick={handleSave}
          className={styles.saveBtn}
          disabled={saving}
        >
          <span className="material-symbols-outlined">save</span>
          {saving ? "Saving..." : "Save Projects"}
        </button>
      </div>
    </div>
  );
}