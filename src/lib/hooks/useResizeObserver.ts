import { useEffect } from "react";

const useResizeObserver = (
  element: HTMLElement | null,
  callback: (entry: ResizeObserverEntry) => void,
  deps: any[] = [],
) => {
  useEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, ...deps]);
};

export default useResizeObserver;
