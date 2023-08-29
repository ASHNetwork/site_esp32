import React, { CSSProperties, useEffect, useState } from "react";

export interface TimerProps {
  style: CSSProperties;
}

export const Timer = ({ style }: TimerProps): JSX.Element => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={style}>
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
    </div>
  );
};
