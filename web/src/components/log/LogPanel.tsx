import React from "react";
import { rebootESP } from "../../api/requests";
import { useConfigPanelCtx } from "../../contexts/ConfigPanelCtx";
import { t } from "../../utils/Lang";
import { Flex } from "../shared";
import { Button } from "../shared/Button";
import { LogContent, LogContentProps } from "./LogContent";
export const LogPanel = ({ logs }: LogContentProps): JSX.Element => {
  const { open } = useConfigPanelCtx();
  return (
    <Flex
      style={{
        width: "500px",
        flexGrow: 2,
        height: "500px",
        maxHeight: "500px",
        flexDirection: "column",
        padding: 5,
        justifyContent: "center",
      }}
    >
      <Flex
        style={{
          borderWidth: 1,
          flex: 0,
          borderColor: "#fcfcfc",
          borderStyle: "solid",
        }}
      >
        <p style={{ flex: 1, textAlign: "center", fontSize: 20 }}>
          {t("infos")}
        </p>
      </Flex>
      <LogContent logs={logs} />
      <Flex
        style={{
          flexDirection: "row",
          flex: 0,
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{
            padding: 5,
            flexGrow: 1,
          }}
          value={t("config")}
          onClick={open}
        />
        <Button
          style={{
            padding: 10,
            flexGrow: 1,
          }}
          value={t("reboot")}
          onClick={rebootESP}
        />
      </Flex>
    </Flex>
  );
};
