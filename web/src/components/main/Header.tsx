import React from "react";
import { Flex } from "../shared";
import { ApashInfo } from "../header";
import LogoApash from "../../assets/Logo_APASH.png";
//import collab from "../../assets/collab.png";
import { useDataCtx } from "../../contexts/DataCtx";

export const Header = (): JSX.Element => {
  const {
    info: { deviceName, deviceModel },
  } = useDataCtx();
  return (
    <Flex
      style={{
        flex: 0,
        flexDirection: "row",
        alignItems: "center", // Aligner les éléments verticalement au centre
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#9d7148",
        paddingTop: 15,
        paddingBottom: 15,
        padding: 5,
      }}
    >
      <img
        src={LogoApash}
        alt="logo"
        width="805px"
        height="224px"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "30%",
        }}
      />

      <Flex style={{ flexGrow: 1 }}>
        <p style={{ textAlign: "center", color: "white" }}>{deviceModel}</p>
      </Flex>
      {/*<img
        src={collab}
        alt="collab"
        style={{
          width: "250px",
          height: "224px",
          maxWidth: "30%",
          paddingRight: "18%",
        }}
      />*/}
      <ApashInfo name={deviceName} />
    </Flex>
  );
};
