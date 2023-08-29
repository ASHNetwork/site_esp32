import React from "react";
import { Flex } from "../shared";
import FooterImg from "../../assets/PIED_DE_PAGE_ASH_BLANC.png";

export const Footer = (): JSX.Element => {
  return (
    <Flex
      style={{
        flex: 0,
      }}
    >
      <img
        src={FooterImg}
        alt="footer"
        width="2300px"
        height="251px"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </Flex>
  );
};
