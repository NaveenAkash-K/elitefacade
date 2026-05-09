"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { statsApi, StatItem } from "@/lib/api/statsApi";
import { clientsApi, Client } from "@/lib/api/clientsApi";
import { servicesApi, ServicePhase } from "@/lib/api/servicesApi";

export function useHome() {
  const [stats, setStats] = useState<StatItem>({
    id: "",
    clients: "",
    yearsOfExcellence: "",
    projectsCompleted: "",
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [phases, setPhases] = useState<ServicePhase[]>([]);
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
      const [statsResult, clientsResult, servicesResult] =
        await Promise.allSettled([
          statsApi.getAll(),
          clientsApi.getAll(),
          servicesApi.getAll(),
        ]);

      if (isMounted.current) {
        if (statsResult.status === "fulfilled") {
          setStats(statsResult.value);
        }
        if (clientsResult.status === "fulfilled") {
          setClients(clientsResult.value);
        }
        if (servicesResult.status === "fulfilled") {
          setPhases(servicesResult.value.phases);
        }
        if (
          statsResult.status === "rejected" &&
          clientsResult.status === "rejected" &&
          servicesResult.status === "rejected"
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
    phases,
    clients,
    loading,
    error,
    refetch: fetchData,
  };
}