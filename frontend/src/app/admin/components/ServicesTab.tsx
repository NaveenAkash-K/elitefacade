"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { RegionItem, PhaseItem, StepItem, WhyUsItem } from "../types";
import { fetchServices, upsertServices } from "../utils/api";
import Image from "next/image";

/* ── icon palette ────────────────────────────────────────── */

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

/* ── factory helpers ─────────────────────────────────────── */

const createRegion = (): RegionItem => ({
  icon: "public",
  title: "",
  description: "",
});

const createPhase = (): PhaseItem => ({
  id: crypto.randomUUID(),
  serverId: undefined,
  title: "",
  description: "",
  features: [""],
  imageFile: null,
  imagePreview: "",
  imageUrl: undefined,
});

const createStep = (): StepItem => ({
  title: "",
  description: "",
});

const createWhyUs = (): WhyUsItem => ({
  icon: "verified",
  title: "",
  description: "",
});

/* ── server → local mappers ──────────────────────────────── */

const mapRegion = (doc: any): RegionItem => ({
  serverId: doc._id,
  icon: doc.icon ?? "public",
  title: doc.title ?? "",
  description: doc.description ?? "",
});

const mapPhase = (doc: any): PhaseItem => ({
  id: crypto.randomUUID(),
  serverId: doc._id,
  title: doc.title ?? "",
  description: doc.description ?? "",
  features: doc.features?.length ? doc.features : [""],
  imageFile: null,
  imagePreview: doc.imageUrl ?? "",
  imageUrl: doc.imageUrl ?? "",
});

const mapStep = (doc: any): StepItem => ({
  serverId: doc._id,
  title: doc.title ?? "",
  description: doc.description ?? "",
});

const mapWhyUs = (doc: any): WhyUsItem => ({
  serverId: doc._id,
  icon: doc.icon ?? "verified",
  title: doc.title ?? "",
  description: doc.description ?? "",
});

/* ── component ───────────────────────────────────────────── */

export default function ServicesTab() {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [phases, setPhases] = useState<PhaseItem[]>([]);
  const [steps, setSteps] = useState<StepItem[]>([]);
  const [whyUs, setWhyUs] = useState<WhyUsItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // FETCH ON MOUNT
  // ═════════════════════════════════════════════════════════

  useEffect(() => {
    (async () => {
      const res = await fetchServices();
      if (res.success && res.data) {
        const d = res.data;
        setRegions(
          Array.isArray(d.regions) && d.regions.length
            ? d.regions.map(mapRegion)
            : [createRegion()]
        );
        setPhases(
          Array.isArray(d.phases) && d.phases.length
            ? d.phases.map(mapPhase)
            : [createPhase()]
        );
        setSteps(
          Array.isArray(d.steps) && d.steps.length
            ? d.steps.map(mapStep)
            : [createStep()]
        );
        setWhyUs(
          Array.isArray(d.whyUs) && d.whyUs.length
            ? d.whyUs.map(mapWhyUs)
            : [createWhyUs()]
        );
      } else {
        setRegions([createRegion()]);
        setPhases([createPhase()]);
        setSteps([createStep()]);
        setWhyUs([createWhyUs()]);
      }
      setLoading(false);
    })();
  }, []);

  // ═════════════════════════════════════════════════════════
  // REGIONS
  // ═════════════════════════════════════════════════════════

  const updateRegion = (i: number, field: keyof RegionItem, value: string) => {
    setRegions((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    );
  };
  const addRegion = () => setRegions((prev) => [...prev, createRegion()]);
  const removeRegion = (i: number) =>
    setRegions((prev) => prev.filter((_, idx) => idx !== i));

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

  const updateFeature = (id: string, fi: number, value: string) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const features = [...p.features];
        features[fi] = value;
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

  const removeFeature = (id: string, fi: number) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, features: p.features.filter((_, i) => i !== fi) };
      })
    );
  };

  const addPhase = () => setPhases((prev) => [...prev, createPhase()]);
  const removePhase = (id: string) =>
    setPhases((prev) => prev.filter((p) => p.id !== id));

  // ═════════════════════════════════════════════════════════
  // STEPS
  // ═════════════════════════════════════════════════════════

  const updateStep = (i: number, field: keyof StepItem, value: string) => {
    setSteps((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  };
  const addStep = () => setSteps((prev) => [...prev, createStep()]);
  const removeStep = (i: number) =>
    setSteps((prev) => prev.filter((_, idx) => idx !== i));

  // ═════════════════════════════════════════════════════════
  // WHY US
  // ═════════════════════════════════════════════════════════

  const updateWhyUsItem = (
    i: number,
    field: keyof WhyUsItem,
    value: string
  ) => {
    setWhyUs((prev) =>
      prev.map((w, idx) => (idx === i ? { ...w, [field]: value } : w))
    );
  };
  const addWhyUs = () => setWhyUs((prev) => [...prev, createWhyUs()]);
  const removeWhyUs = (i: number) =>
    setWhyUs((prev) => prev.filter((_, idx) => idx !== i));

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      // Build phase images array — only phases with a new file
      const phaseImages: { index: number; file: File }[] = [];
      phases.forEach((p, i) => {
        if (p.imageFile) {
          phaseImages.push({ index: i, file: p.imageFile });
        }
      });

      const res = await upsertServices({
        regions: regions.map((r) => ({
          icon: r.icon,
          title: r.title,
          description: r.description,
        })),
        phases: phases.map((p) => ({
          title: p.title,
          description: p.description,
          features: p.features.filter((f) => f.trim()),
        })),
        steps: steps.map((s) => ({
          title: s.title,
          description: s.description,
        })),
        whyUs: whyUs.map((w) => ({
          icon: w.icon,
          title: w.title,
          description: w.description,
        })),
        phaseImages,
      });

      if (!res.success) throw new Error(res.error || "Save failed");

      // Re-fetch to sync with server
      const fetched = await fetchServices();
      if (fetched.success && fetched.data) {
        const d = fetched.data;
        setRegions(d.regions?.map(mapRegion) ?? [createRegion()]);
        setPhases(d.phases?.map(mapPhase) ?? [createPhase()]);
        setSteps(d.steps?.map(mapStep) ?? [createStep()]);
        setWhyUs(d.whyUs?.map(mapWhyUs) ?? [createWhyUs()]);
      }

      setMessage("Services saved successfully!");
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
        <p>Loading services…</p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <div>
          <h2>Services</h2>
          <p>Manage service page — regions, phases, steps & why-us.</p>
        </div>
      </div>

      {/* ── 1. Global Regions ─────────────────────────────── */}
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
                  onChange={(e) =>
                    updateRegion(index, "icon", e.target.value)
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
                  value={region.title}
                  onChange={(e) =>
                    updateRegion(index, "title", e.target.value)
                  }
                  placeholder="Region title"
                />
                <textarea
                  value={region.description}
                  onChange={(e) =>
                    updateRegion(index, "description", e.target.value)
                  }
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

      {/* ── 2. Solution Phases ────────────────────────────── */}
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
                {/* Image */}
                <div className={styles.imageUpload}>
                  <label className={styles.imageUploadLabel}>
                    {phase.imagePreview ? (
                      <img src={phase.imagePreview} alt="Preview" />
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
                        handlePhaseImage(
                          phase.id,
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
                      value={phase.title}
                      onChange={(e) =>
                        updatePhase(phase.id, "title", e.target.value)
                      }
                      placeholder="e.g. Technical Consultation"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label> </label>
                    <span />
                  </div>
                  <div
                    className={`${styles.formGroup} ${styles.fullWidth}`}
                  >
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
                  <div
                    className={`${styles.formGroup} ${styles.fullWidth}`}
                  >
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
                            <span className="material-symbols-outlined">
                              close
                            </span>
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

      {/* ── 3. Process Steps ──────────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Process Steps</h3>
          <button onClick={addStep} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Step
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {steps.map((step, index) => (
            <div key={index} className={styles.inlineRow}>
              <div className={styles.inlineRowFullFields}>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, "title", e.target.value)
                  }
                  placeholder="Step title"
                />
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) =>
                    updateStep(index, "description", e.target.value)
                  }
                  placeholder="Step description"
                />
              </div>
              <button
                onClick={() => removeStep(index)}
                className={styles.inlineRemoveBtn}
                disabled={steps.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Why Us ─────────────────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Why Us</h3>
          <button onClick={addWhyUs} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Item
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {whyUs.map((item, index) => (
            <div key={index} className={styles.inlineRow}>
              <div className={styles.inlineRowFields}>
                <select
                  value={item.icon}
                  onChange={(e) =>
                    updateWhyUsItem(index, "icon", e.target.value)
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
                  value={item.title}
                  onChange={(e) =>
                    updateWhyUsItem(index, "title", e.target.value)
                  }
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    updateWhyUsItem(index, "description", e.target.value)
                  }
                  placeholder="Description"
                  style={{ gridColumn: "1 / -1" }}
                />
              </div>
              <button
                onClick={() => removeWhyUs(index)}
                className={styles.inlineRemoveBtn}
                disabled={whyUs.length === 1}
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
          {saving ? "Saving..." : "Save Services"}
        </button>
      </div>
    </div>
  );
}
