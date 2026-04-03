"use client";

import styles from './page.module.scss';
import { ASSETS } from './assets';
import { useHome } from "@/hooks/useHome";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getImageUrl(image: string): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

export default function Home() {
  const { stats, products, clients, loading, error, refetch } = useHome();

  const STATS_DATA = [
    {
      value: stats.projectsCompleted,
      label: "Global Projects Completed",
      icon: "public",
      fallback: "500+",
    },
    {
      value: stats.clients,
      label: "Corporate Clients",
      icon: "corporate_fare",
      fallback: "120+",
    },
    {
      value: stats.yearsOfExcellence,
      label: "Years of Excellence",
      icon: "verified",
      fallback: "25+",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("${ASSETS.heroBackground}")` }}>
          <div className={styles.heroContent}>
            <div className={styles.heroTextWrapper}>
              <span className={styles.heroBadge}>Global Engineering Excellence</span>
              <h1 className={styles.heroTitle}>
                Precision Engineering for <span className={styles.highlight}>Iconic</span> Façades
              </h1>
              <p className={styles.heroDescription}>
                High-end façade engineering solutions for complex corporate structures. Setting the standard in architectural aesthetics and structural performance.
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>View Portfolio</button>
                <button className={styles.secondaryBtn}>Technical Data</button>
              </div>
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

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsInner}>
            <div className={styles.statsGrid}>
              {loading
                ? Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                          hourglass_empty
                        </span>
                      </div>
                      <div
                        className={`${styles.skeletonLine} ${styles.skeletonStatLabel}`}
                      />
                      <div
                        className={`${styles.skeletonLine} ${styles.skeletonStatValue}`}
                      />
                    </div>
                  ))
                : STATS_DATA.map((stat, i) => (
                    <div key={i} className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                          {stat.icon}
                        </span>
                      </div>
                      <p className={styles.statLabel}>{stat.label}</p>
                      <p className={styles.statValue}>
                        {stat.value || stat.fallback}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className={styles.expertise}>
          <div className={styles.expertiseInner}>
            <div className={styles.expertiseHeader}>
              <div>
                <h2 className={styles.sectionSubtitle}>Our Expertise</h2>
                <h3 className={styles.sectionTitle}>Engineered Solutions</h3>
              </div>
              <a href="/products" className={styles.exploreLink}>
                Explore all products <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            <div className={styles.expertiseGrid}>
              {loading
                ? Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className={styles.expertiseCard}>
                      <div
                        className={`${styles.expertiseImage} ${styles.skeleton}`}
                      />
                      <div className={styles.expertiseContent}>
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonTitle}`}
                        />
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonDesc}`}
                        />
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonDesc2}`}
                        />
                        <div
                          className={`${styles.skeletonLine} ${styles.skeletonTag}`}
                        />
                      </div>
                    </div>
                  ))
                : products.length > 0
                  ? products.slice(0, 3).map((product, i) => (
                      <div key={i} className={styles.expertiseCard}>
                        <div
                          className={styles.expertiseImage}
                          style={{
                            backgroundImage: `url("${
                              product.image
                                ? getImageUrl(product.image)
                                : ASSETS.curtainWall
                            }")`,
                          }}
                        />
                        <div className={styles.expertiseContent}>
                          <h4 className={styles.expertiseTitle}>
                            {product.title}
                          </h4>
                          <p className={styles.expertiseDescription}>
                            {product.description}
                          </p>
                          {product && (
                            <span className={styles.expertiseTag}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  : /* Fallback to static content if no products from API */
                    [
                      {
                        image: ASSETS.curtainWall,
                        title: "Curtain Wall Systems",
                        description:
                          "Innovative thermal break technology designed for peak energy efficiency in high-rise constructions.",
                        tag: "Thermal Performance Optimization",
                      },
                      {
                        image: ASSETS.unitizedFacade,
                        title: "Unitized Façades",
                        description:
                          "Precision-engineered pre-assembled units for rapid onsite installation and superior quality control.",
                        tag: "Rapid Installation Engineering",
                      },
                      {
                        image: ASSETS.structuralGlass,
                        title: "Structural Glass",
                        description:
                          "Architectural aesthetics meets load-bearing strength with our advanced structural glazing systems.",
                        tag: "Seamless Architectural Aesthetics",
                      },
                    ].map((item, i) => (
                      <div key={i} className={styles.expertiseCard}>
                        <div
                          className={styles.expertiseImage}
                          style={{
                            backgroundImage: `url("${item.image}")`,
                          }}
                        />
                        <div className={styles.expertiseContent}>
                          <h4 className={styles.expertiseTitle}>
                            {item.title}
                          </h4>
                          <p className={styles.expertiseDescription}>
                            {item.description}
                          </p>
                          <span className={styles.expertiseTag}>
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className={styles.clients}>
          <div className={styles.clientsInner}>
            <p className={styles.clientsTitle}>Trusted by Industry Leaders</p>
            <div className={styles.clientsLogos}>
              {loading
                ? Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`${styles.skeletonClientLogo} ${styles.skeleton}`}
                    />
                  ))
                : clients.length > 0
                  ? clients.map((client, i) => (
                      <img
                        key={i}
                        src={
                          client.imageUrl
                            ? getImageUrl(client.imageUrl)
                            : ASSETS.clientLogoA
                        }
                        alt={client.name || "Client Logo"}
                        width={20}
                        height={20}
                      />
                    ))
                  : /* Fallback to static logos */
                    [
                      { src: ASSETS.clientLogoA, alt: "Client Logo A" },
                      { src: ASSETS.clientLogoB, alt: "Client Logo B" },
                      { src: ASSETS.clientLogoC, alt: "Client Logo C" },
                      { src: ASSETS.clientLogoD, alt: "Client Logo D" },
                      { src: ASSETS.clientLogoE, alt: "Client Logo E" },
                    ].map((logo, i) => (
                      <Image key={i} src={logo.src} alt={logo.alt} width={20} height={20}/>
                    ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}