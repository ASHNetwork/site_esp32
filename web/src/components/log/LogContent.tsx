import React from "react";
import { Flex } from "../shared";

export enum LogLevel {
  Alert = "ALERT",
  Warning = "WARNING",
  Info = "INFO",
}

export type Log = {
  time: Date;
  message: string;
  level: LogLevel;
};

export interface LogContentProps {
  logs: Log[];
}

function getColor(level: LogLevel): string {
  switch (level) {
    case LogLevel.Alert:
      return "red";
    case LogLevel.Warning:
      return "yellow";
    case LogLevel.Info:
    default:
      return "white";
  }
}

export const LogContent = ({ logs }: LogContentProps): JSX.Element => {
  return (
    <Flex
      style={{
        flex: 1,
        backgroundColor: "#272b30",
        borderWidth: 1,
        borderColor: "#fcfcfc",
        borderStyle: "solid",
        borderTopWidth: 0,
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      {logs.map((log, index) => (
        <Flex
          key={`${log.time}-${index}`}
          style={{
            flex: 0,
            flexDirection: "row",
            padding: 5,
          }}
        >
          <p style={{ color: getColor(log.level), fontSize: "medium" }}>{`${
            log.level
          } ${log.time.toLocaleTimeString()}  ${log.message}`}</p>
        </Flex>
      ))}
    </Flex>
  );
};
