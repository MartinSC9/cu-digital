import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a scale value (1 to maxScale) based on how far
 * the element has scrolled into view.
 */
export function useScrollScale(maxScale = 1.15) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // progress: 0 when element enters bottom, 1 when element top reaches viewport top
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)));
      setScale(1 + progress * (maxScale - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [maxScale]);

  return [ref, scale];
}
