"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { ClientItem } from "../types";
import {
  fetchClients,
  createClients,
  updateClient,
  deleteClient,
} from "../utils/api";
import Image from "next/image";

/* ── helpers ─────────────────────────────────────────────── */

const createClient = (): ClientItem => ({
  id: crypto.randomUUID(),
  serverId: undefined,
  name: "",
  alt: "",
  showInHomePage: true,
  imageFile: null,
  imagePreview: "",
  imageUrl: undefined,
  isDirty: false,
});

/** Map a backend document to local state */
const mapServerClient = (doc: any): ClientItem => ({
  id: crypto.randomUUID(),
  serverId: doc._id,
  name: doc.name ?? "",
  alt: doc.alt ?? "",
  showInHomePage: doc.showInHomePage ?? true,
  imageFile: null,
  imagePreview: doc.imageUrl ?? "",
  imageUrl: doc.imageUrl ?? "",
  isDirty: false,
});

/* ── component ───────────────────────────────────────────── */

export default function ClientsTab() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [deletedServerIds, setDeletedServerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ═════════════════════════════════════════════════════════
  // FETCH ON MOUNT
  // ═════════════════════════════════════════════════════════

  useEffect(() => {
    (async () => {
      const res = await fetchClients();
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(mapServerClient);
        setClients(mapped.length ? mapped : [createClient()]);
      } else {
        setClients([createClient()]);
      }
      setLoading(false);
    })();
  }, []);

  // ═════════════════════════════════════════════════════════
  // FIELD UPDATES
  // ═════════════════════════════════════════════════════════

  const update = (id: string, field: keyof ClientItem, value: any) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value, isDirty: true } : c
      )
    );
  };

  const handleClientImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, imageFile: file, imagePreview: preview, isDirty: true }
          : c
      )
    );
  };

  // ═════════════════════════════════════════════════════════
  // ADD / REMOVE
  // ═════════════════════════════════════════════════════════

  const addClient = () => setClients((prev) => [...prev, createClient()]);

  const removeClient = (id: string) => {
    const target = clients.find((c) => c.id === id);
    if (target?.serverId) {
      setDeletedServerIds((prev) => [...prev, target.serverId!]);
    }
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // ═════════════════════════════════════════════════════════
  // SAVE
  // ═════════════════════════════════════════════════════════

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      // 1. Delete removed existing clients
      for (const sid of deletedServerIds) {
        const res = await deleteClient(sid);
        if (!res.success) throw new Error(`Delete failed for ${sid}`);
      }

      // 2. Separate new vs existing-dirty clients
      const newClients = clients.filter((c) => !c.serverId);
      const dirtyExisting = clients.filter((c) => c.serverId && c.isDirty);

      // 3. Bulk-create new clients
      if (newClients.length > 0) {
        const res = await createClients(
          newClients.map((c) => ({
            name: c.name,
            alt: c.alt,
            showInHomePage: c.showInHomePage,
            imageFile: c.imageFile,
          }))
        );
        if (!res.success) throw new Error(res.error || "Create failed");
      }

      // 4. Patch each modified existing client
      for (const c of dirtyExisting) {
        const res = await updateClient(c.serverId!, {
          name: c.name,
          alt: c.alt,
          showInHomePage: c.showInHomePage,
          imageFile: c.imageFile,
        });
        if (!res.success)
          throw new Error(res.error || `Update failed for ${c.serverId}`);
      }

      // 5. Re-fetch to sync state with server
      const fetched = await fetchClients();
      if (fetched.success && Array.isArray(fetched.data)) {
        setClients(fetched.data.map(mapServerClient));
      }

      setDeletedServerIds([]);
      setMessage("Clients saved successfully!");
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
        <p>Loading clients…</p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <div>
          <h2>Clients</h2>
          <p>Manage client logos and homepage visibility.</p>
        </div>
        <button onClick={addClient} className={styles.addBtn}>
          <span className="material-symbols-outlined">add</span>
          Add Client
        </button>
      </div>

      {/* ── Client Logos ────────────────────────────────────── */}
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
                      <span className="material-symbols-outlined">
                        cloud_upload
                      </span>
                      <span>Upload Logo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleClientImage(
                        client.id,
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
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={client.name}
                    onChange={(e) =>
                      update(client.id, "name", e.target.value)
                    }
                    placeholder="e.g. Skanska Group"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Image Alt Text</label>
                  <input
                    type="text"
                    value={client.alt}
                    onChange={(e) =>
                      update(client.id, "alt", e.target.value)
                    }
                    placeholder="e.g. Skanska Group logo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Show on Homepage</label>
                  <select
                    value={client.showInHomePage ? "true" : "false"}
                    onChange={(e) =>
                      update(
                        client.id,
                        "showInHomePage",
                        e.target.value === "true"
                      )
                    }
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Save ────────────────────────────────────────────── */}
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
          {saving ? "Saving..." : "Save Clients"}
        </button>
      </div>
    </div>
  );
}