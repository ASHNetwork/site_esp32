import React, { useState, InputHTMLAttributes } from "react";
import { Flex } from "../shared";
import { Visibility, VisibilityOff } from "@material-ui/icons";
//import { Button } from "@material-ui/core";
export interface FieldProps {
  label: string;
  value: string;
  onTextChange?: (val: string) => void;
  style?: React.CSSProperties;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}
export const PasswordField = ({
  label,
  value,
  onTextChange,
  style,
  type,
}: FieldProps): JSX.Element => {
  const [showpassword, setShowpassword] = useState(false);
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
        type={showpassword ? "text" : "password"}
        value={value}
        placeholder={type}
        required
      />
      <span onClick={() => setShowpassword(!showpassword)}>
        {showpassword ? <Visibility /> : <VisibilityOff />}
      </span>
    </Flex>
  );
};
