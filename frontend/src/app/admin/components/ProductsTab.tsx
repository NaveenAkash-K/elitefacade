"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";
import { ProductItem } from "../types";
import {
  fetchProducts,
  createProducts,
  updateProduct,
  deleteProduct,
} from "../utils/api";
import Image from "next/image";

/* ── helpers ─────────────────────────────────────────────── */

const createProduct = (): ProductItem => ({
  id: crypto.randomUUID(),
  serverId: undefined,
  title: "",
  description: "",
  badge: "",
  specs: [""],
  imageFile: null,
  imagePreview: "",
  imageUrl: undefined,
  isDirty: false,
});

/** Map a backend document to local state */
const mapServerProduct = (doc: any): ProductItem => ({
  id: crypto.randomUUID(),
  serverId: doc._id,
  title: doc.title ?? "",
  description: doc.description ?? "",
  badge: doc.badge ?? "",
  specs: doc.specs?.length ? doc.specs : [""],
  imageFile: null,
  imagePreview: doc.imageUrl ?? "",
  imageUrl: doc.imageUrl ?? "",
  isDirty: false,
});

/* ── component ───────────────────────────────────────────── */

export default function ProductsTab() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [deletedServerIds, setDeletedServerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ─── Fetch on mount ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      const res = await fetchProducts();
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(mapServerProduct);
        setProducts(mapped.length ? mapped : [createProduct()]);
      } else {
        setProducts([createProduct()]);
      }
      setLoading(false);
    })();
  }, []);

  // ─── Field Updates ───────────────────────────────────────
  const update = (id: string, field: keyof ProductItem, value: any) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value, isDirty: true } : p
      )
    );
  };

  const handleImage = (id: string, file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, imageFile: file, imagePreview: preview, isDirty: true }
          : p
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
        return { ...p, specs, isDirty: true };
      })
    );
  };

  const addSpec = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, specs: [...p.specs, ""], isDirty: true } : p
      )
    );
  };

  const removeSpec = (id: string, index: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, specs: p.specs.filter((_, i) => i !== index), isDirty: true };
      })
    );
  };

  // ─── Add / Remove Product ────────────────────────────────
  const addProduct = () => setProducts((prev) => [...prev, createProduct()]);

  const removeProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (target?.serverId) {
      setDeletedServerIds((prev) => [...prev, target.serverId!]);
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── Save ────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      // 1. Delete removed existing products
      for (const sid of deletedServerIds) {
        const res = await deleteProduct(sid);
        if (!res.success) throw new Error(`Delete failed for ${sid}`);
      }

      // 2. Separate new vs existing-dirty products
      const newProducts = products.filter((p) => !p.serverId);
      const dirtyExisting = products.filter((p) => p.serverId && p.isDirty);

      // 3. Bulk-create new products
      if (newProducts.length > 0) {
        const res = await createProducts(
          newProducts.map((p) => ({
            title: p.title,
            description: p.description,
            badge: p.badge,
            specs: p.specs.filter((s) => s.trim()),
            imageFile: p.imageFile,
          }))
        );
        if (!res.success) throw new Error(res.error || "Create failed");
      }

      // 4. Patch each modified existing product
      for (const p of dirtyExisting) {
        const res = await updateProduct(p.serverId!, {
          title: p.title,
          description: p.description,
          badge: p.badge,
          specs: p.specs.filter((s) => s.trim()),
          imageFile: p.imageFile,
        });
        if (!res.success) throw new Error(res.error || `Update failed for ${p.serverId}`);
      }

      // 5. Re-fetch to sync state with server
      const fetched = await fetchProducts();
      if (fetched.success && Array.isArray(fetched.data)) {
        setProducts(fetched.data.map(mapServerProduct));
      }

      setDeletedServerIds([]);
      setMessage("Products saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // ─── Render ──────────────────────────────────────────────
  if (loading) {
    return <div className={styles.tabContent}><p>Loading products…</p></div>;
  }

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