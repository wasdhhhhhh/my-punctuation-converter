import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => {
  const timerRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);
}; 