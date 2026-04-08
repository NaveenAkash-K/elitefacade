"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./Preloader.module.scss";

const PRELOADER_DURATION = 2000;
const FADE_DURATION = 600;

const Preloader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  const pathname = usePathname();

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
  }, []);

  // Lock / unlock body scroll
  useEffect(() => {
    if (visible && !fading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, fading]);

  const show = useCallback(() => {
    clearTimers();
    setVisible(true);
    setFading(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    timerRef.current = setTimeout(() => {
      setFading(true);
      fadeTimerRef.current = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, FADE_DURATION);
    }, PRELOADER_DURATION);
  }, [clearTimers]);

  useEffect(() => {
    show();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        show();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimers();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [show, clearTimers]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = pathname;
      return;
    }

    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      show();
    }
  }, [pathname, show]);

  return (
    <>
      {visible && (
        <div
          className={`${styles.preloader} ${fading ? styles.fadeOut : ""}`}
          aria-hidden="true"
        >
          <div className={styles.centerBlock}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={styles.video}
            >
              <source src="/Construction-Site.mp4" type="video/mp4" />
            </video>
            <h1 className={styles.companyName}>Elite Facade Solutions</h1>
            <p className={styles.tagline}>Premium Architectural Facade Systems</p>
          </div>
        </div>
      )}
      <div
        className={styles.content}
        style={{ visibility: visible && !fading ? "hidden" : "visible" }}
      >
        {children}
      </div>
    </>
  );
};

export default Preloader;