import { useEffect, useRef, useState } from "react";

export default function useInViewReveal(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible];
}
