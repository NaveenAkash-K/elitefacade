"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { FabStatItem, ProductionItem, QAFeatureItem } from "../types";
import { fetchFabrication, upsertFabrication } from "../utils/api";
import Image from "next/image";

/* ── icon palette ────────────────────────────────────────── */

const ICON_OPTIONS = [
  "precision_manufacturing",
  "architecture",
  "robot_2",
  "verified",
  "biotech",
  "data_object",
  "factory",
  "engineering",
  "settings",
  "build",
  "speed",
  "military_tech",
  "science",
  "memory",
  "shield",
  "monitoring",
  "analytics",
  "lightbulb",
];

/* ── factory helpers ─────────────────────────────── */

const createFabStat = (): FabStatItem => ({
  icon: "precision_manufacturing",
  label: "",
  value: "",
});

const createProduction = (): ProductionItem => ({
  id: crypto.randomUUID(),
  serverId: undefined,
  title: "",
  alt: "",
  imageFile: null,
  imagePreview: "",
  imageUrl: undefined,
});

const createQAFeature = (): QAFeatureItem => ({
  icon: "verified",
  title: "",
  description: "",
});

/* ── server → local mappers ──────────────────────────────── */

const mapFabStat = (doc: any): FabStatItem => ({
  serverId: doc._id,
  icon: doc.icon ?? "precision_manufacturing",
  label: doc.label ?? "",
  value: doc.value ?? "",
});

const mapProduction = (doc: any): ProductionItem => ({
  id: crypto.randomUUID(),
  serverId: doc._id,
  title: doc.title ?? "",
  alt: doc.alt ?? "",
  imageFile: null,
  imagePreview: doc.imageUrl ?? "",
  imageUrl: doc.imageUrl ?? "",
});

const mapQAFeature = (doc: any): QAFeatureItem => ({
  serverId: doc._id,
  icon: doc.icon ?? "verified",
  title: doc.title ?? "",
  description: doc.description ?? "",
});

/* ── component ───────────────────────────────────────────── */

export default function FabricationTab() {
  const [fabStats, setFabStats] = useState<FabStatItem[]>([]);
  const [productions, setProductions] = useState<ProductionItem[]>([]);
  const [qaFeatures, setQaFeatures] = useState<QAFeatureItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // FETCH ON MOUNT
  // ═════════════════════════════════════════════════════════

  useEffect(() => {
    (async () => {
      const res = await fetchFabrication();
      if (res.success && res.data) {
        const d = res.data;
        setFabStats(
          Array.isArray(d.stats) && d.stats.length
            ? d.stats.map(mapFabStat)
            : [createFabStat()]
        );
        setProductions(
          Array.isArray(d.items) && d.items.length
            ? d.items.map(mapProduction)
            : [createProduction()]
        );
        setQaFeatures(
          Array.isArray(d.qaFeatures) && d.qaFeatures.length
            ? d.qaFeatures.map(mapQAFeature)
            : [createQAFeature()]
        );
      } else {
        setFabStats([createFabStat()]);
        setProductions([createProduction()]);
        setQaFeatures([createQAFeature()]);
      }
      setLoading(false);
    })();
  }, []);

  // ═════════════════════════════════════════════════════════
  // STATS
  // ═════════════════════════════════════════════════════════

  const updateFabStat = (
    i: number,
    field: keyof FabStatItem,
    value: string
  ) => {
    setFabStats((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  };
  const addFabStat = () => setFabStats((prev) => [...prev, createFabStat()]);
  const removeFabStat = (i: number) =>
    setFabStats((prev) => prev.filter((_, idx) => idx !== i));

  // ═════════════════════════════════════════════════════════
  // PRODUCTION ITEMS
  // ═════════════════════════════════════════════════════════

  const updateProduction = (
    id: string,
    field: keyof ProductionItem,
    value: any
  ) => {
    setProductions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleProductionImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProductions((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, imageFile: file, imagePreview: preview }
          : p
      )
    );
  };

  const addProduction = () =>
    setProductions((prev) => [...prev, createProduction()]);
  const removeProduction = (id: string) =>
    setProductions((prev) => prev.filter((p) => p.id !== id));

  // ═════════════════════════════════════════════════════════
  // QA FEATURES
  // ═════════════════════════════════════════════════════════

  const updateQA = (i: number, field: keyof QAFeatureItem, value: string) => {
    setQaFeatures((prev) =>
      prev.map((q, idx) => (idx === i ? { ...q, [field]: value } : q))
    );
  };
  const addQA = () => setQaFeatures((prev) => [...prev, createQAFeature()]);
  const removeQA = (i: number) =>
    setQaFeatures((prev) => prev.filter((_, idx) => idx !== i));

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      // Collect only production items with a new image file
      const itemImages: { index: number; file: File }[] = [];
      productions.forEach((p, i) => {
        if (p.imageFile) {
          itemImages.push({ index: i, file: p.imageFile });
        }
      });

      const res = await upsertFabrication({
        stats: fabStats.map((s) => ({
          icon: s.icon,
          label: s.label,
          value: s.value,
        })),
        items: productions.map((p) => ({
          title: p.title,
          alt: p.alt,
        })),
        qaFeatures: qaFeatures.map((q) => ({
          icon: q.icon,
          title: q.title,
          description: q.description,
        })),
        itemImages,
      });

      if (!res.success) throw new Error(res.error || "Save failed");

      // Re-fetch to sync with server
      const fetched = await fetchFabrication();
      if (fetched.success && fetched.data) {
        const d = fetched.data;
        setFabStats(d.stats?.map(mapFabStat) ?? [createFabStat()]);
        setProductions(d.items?.map(mapProduction) ?? [createProduction()]);
        setQaFeatures(
          d.qaFeatures?.map(mapQAFeature) ?? [createQAFeature()]
        );
      }

      setMessage("Fabrication saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // ═════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════

  if (loading) {
    return (
      <div className={styles.tabContent}>
        <p>Loading fabrication…</p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <div>
          <h2>Fabrication</h2>
          <p>
            Manage fabrication stats, production items & QA features.
          </p>
        </div>
      </div>

      {/* ── 1. Fabrication Stats ──────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Fabrication Stats</h3>
          <button onClick={addFabStat} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Stat
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {fabStats.map((stat, index) => (
            <div key={index} className={styles.inlineRow}>
              <div className={styles.inlineRowFields}>
                <select
                  value={stat.icon}
                  onChange={(e) =>
                    updateFabStat(index, "icon", e.target.value)
                  }
                  className={styles.iconSelect}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) =>
                    updateFabStat(index, "value", e.target.value)
                  }
                  placeholder="e.g. ± 0.25mm"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) =>
                    updateFabStat(index, "label", e.target.value)
                  }
                  placeholder="e.g. Tolerance"
                  style={{ gridColumn: "1 / -1" }}
                />
              </div>
              <button
                onClick={() => removeFabStat(index)}
                className={styles.inlineRemoveBtn}
                disabled={fabStats.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Production Items ───────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Production Items</h3>
          <button onClick={addProduction} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Item
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {productions.map((item, index) => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <h3>Production #{index + 1}</h3>
                <button
                  onClick={() => removeProduction(item.id)}
                  className={styles.removeBtn}
                  disabled={productions.length === 1}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
              <div className={styles.itemCardBody}>
                {/* Image */}
                <div className={styles.imageUpload}>
                  <label className={styles.imageUploadLabel}>
                    {item.imagePreview ? (
                      <img src={item.imagePreview} alt="Preview" />
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
                        handleProductionImage(
                          item.id,
                          e.target.files?.[0] || null
                        )
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
                      value={item.title}
                      onChange={(e) =>
                        updateProduction(item.id, "title", e.target.value)
                      }
                      placeholder="e.g. Automated Milling"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Image Alt Text</label>
                    <input
                      type="text"
                      value={item.alt}
                      onChange={(e) =>
                        updateProduction(item.id, "alt", e.target.value)
                      }
                      placeholder="e.g. CNC milling station"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. QA Features ────────────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>QA Features</h3>
          <button onClick={addQA} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Feature
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {qaFeatures.map((qa, index) => (
            <div key={index} className={styles.inlineRow}>
              <div className={styles.inlineRowFields}>
                <select
                  value={qa.icon}
                  onChange={(e) =>
                    updateQA(index, "icon", e.target.value)
                  }
                  className={styles.iconSelect}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={qa.title}
                  onChange={(e) =>
                    updateQA(index, "title", e.target.value)
                  }
                  placeholder="e.g. Real-Time Monitoring"
                />
                <textarea
                  value={qa.description}
                  onChange={(e) =>
                    updateQA(index, "description", e.target.value)
                  }
                  placeholder="Feature description"
                  style={{ gridColumn: "1 / -1" }}
                />
              </div>
              <button
                onClick={() => removeQA(index)}
                className={styles.inlineRemoveBtn}
                disabled={qaFeatures.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Save ──────────────────────────────────────────── */}
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
          {saving ? "Saving..." : "Save Fabrication"}
        </button>
      </div>
    </div>
  );
}
