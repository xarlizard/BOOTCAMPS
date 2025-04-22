import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useGetApi = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const client = axios.create({
    baseURL:
      "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects",
  });

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const fetchApi = useCallback(({ method = "get", data = {}, params = {} }) => {
    setLoading(true);
    setError(null);

    controller.abort();
    controller = new AbortController();

    client({
      method,
      data,
      params,
      signal: controller.signal,
    })
      .then((result) => {
        setResponse(result.data);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { response, error, loading, fetchApi };
};

export default useGetApi;
