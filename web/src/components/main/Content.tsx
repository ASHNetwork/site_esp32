import React from "react";
import { useDataCtx } from "../../contexts/DataCtx";
import { Battery } from "../indicators/Battery";
import { Information } from "../information";
import { LogPanel } from "../log";
import { Flex } from "../shared";
import bolt from "../../assets/batterie/charge.png";

export const Content = (): JSX.Element => {
  const {
    data: { batteryReserv, charging, autonomie, ...data },
    logs,
    info: {
      batteryReserv: { min: batteryReservMin, max: batteryReservMax },
      deviceName,
      deviceModel,
      ...rest
    },
  } = useDataCtx();
  return (
    <Flex
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Flex></Flex>
      <Flex
        className="element"
        style={{ alignSelf: "center", padding: 10, flexGrow: 1 }}
      >
        <Battery
          currentValue={batteryReserv ?? batteryReservMin ?? 0}
          maxValue={batteryReservMax}
          minValue={batteryReservMin}
          autonomie={autonomie}
        />
      </Flex>
      <div
        style={{
          width: "44px",
        }}
      >
        {charging ? (
          <>
            <img
              src={bolt}
              height="80px"
              style={{
                paddingTop: "22rem",
                width: "74px",
              }}
            />
          </>
        ) : (
          <></>
        )}{" "}
      </div>
      <Information {...data} conf={rest} />
      <LogPanel logs={logs} />
    </Flex>
  );
};
