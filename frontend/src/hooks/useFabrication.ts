"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fabricationApi, FabricationData } from "@/lib/api/fabricationApi";

export function useFabrication() {
  const [fabricationData, setFabricationData] = useState<FabricationData>({
    stats: [],
    items: [],
    qaFeatures: [],
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

  const fetchFabrication = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fabricationApi.getAll();
      if (isMounted.current) {
        setFabricationData(data);
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (err as Error)?.message ||
          "Failed to load fabrication data.";
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchFabrication();
  }, [fetchFabrication]);

  return {
    stats: fabricationData.stats,
    items: fabricationData.items,
    qaFeatures: fabricationData.qaFeatures,
    loading,
    error,
    refetch: fetchFabrication,
  };
}