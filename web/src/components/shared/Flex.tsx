import React from "react";

interface FlexProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value?: number; // Le "?" rend la propriété 'value' facultative
}

export const Flex: React.FC<FlexProps> = ({ className, value, ...props }) => (
  <div className={`${className ?? ""} flex`} {...props}>
    {/* Vous pouvez utiliser la prop 'value' ici si nécessaire */}
  </div>
);
