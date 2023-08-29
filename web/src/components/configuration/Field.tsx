import React, { InputHTMLAttributes } from "react";
import { Flex } from "../shared";
export interface FieldProps {
  label: string;
  value: string;
  onTextChange?: (val: string) => void;
  style?: React.CSSProperties;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}
export const Field = ({
  label,
  value,
  onTextChange,
  style,
  type,
}: FieldProps): JSX.Element => {
  return (
    <Flex style={{ flexDirection: "row", padding: 20, ...style }}>
      <p
        style={{
          display: "flex",
          color: "white",
          flex: 1,
          flexShrink: 1,
        }}
      >
        {label}
      </p>
      <input
        style={{
          minWidth: 0,
          display: "flex",
          backgroundColor: "#26292e",
          borderColor: "black",
          padding: 2,
          paddingLeft: 5,
          flex: 1,
          flexShrink: 1,
        }}
        onChange={(e) => onTextChange?.(e.target.value)}
        type={type}
        value={value}
        placeholder={type}
        required
      />
    </Flex>
  );
};
