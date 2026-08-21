'use client'

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { usePathname } from "next/navigation";
import logo from "src/asserts/logo.png";
import Image from 'next/image';

const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname === "/admin") return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Brand */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <span className={styles.logoIcon}>
                <Image src={logo} alt="Elite Facade Solutions" width={100} />
              </span>
            </div>
            <span className={styles.footerLogoText}>Elite Facade Solutions</span>
          </div>
          <p className={styles.footerBrandDescription}>
            Engineering world-class aluminium facade systems — from concept to installation. Precision-built for India's most iconic structures.
          </p>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <span className="material-symbols-outlined">work</span>
            </a>
            <a href="mailto:info@elitefacade.in" className={styles.socialLink} aria-label="Email">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a href="tel:+919790535060" className={styles.socialLink} aria-label="Phone">
              <span className="material-symbols-outlined">call</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* What We Do */}
        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>What We Do</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/services">Facade Engineering</Link></li>
            <li><Link href="/services">Curtain Wall Systems</Link></li>
            <li><Link href="/services">Structural Glazing</Link></li>
            <li><Link href="/products">Our Products</Link></li>
            <li><Link href="/fabrication">Fabrication & QA</Link></li>
          </ul>
        </div>

        {/* Address */}
        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>Get In Touch</h4>
          <div className={styles.footerAddress}>
            <div className={styles.addressItem}>
              <span className="material-symbols-outlined">location_on</span>
              <p>
                Elite Solutions,<br />
                140/2B, Anna Industrial Estate,<br />
                Mettukuppam Road,<br />
                Porur Garden Phase II,<br />
                Odamangar, Vanagaram,<br />
                Chennai - 600095
              </p>
            </div>
            <div className={styles.addressItem}>
              <span className="material-symbols-outlined">mail</span>
              <a href="mailto:info@elitefacade.in">info@elitefacade.in</a>
            </div>
            <div className={styles.addressItem}>
              <span className="material-symbols-outlined">call</span>
              <a href="tel:+919790535060">+91 97905 35060</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Elite Facade Solutions Engineering Ltd. All rights reserved.</p>
        <div className={styles.footerLegal}>
          {/*<Link href="/privacy">Privacy Policy</Link>*/}
          {/*<Link href="/terms">Terms of Service</Link>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;