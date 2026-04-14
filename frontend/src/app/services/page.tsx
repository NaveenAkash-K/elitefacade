"use client";

import styles from "./page.module.scss";
import {useServices} from "@/hooks/useServices";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const HERO_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3bgt7I5-T0dykJYc4Asw4zJAs9NV_W7kh73EEJ9uX8t43iW2qYLZ5s-HnNZQF4rsFMqVLPJKocvasUGz42hPIFsAeCTz4F-LQdmXuBlkH-L-UklEfzIsLsC9_zg9GUnhPq5bykwye3IudzhBuQ1WfyWzeynuLcVKBBp0ujS9-YAPP5j6WQZfqzjKXfFlQnHdcqOfMYb2IRLRgEjZ1LhUbGWhP2_-vxTYbLQeQPDz_0NCugQurGAHPx0YbmImlo6i8TzR4MqVKN0ZM";

const STATS_DATA = [
    {value: "15+", label: "Years Experience"},
    {value: "250+", label: "Global Projects"},
    {value: "40+", label: "Expert Engineers"},
    {value: "98%", label: "Client Retention"},
];

function getImageUrl(image: string): string {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    const cleanPath = image.startsWith("/") ? image.slice(1) : image;
    return `${API_URL}/${cleanPath}`;
}

export default function ServicesPage() {
    const {regions, phases, steps, whyUs, loading, error} = useServices();

    const hasData =
        regions.length > 0 ||
        phases.length > 0 ||
        steps.length > 0 ||
        whyUs.length > 0;

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroBadge}>
                <span className={styles.badgeDot}>
                  <span className={styles.badgePing}></span>
                  <span className={styles.badgeDotInner}></span>
                </span>
                                Global Façade Excellence
                            </div>
                            <h1 className={styles.heroTitle}>
                                Advanced Façade Engineering & Consultancy
                            </h1>
                            <p className={styles.heroDescription}>
                                We deliver high-performance building envelopes through meticulous
                                technical analysis, innovative design systems, and seamless
                                global execution.
                            </p>
                            <div className={styles.heroButtons}>
                                {/* <button className={styles.primaryBtn}>
                  Download Capabilities
                </button>
                <button className={styles.secondaryBtn}>Technical Specs</button> */}
                            </div>
                        </div>
                        <div className={styles.heroImageWrapper}>
                            <div className={styles.heroImageGlow}></div>
                            <div
                                className={styles.heroImage}
                                style={{backgroundImage: `url(${HERO_IMAGE})`}}
                            />
                        </div>
                    </div>
                </div>

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

                {/* Global Service Regions */}
                {(loading || regions.length > 0) && !error && (
                    <section className={styles.regionsSection}>
                        <div className={styles.regionsContent}>
                            <div className={styles.regionsSectionHeader}>
                                <h2 className={styles.sectionTitle}>
                                    Global Operations & Strategic Hubs
                                </h2>
                                <p className={styles.sectionDescription}>
                                    Serving complex architectural projects across four continents
                                    with localized expertise and international standards.
                                </p>
                            </div>
                            <div className={styles.regionsGrid}>
                                {loading
                                    ? Array.from({length: 4}, (_, i) => (
                                        <div key={i} className={styles.regionCard}>
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonIcon}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardDesc}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardDescShort}`}
                                            />
                                        </div>
                                    ))
                                    : regions.map((region) => (
                                        <div key={region.id} className={styles.regionCard}>
                        <span className="material-symbols-outlined">
                          {region.icon}
                        </span>
                                            <h3 className={styles.regionTitle}>{region.title}</h3>
                                            <p className={styles.regionDescription}>
                                                {region.description}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Solutions Cards */}
                {(loading || phases.length > 0) && !error && (
                    <section className={styles.solutionsSection}>
                        <div className={styles.solutionsSectionHeader}>
                            <h2 className={styles.solutionsSectionTitle}>
                                Integrated Engineering Solutions
                            </h2>
                            <div className={styles.sectionDivider}></div>
                        </div>
                        <div className={styles.solutionsGrid}>
                            {loading
                                ? Array.from({length: 3}, (_, i) => (
                                    <div key={i} className={styles.solutionCard}>
                                        <div
                                            className={`${styles.solutionImage} ${styles.skeleton}`}
                                        />
                                        <div className={styles.solutionContent}>
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonPhaseLabel}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardDesc}`}
                                            />
                                            <div
                                                className={`${styles.skeletonLine} ${styles.skeletonCardDescShort}`}
                                            />
                                        </div>
                                    </div>
                                ))
                                : phases.map((phase, index) => (
                                    <div key={phase.id} className={styles.solutionCard}>
                                        <div
                                            className={styles.solutionImage}
                                            style={{
                                                backgroundImage: `url(${getImageUrl(phase.imageUrl)})`,
                                            }}
                                        />
                                        <div className={styles.solutionContent}>
                                            <div className={styles.phaseLabel}>
                                                Phase 0{index + 1}
                                            </div>
                                            <h3 className={styles.solutionTitle}>{phase.title}</h3>
                                            <p className={styles.solutionDescription}>
                                                {phase.description}
                                            </p>
                                            <ul className={styles.solutionFeatures}>
                                                {phase.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex}>
                              <span className="material-symbols-outlined">
                                check_circle
                              </span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link href="#" className={styles.solutionLink}>
                                                Learn More{" "}
                                                <span className="material-symbols-outlined">
                            arrow_forward
                          </span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Engineering Process Timeline */}
                {(loading || steps.length > 0) && !error && (
                    <section className={styles.processSection}>
                        <div className={styles.processContent}>
                            <h2 className={styles.processTitle}>Our Engineering Process</h2>
                            <div className={styles.processTimeline}>
                                <div className={styles.timelineLine}>
                                    <div
                                        className={styles.timelineProgress}
                                        style={{
                                            width: `${steps.length > 0 ? 100 : 0}%`,
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className={styles.processSteps}
                                >
                                    {loading
                                        ? Array.from({length: 5}, (_, i) => (
                                            <div key={i} className={styles.processStep}>
                                                <div
                                                    className={`${styles.stepNumber} ${styles.skeletonDark}`}
                                                    style={{border: "none"}}
                                                />
                                                <div
                                                    className={`${styles.skeletonDark} ${styles.skeletonStepTitle}`}
                                                />
                                                <div
                                                    className={`${styles.skeletonDark} ${styles.skeletonStepDesc}`}
                                                />
                                            </div>
                                        ))
                                        : steps.map((step, index) => (
                                            <div key={step.id} className={styles.processStep}
                                                 style={index === 0 ? {alignItems: "flex-start"} : index === steps.length - 1 ? {alignItems: "flex-end"} : {}}
                                            >
                                                <div
                                                    className={`${styles.stepNumber} ${styles.stepActive}`}
                                                >
                                                    0{index + 1}
                                                </div>
                                                <div
                                                    style={index === 0 ? {textAlign: "start"} : index === steps.length - 1 ? {textAlign: "end"} : {textAlign: "center"}}

                                                >
                                                    <h4 className={styles.stepTitle}>{step.title}</h4>
                                                    <p className={styles.stepDescription}>
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Choose Us */}
                {(loading || whyUs.length > 0) && !error && (
                    <section className={styles.whyChooseSection}>
                        <div className={styles.whyChooseGrid}>
                            <div className={styles.whyChooseContent}>
                                <h2 className={styles.whyChooseTitle}>
                                    Why Industry Leaders Choose Elite Facade Solutions
                                </h2>
                                <div className={styles.featuresList}>
                                    {loading
                                        ? Array.from({length: 3}, (_, i) => (
                                            <div key={i} className={styles.featureItem}>
                                                <div
                                                    className={`${styles.featureIcon} ${styles.skeleton}`}
                                                />
                                                <div style={{flex: 1}}>
                                                    <div
                                                        className={`${styles.skeletonLine} ${styles.skeletonCardTitle}`}
                                                    />
                                                    <div
                                                        className={`${styles.skeletonLine} ${styles.skeletonCardDesc}`}
                                                    />
                                                    <div
                                                        className={`${styles.skeletonLine} ${styles.skeletonCardDescShort}`}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                        : whyUs.map((item) => (
                                            <div key={item.id} className={styles.featureItem}>
                                                <div className={styles.featureIcon}>
                            <span className="material-symbols-outlined">
                              {item.icon}
                            </span>
                                                </div>
                                                <div>
                                                    <h5 className={styles.featureTitle}>
                                                        {item.title}
                                                    </h5>
                                                    <p className={styles.featureDescription}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className={styles.statsGrid}>
                                <div className={styles.statsColumn}>
                                    <div className={`${styles.statCard} ${styles.statPrimary}`}>
                                        <div className={styles.statValue}>
                                            {STATS_DATA[0].value}
                                        </div>
                                        <div className={styles.statLabel} style={{color: "white"}}>
                                            {STATS_DATA[0].label}
                                        </div>
                                    </div>
                                    <div className={styles.statCard}>
                                        <div className={styles.statValue}>
                                            {STATS_DATA[1].value}
                                        </div>
                                        <div className={styles.statLabel}>
                                            {STATS_DATA[1].label}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.statsColumn}>
                                    <div className={styles.statCard}>
                                        <div className={styles.statValue}>
                                            {STATS_DATA[2].value}
                                        </div>
                                        <div className={styles.statLabel}>
                                            {STATS_DATA[2].label}
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.statCard} ${styles.statHighlight}`}
                                    >
                                        <div
                                            className={`${styles.statValue} ${styles.statValuePrimary}`}
                                        >
                                            {STATS_DATA[3].value}
                                        </div>
                                        <div className={styles.statLabel}>
                                            {STATS_DATA[3].label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Empty state */}
                {!loading && !error && !hasData && (
                    <div className={styles.emptyState}>
            <span className="material-symbols-outlined">
              engineering
            </span>
                        <h3>No services found</h3>
                        <p>Service information is not available at the moment.</p>
                    </div>
                )}

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>
                            Ready to engineer your next landmark?
                        </h2>
                        <p className={styles.ctaDescription}>
                            Consult with our technical directors to define your project
                            requirements.
                        </p>
                        <div className={styles.ctaButtons}>
                            {/* <button className={styles.ctaPrimaryBtn}>
                Schedule Consultation
              </button> */}
                            <Link href="/contact">
                                <button className={styles.ctaSecondaryBtn}>
                                    Contact Support
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}