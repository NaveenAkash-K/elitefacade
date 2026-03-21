"use client";

import { useState } from "react";
import styles from "../page.module.scss";
import { FabStatItem, ProductionItem } from "../types";
import { saveFabrication } from "../utils/api";

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
];

const createFabStat = (): FabStatItem => ({
  icon: "precision_manufacturing",
  label: "",
  value: "",
});

const createProduction = (): ProductionItem => ({
  id: crypto.randomUUID(),
  title: "",
  alt: "",
  imageFile: null,
  imagePreview: "",
});

export default function FabricationTab() {
  const [fabStats, setFabStats] = useState<FabStatItem[]>([createFabStat()]);
  const [productions, setProductions] = useState<ProductionItem[]>([createProduction()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // STATS
  // ═════════════════════════════════════════════════════════

  const updateFabStat = (index: number, field: keyof FabStatItem, value: string) => {
    setFabStats((prev) =>
        prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const addFabStat = () => setFabStats((prev) => [...prev, createFabStat()]);

  const removeFabStat = (index: number) => {
    setFabStats((prev) => prev.filter((_, i) => i !== index));
  };

  // ═════════════════════════════════════════════════════════
  // PRODUCTION ITEMS
  // ═════════════════════════════════════════════════════════

  const updateProduction = (id: string, field: keyof ProductionItem, value: any) => {
    setProductions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleProductionImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProductions((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, imageFile: file, imagePreview: preview } : p
        )
    );
  };

  const addProduction = () => setProductions((prev) => [...prev, createProduction()]);

  const removeProduction = (id: string) => {
    setProductions((prev) => prev.filter((p) => p.id !== id));
  };

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const payload = {
      stats: fabStats,
      items: productions.map((p) => ({
        title: p.title,
        alt: p.alt,
        imageFile: p.imageFile,
      })),
    };

    const result = await saveFabrication(payload);
    setMessage(
        result.success ? "Fabrication saved successfully!" : result.error || "Save failed"
    );
    setSaving(false);
    setTimeout(() => setMessage(""), 4000);
  };

  // ═════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════

  return (
      <div className={styles.tabContent}>
        <div className={styles.tabHeader}>
          <div>
            <h2>Fabrication</h2>
            <p>Manage fabrication stats and production items.</p>
          </div>
        </div>

        {/* ── Stats ───────────────────────────────────────────── */}
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
                        onChange={(e) => updateFabStat(index, "icon", e.target.value)}
                        className={styles.iconSelect}
                    >
                      {ICON_OPTIONS.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateFabStat(index, "value", e.target.value)}
                        placeholder="e.g. ± 0.25mm"
                    />
                    <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateFabStat(index, "label", e.target.value)}
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

        {/* ── Production Items ────────────────────────────────── */}
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
                    <div className={styles.imageUpload}>
                      <label className={styles.imageUploadLabel}>
                        {item.imagePreview ? (
                            <img src={item.imagePreview} alt="Preview" />
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
                                handleProductionImage(item.id, e.target.files?.[0] || null)
                            }
                            hidden
                        />
                      </label>
                    </div>
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

        {/* ── Save ────────────────────────────────────────────── */}
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
            {saving ? "Saving..." : "Save Fabrication"}
          </button>
        </div>
      </div>
  );
}
