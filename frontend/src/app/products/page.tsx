"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.scss";
import { useProducts } from "@/hooks/useProducts";
import fallbackImage from "../../../public/placeholder-product.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getImageUrl(image: string): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

function ProductSkeleton() {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        <div className={`${styles.productImage} ${styles.skeleton}`} />
      </div>
      <div className={styles.productContent}>
        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonDesc}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonSpec}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonSpec}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonSpec}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonBtn}`} />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useProducts();

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const skeletons = useMemo(
    () => Array.from({ length: 6 }, (_, i) => <ProductSkeleton key={i} />),
    []
  );

  function getProductImageUrl(productId: string, image: string): string {
    if (failedImages.has(productId)) return fallbackImage.src;
    const resolved = getImageUrl(image);
    if (!resolved) return fallbackImage.src;
    return resolved;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h2 className={styles.pageTitle}>Architectural Façade Systems</h2>
              <p className={styles.pageDescription}>
                Precision-engineered building envelopes combining thermal
                efficiency, structural integrity, and aesthetic excellence for
                high-performance developments.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorState}>
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
            <button
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {loading
            ? skeletons
            : products.map((product) => {
                const bgUrl = getProductImageUrl(product.id, product.image);
                return (
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.productImageWrapper}>
                      <div
                        className={styles.productImage}
                        style={{
                          backgroundImage: `url(${bgUrl})`,
                        }}
                      >
                        {/* Hidden img to detect load errors and swap to fallback */}
                        <img
                          src={bgUrl}
                          alt=""
                          style={{ display: "none" }}
                          onError={() => {
                            setFailedImages((prev) => {
                              const next = new Set(prev);
                              next.add(product.id);
                              return next;
                            });
                          }}
                        />
                      </div>
                      {product.badge && (
                        <div className={styles.productBadge}>
                          <span>{product.badge}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.productContent}>
                      <h3 className={styles.productTitle}>{product.title}</h3>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                      <ul className={styles.productSpecs}>
                        {product.specs.map((spec, i) => (
                          <li key={i}>
                            <span className="material-symbols-outlined">
                              check_circle
                            </span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                      <button className={styles.productBtn}>
                        View Technical Details
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className={styles.emptyState}>
            <span className="material-symbols-outlined">inventory_2</span>
            <h3>No products found</h3>
            <p>No products are available at the moment.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && products.length > 0 && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationArrow}
              onClick={prevPage}
              disabled={currentPage <= 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className={styles.paginationText}>
              {currentPage} of {totalPages}
            </span>
            <button
              className={styles.paginationArrow}
              onClick={nextPage}
              disabled={currentPage >= totalPages}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}