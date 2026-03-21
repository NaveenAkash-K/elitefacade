"use client";

import { useState } from "react";
import styles from "../page.module.scss";
import { ClientItem, StatItem } from "../types";
import { saveClients } from "../utils/api";

const createClient = (): ClientItem => ({
  id: crypto.randomUUID(),
  alt: "",
  imageFile: null,
  imagePreview: "",
});

const createStat = (): StatItem => ({
  value: "",
  label: "",
});

export default function ClientsTab() {
  const [clients, setClients] = useState<ClientItem[]>([createClient()]);
  const [stats, setStats] = useState<StatItem[]>([createStat()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // CLIENTS
  // ═════════════════════════════════════════════════════════

  const updateClient = (id: string, field: keyof ClientItem, value: any) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleClientImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, imageFile: file, imagePreview: preview } : c
      )
    );
  };

  const addClient = () => setClients((prev) => [...prev, createClient()]);

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // ═════════════════════════════════════════════════════════
  // STATS
  // ═════════════════════════════════════════════════════════

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const addStat = () => setStats((prev) => [...prev, createStat()]);

  const removeStat = (index: number) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const payload = {
      items: clients.map((c) => ({
        alt: c.alt,
        imageFile: c.imageFile,
      })),
      stats,
    };

    const result = await saveClients(payload);
    setMessage(
      result.success ? "Clients saved successfully!" : result.error || "Save failed"
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
          <h2>Clients</h2>
          <p>Manage client logos and partnership statistics.</p>
        </div>
        <button onClick={addClient} className={styles.addBtn}>
          <span className="material-symbols-outlined">add</span>
          Add Client
        </button>
      </div>

      {/* ── Client Logos ────────────────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Client Logos</h3>
        </div>
        <div className={styles.subSectionBody}>
          <div className={styles.itemsList}>
            {clients.map((client, index) => (
              <div key={client.id} className={styles.itemCard}>
                <div className={styles.itemCardHeader}>
                  <h3>Client #{index + 1}</h3>
                  <button
                    onClick={() => removeClient(client.id)}
                    className={styles.removeBtn}
                    disabled={clients.length === 1}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <div className={styles.itemCardBody}>
                  {/* Image */}
                  <div className={styles.imageUpload}>
                    <label className={styles.imageUploadLabel}>
                      {client.imagePreview ? (
                        <img src={client.imagePreview} alt="Preview" />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span className="material-symbols-outlined">cloud_upload</span>
                          <span>Upload Logo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleClientImage(client.id, e.target.files?.[0] || null)
                        }
                        hidden
                      />
                    </label>
                  </div>

                  {/* Fields */}
                  <div className={styles.fieldsGrid}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label>Alt / Company Name</label>
                      <input
                        type="text"
                        value={client.alt}
                        onChange={(e) =>
                          updateClient(client.id, "alt", e.target.value)
                        }
                        placeholder="e.g. Global architectural firm logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────── */}
      <div className={styles.subSection}>
        <div className={styles.subSectionHeader}>
          <h3>Partnership Stats</h3>
          <button onClick={addStat} className={styles.subSectionAddBtn}>
            <span className="material-symbols-outlined">add</span>
            Add Stat
          </button>
        </div>
        <div className={styles.subSectionBody}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.inlineRow}>
              <div className={styles.inlineRowFullFields}>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  placeholder="e.g. 500+"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="e.g. Projects Completed"
                />
              </div>
              <button
                onClick={() => removeStat(index)}
                className={styles.inlineRemoveBtn}
                disabled={stats.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
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
          {saving ? "Saving..." : "Save Clients"}
        </button>
      </div>
    </div>
  );
}