"use client";

import { useState } from "react";
import styles from "../page.module.scss";
import { ProjectItem } from "../types";
import { saveProjects } from "../utils/api";

const CATEGORIES = [
  "Exterior Facade",
  "Interior Systems",
  "Commercial Glass",
  "Specialized Engineering",
];

const createProject = (): ProjectItem => ({
  id: crypto.randomUUID(),
  title: "",
  category: CATEGORIES[0],
  location: "",
  alt: "",
  imageFile: null,
  imagePreview: "",
});

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([createProject()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ─── Field Updates ───────────────────────────────────────
  const update = (id: string, field: keyof ProjectItem, value: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, imageFile: file, imagePreview: preview } : p
      )
    );
  };

  // ─── Add / Remove ───────────────────────────────────────
  const addProject = () => setProjects((prev) => [...prev, createProject()]);

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── Save ────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const payload = {
      items: projects.map((p) => ({
        title: p.title,
        category: p.category,
        location: p.location,
        alt: p.alt,
        imageFile: p.imageFile,
      })),
    };

    const result = await saveProjects(payload);
    setMessage(
      result.success ? "Projects saved successfully!" : result.error || "Save failed"
    );
    setSaving(false);
    setTimeout(() => setMessage(""), 4000);
  };

  // ─── Render ──────────────────────────────────────────────
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
                      <span className="material-symbols-outlined">cloud_upload</span>
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
                    onChange={(e) => update(project.id, "title", e.target.value)}
                    placeholder="e.g. The Zenith Plaza"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={project.category}
                    onChange={(e) => update(project.id, "category", e.target.value)}
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
                    onChange={(e) => update(project.id, "location", e.target.value)}
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
              message.includes("success") ? styles.saveSuccess : styles.saveError
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