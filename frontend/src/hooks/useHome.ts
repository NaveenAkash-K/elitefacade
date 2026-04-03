"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { statsApi, StatItem } from "@/lib/api/statsApi";
import { productsApi } from "@/lib/api/productsApi";
import { Product } from "@/lib/api/types";
import { clientsApi, Client } from "@/lib/api/clientsApi";

export function useHome() {
  const [stats, setStats] = useState<StatItem>({
    id: "",
    clients: "",
    yearsOfExcellence: "",
    projectsCompleted: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
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
      const [statsResult, productsResult, clientsResult] =
        await Promise.allSettled([
          statsApi.getAll(),
          productsApi.getAll({ page: 1, limit: 3 }),
          clientsApi.getAll(),
        ]);

      if (isMounted.current) {
        if (statsResult.status === "fulfilled") {
          setStats(statsResult.value);
        }
        if (productsResult.status === "fulfilled") {
          setProducts(productsResult.value.products);
        }
        if (clientsResult.status === "fulfilled") {
          setClients(clientsResult.value);
        }
        if (
          statsResult.status === "rejected" &&
          productsResult.status === "rejected" &&
          clientsResult.status === "rejected"
        ) {
          const message =
            (
              statsResult.reason as {
                response?: { data?: { message?: string } };
              }
            )?.response?.data?.message ||
            (statsResult.reason as Error)?.message ||
            "Failed to load home data.";
          setError(message);
        }
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (err as Error)?.message ||
          "Failed to load home data.";
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
    stats,
    products,
    clients,
    loading,
    error,
    refetch: fetchData,
  };
}