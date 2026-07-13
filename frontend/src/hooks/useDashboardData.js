import { useCallback, useEffect, useState } from "react";
import {
  getLatestClimateAlert,
  getLatestHealthAlert,
} from "../services/blockchainRead";
import { getClimateRisk } from "../services/climate";
import { getCarbonIntensity } from "../services/esg";

const initialState = {
  healthAlert: null,
  liveClimate: null,
  recordedClimate: null,
  carbonData: null,
};

export function useDashboardData() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setErrors({});

    const requests = [
      ["healthAlert", getLatestHealthAlert],
      ["liveClimate", getClimateRisk],
      ["recordedClimate", getLatestClimateAlert],
      ["carbonData", getCarbonIntensity],
    ];
    const results = await Promise.allSettled(
      requests.map(([, request]) => request()),
    );
    const nextData = {};
    const nextErrors = {};

    results.forEach((result, index) => {
      const key = requests[index][0];
      if (result.status === "fulfilled") {
        nextData[key] = result.value;
      } else {
        nextData[key] = null;
        nextErrors[key] = result.reason?.message ?? "Data unavailable";
      }
    });

    setData((current) => ({ ...current, ...nextData }));
    setErrors(nextErrors);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refresh]);

  return {
    ...data,
    climate: data.recordedClimate ?? data.liveClimate,
    climateSource: data.recordedClimate ? "Sepolia record" : "Live API",
    loading,
    errors,
    lastUpdated,
    refresh,
  };
}
