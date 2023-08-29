import React, { CSSProperties } from "react";

import zero from "../../assets/batterie/0.png";
import un from "../../assets/batterie/1.png";
import deux from "../../assets/batterie/2.png";
import trois from "../../assets/batterie/3.png";
import quatre from "../../assets/batterie/4.png";
import cinq from "../../assets/batterie/5.png";
import { t } from "../../utils/Lang";
import { getLastTime, getPercent } from "../../utils/Numbers";
import { Flex } from "../shared";

const IMG_ARRAY = [zero, un, deux, trois, quatre, cinq];

const BLOCK_NUMBER = IMG_ARRAY.length;

export type BatteryProps = {
  minValue?: number;
  maxValue: number;
  currentValue: number;
  autonomie: number;
};

function getImgNumber(value: number, maxValue: number, minValue = 0): number {
  const percent = (value - minValue) / maxValue;
  return Math.round(percent * (BLOCK_NUMBER - 1));
}

const styles: Record<string, CSSProperties> = {
  main: { flexShrink: 1, position: "relative" },
  blocks: {
    marginTop: "2%",
    marginBottom: "2%",
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: "450px",
    width: "250px",
    minWidth: 100,
  },
};

export const Battery = ({
  currentValue,
  minValue = 0,
  maxValue,
  autonomie,
}: BatteryProps): JSX.Element => {
  const imgNumber = getImgNumber(
    Math.max(Math.min(currentValue, 100), 0),
    maxValue,
    minValue
  );
  return (
    <Flex style={styles.main}>
      <Flex
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "3%",
          top: "8%",
          flexDirection: "column",
        }}
      >
        <Flex style={styles.blocks}></Flex>
        <Flex
          style={{
            ...styles.blocks,
            flexGrow: 1,
            textAlign: "center",
            fontSize: "xx-large",
            color: "black",
          }}
        >
          {Math.trunc(getPercent(currentValue, maxValue, minValue))}%
        </Flex>
        <Flex
          style={{
            flexDirection: "column",
            ...styles.blocks,
            justifyContent: "space-around",
            fontSize: "large",
            textAlign: "center",
          }}
        >
          <Flex>
            <p
              style={{
                color: "black",
              }}
            >
              {getLastTime(autonomie)}
            </p>
          </Flex>

          <Flex>
            <p
              style={{
                color: "black",
              }}
            >
              {t("autonomie")}
            </p>
          </Flex>
        </Flex>
        <Flex style={styles.blocks}></Flex>
        <Flex style={styles.blocks}></Flex>
      </Flex>
      <img
        src={IMG_ARRAY[imgNumber]}
        alt={`${currentValue}`}
        width="1456px"
        height="2466px"
        style={styles.img}
      />
    </Flex>
  );
};
