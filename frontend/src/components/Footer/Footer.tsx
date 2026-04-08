'use client'

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { usePathname } from "next/navigation";
import logo from "src/asserts/logo.png";
import Image from 'next/image';

const Footer: React.FC = () => {
  const pathname = usePathname();
  if(pathname === "/admin") return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <span className={styles.logoIcon}>
              <Image src={logo} alt={""} width={100}/>
          </span>
            </div>
            <span className={styles.footerLogoText}>Elite Facade Solutions</span>
          </div>
          <p className={styles.footerBrandDescription}>
            Delivering world-class facade solutions for iconic architecture worldwide. Excellence in engineering, precision in execution.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>Services</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/services">Curtain Walls</Link></li>
            <li><Link href="/services">Structural Glazing</Link></li>
            <li><Link href="/services">Interior Partitions</Link></li>
            <li><Link href="/services">Maintenance</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.footerColumnTitle}>Company</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/about">Our History</Link></li>
            <li><Link href="/projects">Technical Standards</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Elite Facade Solutions Engineering Ltd. All rights reserved.</p>
        <div className={styles.footerLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;