import React from "react";
import { ValuesWithMinMax } from "../../types";
import { Gauge } from "../indicators";
import { Flex } from "../shared";

export interface MainGaugeProps extends ValuesWithMinMax {
  title: string;
}

export function MainGauge({ title, ...gauge }: MainGaugeProps): JSX.Element {
  return (
    <Flex
      style={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <p
        style={{
          flex: 0,
          justifySelf: "flex-start",
          textAlign: "center",
        }}
      >
        {title.toUpperCase()}
      </p>
      <Flex
        style={{
          flex: 1,
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <Gauge {...gauge} />
      </Flex>
    </Flex>
  );
}
