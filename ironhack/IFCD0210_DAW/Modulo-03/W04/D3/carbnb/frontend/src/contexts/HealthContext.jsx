import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/api";

const HealthContext = createContext();

export function HealthProvider({ children }) {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async (force = false) => {
    // Si ya tenemos datos recientes y no se fuerza, no hacer la llamada
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos

    if (
      !force &&
      lastChecked &&
      now - lastChecked < fiveMinutes &&
      healthData
    ) {
      return healthData;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiService.checkHealth();
      setHealthData(result);
      setLastChecked(now);
      return result;
    } catch (err) {
      setError(err);
      setHealthData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Health check automático al montar el componente
  useEffect(() => {
    checkHealth();
  }, []);

  // Health check periódico cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      checkHealth();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  const value = {
    healthData,
    loading,
    error,
    checkHealth,
    lastChecked,
  };

  return (
    <HealthContext.Provider value={value}>{children}</HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}
