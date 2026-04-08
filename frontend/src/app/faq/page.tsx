"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.scss";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
} from "./assets";
import Link from "next/link";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs = useMemo(
    () => FAQ_ITEMS.filter((faq) => faq.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    setOpenIndex(0);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>How can we help?</h2>
              <p className={styles.heroDescription}>
                Explore our comprehensive resource of frequently asked questions
                regarding façade engineering, technical specifications, and
                sustainable building systems.
              </p>
            </div>
          </section>

          <div className={styles.contentWrapper}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <nav className={styles.categoryNav}>
                  <p className={styles.categoryLabel}>Categories</p>
                  {FAQ_CATEGORIES.map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.categoryLink} ${
                        activeCategory === category.name
                          ? styles.categoryActive
                          : ""
                      }`}
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      <span className="material-symbols-outlined">
                        {category.icon}
                      </span>
                      {category.name}
                    </button>
                  ))}
                </nav>

                <div className={styles.supportCard}>
                  <h4 className={styles.supportTitle}>Need Support?</h4>
                  <p className={styles.supportDescription}>
                    Our engineering team is available for detailed consultations
                    regarding your specific project requirements.
                  </p>
                  <Link href="/contact">
                    <button className={styles.supportBtn}>
                      <span className="material-symbols-outlined">
                        engineering
                      </span>
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
              <div className={styles.faqList}>
                {filteredFAQs.map((faq, index) => (
                  <details
                    key={`${activeCategory}-${index}`}
                    className={styles.faqItem}
                    open={openIndex === index}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFAQ(index);
                    }}
                  >
                    <summary className={styles.faqSummary}>
                      <h3 className={styles.faqQuestion}>{faq.question}</h3>
                      <div
                        className={`${styles.faqIcon} ${
                          openIndex === index ? styles.faqIconOpen : ""
                        }`}
                      >
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </div>
                    </summary>
                    <div className={styles.faqContent}>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}