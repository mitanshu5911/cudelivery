import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 786) => {
  const mediaQuery = `(max-width: ${breakpoint - 1}px)`;

  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);

    const listener = (e) => {
      setIsMobile(e.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [mediaQuery]);

  return isMobile;
};

export default useIsMobile;