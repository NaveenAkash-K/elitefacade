"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { servicesApi, ServiceData } from "@/lib/api/servicesApi";

export function useServices() {
  const [serviceData, setServiceData] = useState<ServiceData>({
    regions: [],
    phases: [],
    steps: [],
    whyUs: [],
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

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await servicesApi.getAll();
      if (isMounted.current) {
        setServiceData(data);
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (err as Error)?.message ||
          "Failed to load services.";
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    regions: serviceData.regions,
    phases: serviceData.phases,
    steps: serviceData.steps,
    whyUs: serviceData.whyUs,
    loading,
    error,
    refetch: fetchServices,
  };
}