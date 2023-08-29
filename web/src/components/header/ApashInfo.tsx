import React from "react";
import { t } from "../../utils/Lang";
import { Flex } from "../shared";
import { Timer } from "./Timer";

export type ApashInfoProps = {
  name: string;
};

export const ApashInfo = ({ name }: ApashInfoProps): JSX.Element => {
  return (
    <Flex style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}>
      <Flex style={{ textAlign: "right", flexDirection: "row", flexShrink: 1 }}>
        <span>
          <span style={{ textTransform: "uppercase" }}>
            {t("deviceName")}
            {" : "}
          </span>
          {name}
        </span>
      </Flex>
      <Timer style={{ textAlign: "right", color: "white" }} />
    </Flex>
  );
};
