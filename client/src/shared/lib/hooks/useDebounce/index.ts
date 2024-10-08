import { useCallback, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
