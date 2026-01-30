import { useState, useEffect } from 'react';
import { rewardsStorage, type RewardsState } from '@/lib/rewardsStorage';

export function useRewardsState() {
  const [state, setState] = useState<RewardsState>(rewardsStorage.get());

  useEffect(() => {
    // Initial check
    setState(rewardsStorage.get());

    const interval = setInterval(() => {
      const current = rewardsStorage.get();
      setState(prev => {
        if (JSON.stringify(current) !== JSON.stringify(prev)) {
          return current;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return state;
}
