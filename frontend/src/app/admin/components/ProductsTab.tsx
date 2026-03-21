"use client";

import { useState } from "react";
import styles from "../page.module.scss";
import { ProductItem } from "../types";
import { saveProducts } from "../utils/api";

const createProduct = (): ProductItem => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  badge: "",
  specs: [""],
  imageFile: null,
  imagePreview: "",
});

export default function ProductsTab() {
  const [products, setProducts] = useState<ProductItem[]>([createProduct()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ─── Field Updates ───────────────────────────────────────
  const update = (id: string, field: keyof ProductItem, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, imageFile: file, imagePreview: preview } : p
      )
    );
  };

  // ─── Specs ───────────────────────────────────────────────
  const updateSpec = (id: string, index: number, value: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const specs = [...p.specs];
        specs[index] = value;
        return { ...p, specs };
      })
    );
  };

  const addSpec = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, specs: [...p.specs, ""] } : p
      )
    );
  };

  const removeSpec = (id: string, index: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, specs: p.specs.filter((_, i) => i !== index) };
      })
    );
  };

  // ─── Add / Remove Product ────────────────────────────────
  const addProduct = () => setProducts((prev) => [...prev, createProduct()]);

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── Save ────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const payload = {
      items: products.map((p) => ({
        title: p.title,
        description: p.description,
        badge: p.badge,
        specs: p.specs.filter((s) => s.trim()),
        imageFile: p.imageFile,
      })),
    };

    const result = await saveProducts(payload);
    setMessage(
      result.success ? "Products saved successfully!" : result.error || "Save failed"
    );
    setSaving(false);
    setTimeout(() => setMessage(""), 4000);
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <div>
          <h2>Products</h2>
          <p>Manage architectural façade system listings.</p>
        </div>
        <button onClick={addProduct} className={styles.addBtn}>
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      <div className={styles.itemsList}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <h3>Product #{index + 1}</h3>
              <button
                onClick={() => removeProduct(product.id)}
                className={styles.removeBtn}
                disabled={products.length === 1}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>

            <div className={styles.itemCardBody}>
              {/* Image */}
              <div className={styles.imageUpload}>
                <label className={styles.imageUploadLabel}>
                  {product.imagePreview ? (
                    <img src={product.imagePreview} alt="Preview" />
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
                      handleImage(product.id, e.target.files?.[0] || null)
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
                    value={product.title}
                    onChange={(e) => update(product.id, "title", e.target.value)}
                    placeholder="e.g. HG-800 Unitized Series"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Badge (optional)</label>
                  <input
                    type="text"
                    value={product.badge}
                    onChange={(e) => update(product.id, "badge", e.target.value)}
                    placeholder="e.g. Best Seller"
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Description</label>
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      update(product.id, "description", e.target.value)
                    }
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Specifications</label>
                  <div className={styles.specsList}>
                    {product.specs.map((spec, si) => (
                      <div key={si} className={styles.specItem}>
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) =>
                            updateSpec(product.id, si, e.target.value)
                          }
                          placeholder={`Spec ${si + 1}`}
                        />
                        <button
                          onClick={() => removeSpec(product.id, si)}
                          className={styles.specRemoveBtn}
                          disabled={product.specs.length === 1}
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addSpec(product.id)}
                      className={styles.addSpecBtn}
                    >
                      <span className="material-symbols-outlined">add</span>
                      Add Spec
                    </button>
                  </div>
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
          {saving ? "Saving..." : "Save Products"}
        </button>
      </div>
    </div>
  );
}