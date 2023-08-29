import React from "react";
import { Gauge } from ".";
import { ValuesWithMinMax } from "../../types";
import { Flex } from "../shared";

export interface DoubleGaugeProps {
  title: string;
  gauge1: ValuesWithMinMax;
  gauge2: ValuesWithMinMax;
}

export function DoubleGauge({
  title,
  gauge1,
  gauge2,
}: DoubleGaugeProps): JSX.Element {
  return (
    <Flex
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "50%",
      }}
    >
      <p style={{ flex: 1 }}>{title}</p>
      <Gauge {...gauge1} />
      <Gauge {...gauge2} />
    </Flex>
  );
}
