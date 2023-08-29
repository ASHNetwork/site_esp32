import React from "react";

export const Button = ({
  style,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>): JSX.Element => {
  return (
    <input
      style={{
        padding: 5,
        boxShadow: "inset 0 0 5px #763f27, 0 0 5px #763f27",
        backgroundColor: "#ea6323",
        borderRadius: 4,
        borderColor: "#763f27",
        ...style,
      }}
      type="button"
      {...props}
    />
  );
};
