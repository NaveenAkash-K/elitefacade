"use client";

import { useState } from "react";
import styles from "../page.module.scss";
import { RegionItem, PhaseItem } from "../types";
import { saveServices } from "../utils/api";

const createRegion = (): RegionItem => ({
  icon: "public",
  title: "",
  description: "",
});

const createPhase = (): PhaseItem => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  features: [""],
  imageFile: null,
  imagePreview: "",
});

const ICON_OPTIONS = [
  "public",
  "architecture",
  "apartment",
  "precision_manufacturing",
  "analytics",
  "eco",
  "verified",
  "engineering",
  "biotech",
  "data_object",
  "settings",
  "lightbulb",
  "rocket_launch",
  "shield",
  "speed",
];

export default function ServicesTab() {
  const [regions, setRegions] = useState<RegionItem[]>([createRegion()]);
  const [phases, setPhases] = useState<PhaseItem[]>([createPhase()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // REGIONS
  // ═════════════════════════════════════════════════════════

  const updateRegion = (index: number, field: keyof RegionItem, value: string) => {
    setRegions((prev) =>
        prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRegion = () => setRegions((prev) => [...prev, createRegion()]);

  const removeRegion = (index: number) => {
    setRegions((prev) => prev.filter((_, i) => i !== index));
  };

  // ═════════════════════════════════════════════════════════
  // PHASES
  // ═════════════════════════════════════════════════════════

  const updatePhase = (id: string, field: keyof PhaseItem, value: any) => {
    setPhases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handlePhaseImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPhases((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, imageFile: file, imagePreview: preview } : p
        )
    );
  };

  const updateFeature = (id: string, index: number, value: string) => {
    setPhases((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const features = [...p.features];
          features[index] = value;
          return { ...p, features };
        })
    );
  };

  const addFeature = (id: string) => {
    setPhases((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, features: [...p.features, ""] } : p
        )
    );
  };

  const removeFeature = (id: string, index: number) => {
    setPhases((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          return { ...p, features: p.features.filter((_, i) => i !== index) };
        })
    );
  };

  const addPhase = () => setPhases((prev) => [...prev, createPhase()]);

  const removePhase = (id: string) => {
    setPhases((prev) => prev.filter((p) => p.id !== id));
  };

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const payload = {
      regions,
      items: phases.map((p) => ({
        title: p.title,
        description: p.description,
        features: p.features.filter((f) => f.trim()),
        imageFile: p.imageFile,
      })),
    };

    const result = await saveServices(payload);
    setMessage(
        result.success ? "Services saved successfully!" : result.error || "Save failed"
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
            <h2>Services</h2>
            <p>Manage service page global regions and solution phases.</p>
          </div>
        </div>

        {/* ── Regions ─────────────────────────────────────────── */}
        <div className={styles.subSection}>
          <div className={styles.subSectionHeader}>
            <h3>Global Regions</h3>
            <button onClick={addRegion} className={styles.subSectionAddBtn}>
              <span className="material-symbols-outlined">add</span>
              Add Region
            </button>
          </div>
          <div className={styles.subSectionBody}>
            {regions.map((region, index) => (
                <div key={index} className={styles.inlineRow}>
                  <div className={styles.inlineRowFields}>
                    <select
                        value={region.icon}
                        onChange={(e) => updateRegion(index, "icon", e.target.value)}
                        className={styles.iconSelect}
                    >
                      {ICON_OPTIONS.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <input
                        type="text"
                        value={region.title}
                        onChange={(e) => updateRegion(index, "title", e.target.value)}
                        placeholder="Region title"
                    />
                    <textarea
                        value={region.description}
                        onChange={(e) => updateRegion(index, "description", e.target.value)}
                        placeholder="Region description"
                        style={{ gridColumn: "1 / -1" }}
                    />
                  </div>
                  <button
                      onClick={() => removeRegion(index)}
                      className={styles.inlineRemoveBtn}
                      disabled={regions.length === 1}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
            ))}
          </div>
        </div>

        {/* ── Solution Phases ─────────────────────────────────── */}
        <div className={styles.subSection}>
          <div className={styles.subSectionHeader}>
            <h3>Solution Phases</h3>
            <button onClick={addPhase} className={styles.subSectionAddBtn}>
              <span className="material-symbols-outlined">add</span>
              Add Phase
            </button>
          </div>
          <div className={styles.subSectionBody}>
            {phases.map((phase, index) => (
                <div key={phase.id} className={styles.itemCard}>
                  <div className={styles.itemCardHeader}>
                    <h3>Phase #{index + 1}</h3>
                    <button
                        onClick={() => removePhase(phase.id)}
                        className={styles.removeBtn}
                        disabled={phases.length === 1}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className={styles.itemCardBody}>
                    <div className={styles.imageUpload}>
                      <label className={styles.imageUploadLabel}>
                        {phase.imagePreview ? (
                            <img src={phase.imagePreview} alt="Preview" />
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
                                handlePhaseImage(phase.id, e.target.files?.[0] || null)
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
                            value={phase.title}
                            onChange={(e) => updatePhase(phase.id, "title", e.target.value)}
                            placeholder="e.g. Technical Consultation"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>&nbsp;</label>
                        <span />
                      </div>
                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Description</label>
                        <textarea
                            value={phase.description}
                            onChange={(e) =>
                                updatePhase(phase.id, "description", e.target.value)
                            }
                            placeholder="Phase description..."
                            rows={2}
                        />
                      </div>
                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Features</label>
                        <div className={styles.specsList}>
                          {phase.features.map((feat, fi) => (
                              <div key={fi} className={styles.specItem}>
                                <input
                                    type="text"
                                    value={feat}
                                    onChange={(e) =>
                                        updateFeature(phase.id, fi, e.target.value)
                                    }
                                    placeholder={`Feature ${fi + 1}`}
                                />
                                <button
                                    onClick={() => removeFeature(phase.id, fi)}
                                    className={styles.specRemoveBtn}
                                    disabled={phase.features.length === 1}
                                >
                                  <span className="material-symbols-outlined">close</span>
                                </button>
                              </div>
                          ))}
                          <button
                              onClick={() => addFeature(phase.id)}
                              className={styles.addSpecBtn}
                          >
                            <span className="material-symbols-outlined">add</span>
                            Add Feature
                          </button>
                        </div>
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
            {saving ? "Saving..." : "Save Services"}
          </button>
        </div>
      </div>
  );
}
