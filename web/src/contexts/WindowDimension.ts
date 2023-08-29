import { useLayoutEffect, useState } from "react";

export interface WindowSize {
  innerWidth: number;
  innerHeight: number;
  outerHeight: number;
  outerWidth: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
  useLayoutEffect(() => {
    function updateSize() {
      const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
      setSize([innerWidth, innerHeight, outerWidth, outerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return {
    innerWidth: size[0],
    innerHeight: size[1],
    outerWidth: size[2],
    outerHeight: size[3],
  };
}
