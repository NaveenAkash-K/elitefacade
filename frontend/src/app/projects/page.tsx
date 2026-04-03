"use client";

import { useMemo, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import Image from "next/image";
import styles from "./page.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const PLACEHOLDER_IMAGE = "/placeholder-project.jpg";

function getImageUrl(image: string): string | null {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  const cleanPath = image.startsWith("/") ? image.slice(1) : image;
  return `${API_URL}/${cleanPath}`;
}

function ProjectSkeleton({ height }: { height: string }) {
  return (
    <div className={styles.skeletonCard}>
      <div
        className={`${styles.skeletonImage} ${styles.skeleton}`}
        style={{ height }}
      />
    </div>
  );
}

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useProjects();

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const skeletons = useMemo(
    () => [
      <ProjectSkeleton key={0} height="20rem" />,
      <ProjectSkeleton key={1} height="16rem" />,
      <ProjectSkeleton key={2} height="24rem" />,
      <ProjectSkeleton key={3} height="18rem" />,
      <ProjectSkeleton key={4} height="22rem" />,
      <ProjectSkeleton key={5} height="16rem" />,
    ],
    []
  );

  function getProjectImageSrc(projectId: string, image: string): string {
    if (failedImages.has(projectId)) return PLACEHOLDER_IMAGE;
    const resolved = getImageUrl(image);
    if (!resolved) return PLACEHOLDER_IMAGE;
    return resolved;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <h1 className={styles.pageTitle}>Our Portfolio</h1>
          <p className={styles.pageDescription}>
            Pioneering the future of architectural envelopes. From high-rise
            curtain walls to intricate interior glazing, explore our global
            engineering benchmarks.
          </p>
        </div>

        {/* Error */}
        {error && (
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

        {/* Masonry Grid */}
        <div className={styles.masonryGrid}>
          {loading
            ? skeletons
            : projects.map((project) => {
                const imageSrc = getProjectImageSrc(project.id, project.image);
                return (
                  <div key={project.id} className={styles.projectCard}>
                    <img
                      src={imageSrc}
                      alt={project.title || "project"}
                      className={styles.projectImage}
                      width={600}
                      height={400}
                      style={{ width: "100%", height: "auto" }}
                      onError={() => {
                        setFailedImages((prev) => {
                          const next = new Set(prev);
                          next.add(project.id);
                          return next;
                        });
                      }}
                    />
                    <div className={styles.projectOverlay}>
                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectLocation}>
                        <span className="material-symbols-outlined">
                          location_on
                        </span>
                        {project.location}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className={styles.emptyState}>
            <span className="material-symbols-outlined">folder_open</span>
            <h3>No projects found</h3>
            <p>No projects are available at the moment.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && projects.length > 0 && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationArrow}
              onClick={prevPage}
              disabled={currentPage <= 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className={styles.paginationText}>
              {currentPage} of {totalPages}
            </span>
            <button
              className={styles.paginationArrow}
              onClick={nextPage}
              disabled={currentPage >= totalPages}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}