"use client";

import styles from "./page.module.scss";
import { useAbout } from "@/hooks/useAbout";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const FALLBACK_HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD9tsbruq4VPhJoV1C6BeCkx_enQJu0YN47zcNsBDg475V0hT1sp_iyF75892B-9euLBlSavgBDdogEHmA2wEulHT1oWOKnWOfrpGr-Ik-pEudP32BUokABi-vwDzeCA-1CbulBLxMWsk4DYE2lgcAkClWzAR8TGgqXjQR5Tg1ZZM2ItMXLjXpEfHzFDWO5yawcieSKiTsTiGqmtjV561uZP7gWFuRqiFAKDYbJikGVKVD1PEVGjlvq-68ge4DyE-qiA3r9sg6FsB1f";

const FALLBACK_STORY =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPKelqt1ViR6UVzKY19zBYeode4w9OBa2JXLaAvcRiYoEXc2IIo9OThXl3ZU31AE0ih7-H_xMLyQydhCztGBkDslgRuQu0LPTWzrHO4rjAfSi8mCERMj0nbY57IUX8WVTWsbZkwLDAvm78EbBneEQRn9TTB3AFoll5VrHRPavZTBsUSkt-KXHtX4aV7KsnST87h3D4l_qZLlOKp0igCgyPxTqUn3jNBmbIT6wfLZcd9aqxF0UC36bU_JVm-Ixo708WlB7cQdseqbbr";

function getImageUrl(image: string): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

export default function AboutPage() {
  const { aboutData, stats, loading, error, refetch } = useAbout();

    const STATS_DATA = [
        { value: stats.yearsOfExcellence, label: "Years of Experience" },
        { value: stats.projectsCompleted, label: "Completed Projects" },
        { value: stats.clients, label: "Clients" },
    ];

  const heroImage = aboutData.heroImageUrl
    ? getImageUrl(aboutData.heroImageUrl)
    : FALLBACK_HERO;

  const storyImage = aboutData.companyStoryImageUrl
    ? getImageUrl(aboutData.companyStoryImageUrl)
    : FALLBACK_STORY;

  return (
    <div className={styles.container}>
      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div
              className={styles.heroImage}
              style={{ backgroundImage: `url('${heroImage}')` }}
            ></div>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroInner}>
              <span className={styles.heroBadge}>Legacy of Engineering</span>
              <h1 className={styles.heroTitle}>
                Engineering Excellence <br />
                <span className={styles.heroTitleAccent}>
                  In Every Façade.
                </span>
              </h1>
              <p className={styles.heroDescription}>
                Redefining architectural boundaries with precision and
                innovation since inception. We design the skin of the future.
              </p>
              <button className={styles.heroButton}>
                Explore Our Work
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
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

        {/* Company Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storySectionInner}>
            <div className={styles.storyGrid}>
              <div className={styles.storyContent}>
                <div className={styles.storyTextContent}>
                  <h2 className={styles.storyTitle}>
                    The Elite Facade Solutions Story
                  </h2>
                  <p className={styles.storyParagraph}>
                    Elite Facade Solutions is a global leader in façade
                    engineering, providing comprehensive end-to-end solutions for
                    high-end corporate environments and iconic landmarks. Our
                    legacy is built on a foundation of structural integrity and
                    aesthetic mastery.
                  </p>
                  <p className={styles.storyParagraph}>
                    Founded with a vision to merge technical precision with
                    architectural beauty, we have consistently pushed the limits
                    of what's possible in building envelope design, ensuring
                    every project is both a masterpiece and a sustainable asset.
                  </p>
                </div>
                <div className={styles.statsGrid}>
                  {loading
                    ? Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className={styles.statItem}>
                          <div
                            className={`${styles.skeletonLine} ${styles.skeletonStatValue}`}
                          />
                          <div
                            className={`${styles.skeletonLine} ${styles.skeletonStatLabel}`}
                          />
                        </div>
                      ))
                    : STATS_DATA.length > 0
                      ? STATS_DATA.map((stat, i) => (
                          <div key={i} className={styles.statItem}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                          </div>
                        ))
                      : null}

                </div>
              </div>
              <div className={styles.storyImageWrapper}>
                <div className={styles.storyImageBackground}></div>
                <div className={styles.storyImageContainer}>
                  {loading ? (
                    <div
                      className={`${styles.storyImage} ${styles.skeleton}`}
                    ></div>
                  ) : (
                    <div
                      className={styles.storyImage}
                      style={{
                        backgroundImage: `url('${storyImage}')`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className={styles.visionMissionSection}>
          <div className={styles.visionMissionInner}>
            <div className={styles.visionMissionGrid}>
              <div className={styles.visionMissionCard}>
                <div className={styles.visionMissionIcon}>
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className={styles.visionMissionTitle}>Our Vision</h3>
                <p className={styles.visionMissionDescription}>
                  To be the global benchmark in sustainable and innovative façade
                  solutions, setting the standard for the next generation of
                  architectural envelopes.
                </p>
              </div>
              <div className={styles.visionMissionCard}>
                <div className={styles.visionMissionIcon}>
                  <span className="material-symbols-outlined">
                    rocket_launch
                  </span>
                </div>
                <h3 className={styles.visionMissionTitle}>Our Mission</h3>
                <p className={styles.visionMissionDescription}>
                  Delivering precision-engineered building envelopes that inspire
                  and endure, combining cutting-edge technology with unmatched
                  craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        {!error && (loading || aboutData.coreValues.length > 0) && (
          <section className={styles.valuesSection}>
            <div className={styles.valuesSectionInner}>
              <div className={styles.valuesHeader}>
                <h2 className={styles.valuesTitle}>Our Core Values</h2>
                <div className={styles.valuesDivider}></div>
                <p className={styles.valuesSubtitle}>
                  The principles that guide our engineering philosophy and
                  corporate culture.
                </p>
              </div>
              <div className={styles.valuesGrid}>
                {loading
                  ? Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className={styles.valueItem}>
                        <div className={styles.valueIcon}>
                          <div
                            className={`${styles.skeletonCircle} ${styles.skeleton}`}
                          />
                        </div>
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonValueTitle}`}
                        />
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonValueDesc}`}
                        />
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonValueDesc2}`}
                        />
                      </div>
                    ))
                  : aboutData.coreValues.map((value) => (
                      <div key={value.id} className={styles.valueItem}>
                        <div className={styles.valueIcon}>
                          <span className="material-symbols-outlined">
                            {value.icon}
                          </span>
                        </div>
                        <h4 className={styles.valueTitle}>{value.title}</h4>
                        <p className={styles.valueDescription}>
                          {value.description}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {!error && (loading || aboutData.certifications.length > 0) && (
          <section className={styles.certificationsSection}>
            <div className={styles.certificationsSectionInner}>
              <div className={styles.certificationsContent}>
                <div></div>
                <div className={styles.certificationsGrid}>
                  {loading
                    ? Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className={styles.certificationItem}>
                          <div
                            className={`${styles.skeletonCircle} ${styles.skeleton}`}
                          />
                          <div
                            className={`${styles.skeletonLine} ${styles.skeletonCertLabel}`}
                          />
                        </div>
                      ))
                    : aboutData.certifications.map((cert) => (
                        <div key={cert.id} className={styles.certificationItem}>
                          <span className="material-symbols-outlined">
                            {cert.icon}
                          </span>
                          <span className={styles.certificationLabel}>
                            {cert.label}
                          </span>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Empty state – only if both about & stats returned nothing */}
        {!loading &&
          !error &&
          aboutData.coreValues.length === 0 &&
          aboutData.certifications.length === 0 &&
          stats &&
          !aboutData.heroImageUrl &&
          !aboutData.companyStoryImageUrl && (
            <div className={styles.emptyState}>
              <span className="material-symbols-outlined">info</span>
              <h3>No about data available</h3>
              <p>About information is not available at the moment.</p>
            </div>
          )}
      </main>
    </div>
  );
}