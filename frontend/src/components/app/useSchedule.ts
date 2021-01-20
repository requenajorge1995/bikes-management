import { useState, useEffect } from 'react';

import { Schedule } from '../../types';
import { API_URL } from '../../config';

export function useSchedule(user: string, userInteraction: boolean) {
  const [schedule, setSchedule] = useState({} as Schedule);
  const [error, setError] = useState(null as Error | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSchedule({});
    setError(null);
    setIsLoading(true);

    (async function () {

      if (!user) {
        setError(new Error('Insert username'));
        return;
      }

      try {
        const res = await fetch(`${API_URL}/schedule`, { headers: { Username: user } });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        setSchedule(await res.json());
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();

  }, [user, userInteraction]);

  return { schedule, error, isLoading };
}
