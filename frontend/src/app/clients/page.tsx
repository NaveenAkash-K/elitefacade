"use client";

import styles from "./page.module.scss";
import { useClients } from "@/hooks/useClients";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const PLACEHOLDER_IMAGE = "/placeholder-project.jpg";

const STATS_DATA = [
  { value: "500+", label: "Projects Completed" },
  { value: "40+", label: "Global Partners" },
  { value: "15", label: "Industry Awards" },
];

function getImageUrl(image: string): string {
  if (!image) return PLACEHOLDER_IMAGE;
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

export default function ClientsPage() {
  const { clients, loading, error, refetch } = useClients();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <span className={styles.heroBadge}>Global Network</span>
          <h1 className={styles.heroTitle}>Trusted by Industry Leaders</h1>
          <p className={styles.heroDescription}>
            We partner with the world's most prestigious developers and
            architectural firms to deliver high-performance façade engineering
            that redefines city skylines.
          </p>
        </section>

        {/* Error State */}
        {error && !loading && (
          <div className={styles.errorState}>
            <span className="material-symbols-outlined">error</span>
            <p>{error}</p>
            <button className={styles.retryBtn} onClick={refetch}>
              Retry
            </button>
          </div>
        )}

        {/* Client Logo Grid */}
        {!error && (
          <section className={styles.logoGrid}>
            {loading
              ? Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className={styles.logoGridItem}>
                    <div
                      className={`${styles.logoImage} ${styles.skeleton}`}
                    />
                  </div>
                ))
              : clients.map((client) => (
                  <div key={client.id} className={styles.logoGridItem}>
                    <img
                      src={getImageUrl(client.imageUrl)}
                      alt={client.alt || client.name}
                      className={styles.logoImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== PLACEHOLDER_IMAGE) {
                          target.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />
                  </div>
                ))}
          </section>
        )}

        {/* Empty State */}
        {!loading && !error && clients.length === 0 && (
          <div className={styles.emptyState}>
            <span className="material-symbols-outlined">group</span>
            <h3>No clients found</h3>
            <p>Client information is not available at the moment.</p>
          </div>
        )}

        {/* Stats Section */}
        <section className={styles.statsSection}>
          {STATS_DATA.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Partnership CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground}></div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Collaborate with Elite Facade Solutions
            </h2>
            <p className={styles.ctaDescription}>
              Ready to elevate your next project? Join our network of industry
              partners and benefit from our specialized engineering expertise.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryBtn}>
                Contact Partnership Team
              </button>
              <button className={styles.ctaSecondaryBtn}>
                View Project Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}