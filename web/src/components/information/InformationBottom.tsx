import React from "react";
import { t } from "../../utils/Lang";
// import { getLastTime, MINUTES_FACTOR } from "../../utils/Numbers";
import { Flex } from "../shared";

export type InformationBottom = {
  // lastCharge: number;
  nbCharge: number;
};

export function InformationBottom({
  // lastCharge = Date.now(),
  nbCharge,
}: InformationBottom): JSX.Element {
  // const [lastTime, setLastTime] = useState<string>();
  // useEffect(() => {
  //   setLastTime(getLastTime(Date.now() - lastCharge));
  // }, [lastCharge]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLastTime(getLastTime(Date.now() - lastCharge));
  //   }, MINUTES_FACTOR);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return (
    <Flex
      style={{
        flex: 0,
        flexDirection: "column",
        textAlign: "right",
        width: "70%",
      }}
    >
      <Flex style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ textTransform: "uppercase" }}>{t("cycleNumber")}</p>
        <p style={{ maxWidth: 100, minWidth: 100, width: 100, color: "white" }}>
          {nbCharge}
        </p>
      </Flex>
      {/* <Flex style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <p>{t("lastCharge")}</p>
        <p style={{ maxWidth: 100, minWidth: 100, width: 100, color: "white" }}>
          {t("ago")}
          {lastTime}
        </p>
      </Flex> */}
    </Flex>
  );
}
