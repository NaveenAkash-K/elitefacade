"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/types/navigation";
import styles from "./Header.module.scss";
import Image from "next/image";
import logo from "src/asserts/logo.jpeg"

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getCurrentPageName = (): string => {
    const currentItem = NAV_ITEMS.find((item) => isActive(item.href));
    return currentItem?.name || "Home";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
              <Image src={logo} alt={""} />
          </span>
          <span className={styles.logoText}>Elite Facade Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Current Page Indicator (visible on tablet) */}
        <div className={styles.currentPage}>
          <span className="material-symbols-outlined">location_on</span>
          <span>{getCurrentPageName()}</span>
        </div>

        {/* Actions */}
        <div className={styles.headerActions}>
          {/* Contact Button */}
          <Link href="/contact" className={styles.contactBtn}>
            <span className="material-symbols-outlined">mail</span>
            <span>Contact Us</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.active : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>{item.name}</span>
            {isActive(item.href) && (
              <span className="material-symbols-outlined">chevron_right</span>
            )}
          </Link>
        ))}
        <Link
          href="/contact"
          className={styles.mobileContactBtn}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="material-symbols-outlined">mail</span>
          <span>Contact Us</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;