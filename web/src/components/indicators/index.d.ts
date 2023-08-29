declare module "react-simple-gauges";
import React = require("react");

// eslint-disable-next-line import/no-default-export
export interface SimpleGaugeProps {
  percent: number;
  color: string;
  intervals: number[];
  colors: string[];
}
export class SimpleGauge extends React.Component<SimpleGaugeProps> {}
