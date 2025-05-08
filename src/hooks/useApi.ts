import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { message as antdMessage } from 'antd';

/**
 * Custom hook for making API calls with Axios.
 * Supports GET, POST, PUT, DELETE and manages loading, error, and response state.
 * Shows error messages in a toast if the API returns a 'message' key.
 */
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Call an API endpoint
   * @param url - API endpoint
   * @param method - HTTP method (default: 'GET')
   * @param body - Request body for POST/PUT
   * @param config - Additional Axios config
   */
  const callApi = useCallback(
    async (url: string, method: Method = 'GET', body?: any, config?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...config,
        });
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const apiMsg = err.response?.data?.message || err.message || 'API error';
        setError(apiMsg);
        setData(null);
        if (apiMsg) antdMessage.error(apiMsg);
        setTimeout(() => { throw err; }, 0);
        return; // Prevent further execution
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, callApi };
} 