"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { projectsApi, Project } from "@/lib/api/projectsApi";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectsApi.getAll({
        page: currentPage,
        limit: 6,
      });
      if (isMounted.current) {
        setProjects(response.projects);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (err as Error)?.message ||
          "Failed to load projects.";
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return {
    projects,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    refetch: fetchProjects,
  };
}