"use client";

import styles from "./page.module.scss";
import { useFabrication } from "@/hooks/useFabrication";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsQ36wb_tFO6TbdLDq_oCVSgIhdXsH8D1imXH7BKbvAq_J5TIqC1eBvBHGtYAv6Jn6bS0zfHS3R4jPCLnLQ3Fr2o6cBig6dMpWkQhOmO7e3okZ-aovKgSfHfQFPhPnYNR10IbONncswnFa5vsJRuRUuF7doUfo_YhOjybDbhS_mpE-nZqI9TQXZ272i3vgAwexoWyrQVnK0HiCYw7SzudwN4i5V0EaEZ171-IUUldEN_dB2KezvwUVCL_HG-CUlV3EI2RCXhzADOC";

const QA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxmZ0yQGJXmMjkC76QRKpvYvpOaoQMPL-Agp9qaJagg0KeEyqsx7UI9CarIBPJc6vSGtJZwk39UOQJ0PW4QHz7wI4_rU4qbGqx1LSwWsgVUW971o5SadtrnGFxIP7kCwSV5U_71kKscrrcF1PbA40C-P29iYZK8AMclQbdlL2fR4mHVZZu1LfYoVh6q3YKQhW0H0tVx2i6d7IuSdpZqPV2x828NIODD6d5ruWGfOOQQIO9E_cLc3Z7PAzhFREOtyoEZstARxOWOoyd";

function getImageUrl(image: string): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

export default function FabricationPage() {
  const { stats, items, qaFeatures, loading, error } = useFabrication();

  const hasData =
    stats.length > 0 || items.length > 0 || qaFeatures.length > 0;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroOverlay}></div>
            <img
              src={HERO_IMAGE}
              alt="Modern high-tech CNC machining facility floor"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Industrial Scale Facility</div>
            <h1 className={styles.heroTitle}>
              ENGINEERED TO <br />
              <span className={styles.heroTitleAccent}>PERFECTION.</span>
            </h1>
            <p className={styles.heroDescription}>
              Our 120,000 sq.ft. fabrication hub integrates aerospace-grade CNC
              technology with structural engineering expertise to deliver the
              world's most complex façade systems.
            </p>
            <div className={styles.heroButtons}>
              {/* <button className={styles.heroPrimaryBtn}>
                Virtual Tour
                <span className="material-symbols-outlined">play_circle</span>
              </button>
              <button className={styles.heroSecondaryBtn}>
                Capabilities Deck
              </button> */}
            </div>
          </div>
        </section>

        {/* Error */}
        {error && !loading && (
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

        {/* Stats Section */}
        {(loading || stats.length > 0) && !error && (
          <section className={styles.statsSection}>
            <div className={styles.statsGrid}>
              {loading
                ? Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className={styles.statCard}>
                      <div
                        className={`${styles.skeletonLine} ${styles.skeletonIcon}`}
                      />
                      <div
                        className={`${styles.skeletonLine} ${styles.skeletonStatLabel}`}
                      />
                      <div
                        className={`${styles.skeletonLine} ${styles.skeletonStatValue}`}
                      />
                      <div className={styles.statAccent}></div>
                    </div>
                  ))
                : stats.map((stat) => (
                    <div key={stat.id} className={styles.statCard}>
                      <span className="material-symbols-outlined">
                        {stat.icon}
                      </span>
                      <p className={styles.statLabel}>{stat.label}</p>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      <div className={styles.statAccent}></div>
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Production Capacity Section */}
        {(loading || items.length > 0) && !error && (
          <section className={styles.productionSection}>
            <div className={styles.productionHeader}>
              <div className={styles.productionHeaderText}>
                <h2 className={styles.productionTitle}>Production Capacity</h2>
                <p className={styles.productionDescription}>
                  From automated milling to modular assembly, our facility is
                  optimized for high-volume delivery without compromising on
                  bespoke engineering requirements.
                </p>
              </div>
              <div className={styles.productionNav}>
                <button className={styles.navBtn}>
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className={styles.navBtn}>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.productionGrid}>
              {loading
                ? Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className={styles.productionCard}>
                      <div className={styles.productionCardImage}>
                        <div
                          className={`${styles.skeletonProductionImage} ${styles.skeleton}`}
                        />
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div key={item.id} className={styles.productionCard}>
                      <div className={styles.productionCardImage}>
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.alt}
                        />
                        <div className={styles.productionCardOverlay}></div>
                        <div className={styles.productionCardTitle}>
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Quality Assurance Section */}
        {(loading || qaFeatures.length > 0) && !error && (
          <section className={styles.qaSection}>
            <div className={styles.qaContent}>
              <div className={styles.qaImageWrapper}>
                <div className={styles.qaImageBorder}></div>
                <img
                  src={QA_IMAGE}
                  alt="Engineer inspecting glass façade components"
                  className={styles.qaImage}
                />
                <div className={styles.qaBadge}>
                  <span className="material-symbols-outlined">
                    military_tech
                  </span>
                  <p className={styles.qaBadgeTitle}>AAMA/FGIA</p>
                  <p className={styles.qaBadgeLabel}>Certified Lab</p>
                </div>
              </div>
              <div className={styles.qaText}>
                <h2 className={styles.qaTitle}>
                  Rigorous Quality <br />
                  <span className={styles.qaTitleAccent}>
                    Assurance Protocol
                  </span>
                </h2>
                <p className={styles.qaDescription}>
                  Every component that leaves our facility undergoes a
                  multi-stage inspection process. We utilize laser scanning and
                  ultrasonic testing to ensure structural integrity and aesthetic
                  consistency across massive production runs.
                </p>
                <div className={styles.qaFeatures}>
                  {loading
                    ? Array.from({ length: 2 }, (_, i) => (
                        <div key={i} className={styles.qaFeatureItem}>
                          <div
                            className={`${styles.qaFeatureIcon} ${styles.skeleton}`}
                          />
                          <div style={{ flex: 1 }}>
                            <div
                              className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`}
                            />
                            <div
                              className={`${styles.skeletonLine} ${styles.skeletonCardDesc}`}
                            />
                          </div>
                        </div>
                      ))
                    : qaFeatures.map((feature) => (
                        <div key={feature.id} className={styles.qaFeatureItem}>
                          <div className={styles.qaFeatureIcon}>
                            <span className="material-symbols-outlined">
                              {feature.icon}
                            </span>
                          </div>
                          <div>
                            <h5 className={styles.qaFeatureTitle}>
                              {feature.title}
                            </h5>
                            <p className={styles.qaFeatureDescription}>
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
                {/* <button className={styles.qaButton}>View QA Standards</button> */}
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {!loading && !error && !hasData && (
          <div className={styles.emptyState}>
            <span className="material-symbols-outlined">
              precision_manufacturing
            </span>
            <h3>No fabrication data found</h3>
            <p>Fabrication information is not available at the moment.</p>
          </div>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to scale your next project?
            </h2>
            <p className={styles.ctaDescription}>
              Consult with our engineering team to see how our fabrication
              capabilities can optimize your schedule and budget.
            </p>
            <div className={styles.ctaButtons}>
              {/* <button className={styles.ctaSecondaryBtn}>
                Get a Technical Quote
              </button> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}