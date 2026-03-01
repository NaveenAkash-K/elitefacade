"use client";

import { useState } from 'react';
import styles from './page.module.scss';
import { FAQ_CATEGORIES, FAQ_ITEMS, FOOTER_COMPANY, FOOTER_RESOURCES, FOOTER_CONTACT } from './assets';
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                Explore our comprehensive resource of frequently asked questions regarding façade engineering, technical specifications, and sustainable building systems.
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
                    <a
                      key={index}
                      href="#"
                      className={`${styles.categoryLink} ${index === 0 ? styles.categoryActive : ''}`}
                    >
                      <span className="material-symbols-outlined">{category.icon}</span>
                      {category.name}
                    </a>
                  ))}
                </nav>

                <div className={styles.supportCard}>
                  <h4 className={styles.supportTitle}>Need Technical Support?</h4>
                  <p className={styles.supportDescription}>
                    Our engineering team is available for detailed consultations regarding your specific project requirements.
                  </p>
                  <button className={styles.supportBtn}>
                    <span className="material-symbols-outlined">engineering</span>
                    Contact Engineering
                  </button>
                </div>
              </div>
            </aside>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
              <div className={styles.faqList}>
                {FAQ_ITEMS.map((faq, index) => (
                  <details
                    key={index}
                    className={styles.faqItem}
                    open={openIndex === index}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFAQ(index);
                    }}
                  >
                    <summary className={styles.faqSummary}>
                      <h3 className={styles.faqQuestion}>{faq.question}</h3>
                      <div className={`${styles.faqIcon} ${openIndex === index ? styles.faqIconOpen : ''}`}>
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </summary>
                    <div className={styles.faqContent}>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Contact Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactCardContent}>
                  <div className={styles.contactCardText}>
                    <h3 className={styles.contactCardTitle}>Can't find what you're looking for?</h3>
                    <p className={styles.contactCardDescription}>
                      Our team is ready to assist with custom technical requests or specific documentation.
                    </p>
                  </div>
                  <div className={styles.contactCardButtons}>
                    <button className={styles.contactSecondaryBtn}>Email Support</button>
                    <button className={styles.contactPrimaryBtn}>Open a Ticket</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoIcon}>
                  <svg viewBox="0 0 48 48" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
                  </svg>
                </div>
                <h1>Elite Facade Solutions</h1>
              </div>
              <p className={styles.footerBrandDescription}>
                Leading the industry in sustainable façade engineering and advanced building envelope solutions.
              </p>
            </div>

            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>Company</p>
              {FOOTER_COMPANY.map((item, index) => (
                <a key={index} href="#">{item}</a>
              ))}
            </div>

            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>Resources</p>
              {FOOTER_RESOURCES.map((item, index) => (
                <a key={index} href="#">{item}</a>
              ))}
            </div>

            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>Contact</p>
              {FOOTER_CONTACT.map((item, index) => (
                <a key={index} href="#">{item}</a>
              ))}
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2024 Elite Facade Solutions Façade Engineering. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}