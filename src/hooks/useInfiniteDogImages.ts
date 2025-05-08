import { useState, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch dog images in batches of 5 and support infinite loading.
 */
export function useInfiniteDogImages() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch next batch of images
  const fetchMore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://dog.ceo/api/breeds/image/random/5');
      if (res.data && res.data.message) {
        setImages(prev => [...prev, ...res.data.message]);
      }
    } catch (err: any) {
      setError('Failed to load images.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { images, loading, error, fetchMore };
} 