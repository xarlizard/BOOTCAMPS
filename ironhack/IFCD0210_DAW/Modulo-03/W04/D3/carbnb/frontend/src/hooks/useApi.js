import { useState, useEffect } from "react";
import apiService from "../services/api";

export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiCall && dependencies.length > 0) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    setError,
  };
}

export function useItems(params = {}) {
  return useApi(
    () => apiService.getItems(params),
    [params.search, params.page, params.pageSize]
  );
}

export function useItem(id) {
  return useApi(
    () => (id ? apiService.getItem(id) : Promise.resolve(null)),
    [id]
  );
}
