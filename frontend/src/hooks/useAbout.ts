"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { aboutApi, AboutData } from "@/lib/api/aboutApi";
import { statsApi, StatItem } from "@/lib/api/statsApi";

export function useAbout() {
  const [aboutData, setAboutData] = useState<AboutData>({
    heroImageUrl: "",
    companyStoryImageUrl: "",
    coreValues: [],
    certifications: [],
  });
  const [stats, setStats] = useState<StatItem>({
      id: "",
      clients: '',
      yearsOfExcellence: '',
      projectsCompleted: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [aboutResult, statsResult] = await Promise.allSettled([
        aboutApi.getAll(),
        statsApi.getAll(),
      ]);
        console.log(statsResult);
      if (isMounted.current) {
        if (aboutResult.status === "fulfilled") {
          setAboutData(aboutResult.value);
        }
        if (statsResult.status === "fulfilled") {
          setStats(statsResult.value);
        }
        if (
          aboutResult.status === "rejected" &&
          statsResult.status === "rejected"
        ) {
          const message =
            (aboutResult.reason as { response?: { data?: { message?: string } } })
              ?.response?.data?.message ||
            (aboutResult.reason as Error)?.message ||
            "Failed to load about data.";
          setError(message);
        }
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (err as Error)?.message ||
          "Failed to load about data.";
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    aboutData,
    stats,
    loading,
    error,
    refetch: fetchData,
  };
}