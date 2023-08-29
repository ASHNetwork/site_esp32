import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../contexts/WindowDimension";
import { ValuesWithMinMax } from "../../types";
import { getPercent, normalizeNumber } from "../../utils/Numbers";

export interface GaugeProps extends ValuesWithMinMax {
  color?: string;
  intervals?: number[];
  colors?: string[];
  style?: React.CSSProperties;
  symbol?: string;
}
const STROKE_WIDTH = 10;
const BORDER_COLOR = "#45474b";
const EMPTY_COLOR = "#303231";

export const Gauge: React.FC<GaugeProps> = ({
  minValue = 0,
  maxValue,
  value: cpercent = 75,
  color = "#5BB030",
  intervals,
  colors,
  style,
  symbol = "%",
}) => {
  const mainDiv = useRef<HTMLDivElement>(null);
  const size = useWindowSize();
  const percent = Math.min(
    Math.max(normalizeNumber(getPercent(cpercent, maxValue, minValue)), 0),
    100
  );
  if (intervals && colors) {
    let startValue = 0;
    intervals.forEach((element, idx) => {
      if (percent >= startValue && percent < element) {
        color = colors[idx] || color;
      }
      startValue = element;
    });
  }

  const [wwidth, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(mainDiv.current?.clientWidth || 0);
  }, [mainDiv, size]);

  const viewPort = {
    x: 0,
    y: 0,
    size: 64,
  };
  const baseDecalageAngle = 90;
  const circlePart = 0.7;
  const emptyPart = 1 - circlePart;
  const strokeWidth = STROKE_WIDTH;
  const midStroke = strokeWidth / 2;
  const midSize = viewPort.size / 2;
  const rayon = midSize - midStroke;
  const length = Math.PI * 2 * rayon * circlePart;
  const emptyAngle = emptyPart * 360;
  const bar = (percent * length) / 100;
  const offsetBar = length * 2 - bar;

  const height = wwidth;

  return (
    <div
      className="container"
      style={{
        position: "relative",
        flexGrow: 1,
        zIndex: 0,
        ...style,
        width: "100%",
        height: "100%",
        minWidth: 20,
      }}
      ref={mainDiv}
    >
      <div
        style={{
          zIndex: -5,
        }}
      >
        <svg
          className="gauge-svg"
          viewBox={`${viewPort.x} ${viewPort.y} ${viewPort.size} ${viewPort.size}`}
        >
          <g
            transform={`translate(${midSize}, ${midSize}) rotate(${
              baseDecalageAngle + emptyAngle / 2
            }) translate(-${midSize}, -${midSize})`}
          >
            <circle
              width="100%"
              height="100%"
              fill="none"
              stroke={BORDER_COLOR}
              strokeLinecap="round"
              cx={rayon}
              cy={rayon}
              r={rayon}
              strokeDasharray={`${length}`}
              strokeWidth={strokeWidth}
              transform={`translate(${midStroke},${midStroke})`}
            />
            <circle
              width="100%"
              height="100%"
              fill="none"
              stroke={EMPTY_COLOR}
              strokeLinecap="round"
              cx={rayon}
              cy={rayon}
              r={rayon}
              strokeDasharray={`${length}`}
              strokeWidth={strokeWidth - 2}
              transform={`translate(${midStroke},${midStroke})`}
            />
            <circle
              width="100%"
              height="100%"
              fill="none"
              strokeLinecap="round"
              cx={rayon}
              cy={rayon}
              r={rayon}
              transform={`translate(${midStroke},${midStroke})`}
              stroke={color}
              strokeDasharray={`${bar} ${offsetBar}`}
              strokeWidth={strokeWidth - 2}
            />
            {/*
            <circle
              width="100%"
              height="100%"
              fill="none"
              strokeLinecap="round"
              cx={rayon}
              cy={rayon}
              r={rayon}
              stroke={"black"}
              strokeDasharray={`0 ${bar + length}`}
              strokeDashoffset={length}
              strokeWidth={strokeWidth - 2}
              transform={`translate(${midStroke},${midStroke})`}
            />
            */}
          </g>
        </svg>
      </div>
      <div
        className="number"
        style={{
          zIndex: 5,
          fontSize: `${height / 5}px`,
          fontWeight: "bold",
          color: "white",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
          top: 0,
          left: 0,
        }}
      >
        {percent} {symbol}
      </div>
    </div>
  );
};
