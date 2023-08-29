import React from "react";
import { ESPData, MinMax } from "../../api/requests";
//import { t } from "../../utils/Lang";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
} from "@mui/material";
//import { DoubleGauge } from "../indicators/DoubleGauge";
import flash from "../../assets/flash.png";
import timer from "../../assets/timer.png";
//import { Flex } from "../shared";
import { InformationBottom } from "./InformationBottom";
//import { MainGauge } from "./MainGauge";

type PartialESP = Omit<ESPData, "batteryReserv" | "autonomie" | "charging">;
export interface InformationProps extends PartialESP {
  conf: Record<keyof Omit<PartialESP, "nbCharge" | "lastCharge">, MinMax>;
}

const formatHeuresMinutes = (totalMinutes: number) => {
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${heures} H ${minutes} MN`;
};

export const Information = ({
  conf,
  consommationAuxV,
  consommationAuxW,
  consommationSwitchA,
  consommationSwitchV,
  consommationTotale,
  ...charge
}: InformationProps): JSX.Element => {
  return (
    <Grid item xs={6} md={8} sx={{ height: window.screen.height / 2 }}>
      <Grid item container direction="row">
        <Grid item xs={4} md={4}>
          <Card
            sx={{
              display: "flex",
              background: "none",
              backgroundColor: "none",
              border: "solid",
              borderColor: "white",
              borderRadius: "20px",
              marginLeft: "80px",
              marginRight: "100px",
              marginTop: "30px",
              width: "400px",
              height: "120px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" color={"white"}>
                  CONSOMMATION
                </Typography>
                <Typography component="div" variant="h3" color={"white"}>
                  {consommationSwitchV.toFixed(1)} W
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{
                width: "50px",
                height: 200,
                marginLeft: "100px",
                marginTop: "-40px",
              }}
              src={flash}
            />
          </Card>
          <Card
            sx={{
              display: "flex",
              background: "none",
              backgroundColor: "none",
              border: "solid",
              borderColor: "white",
              borderRadius: "20px",
              marginLeft: "80px",
              marginTop: "60px",
              width: "400px",
              height: "120px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" color={"white"}>
                  AUTONOMIE RESTANTE
                </Typography>
                <Typography component="div" variant="h3" color={"white"}>
                  {formatHeuresMinutes(consommationTotale)}{" "}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{
                width: "90px",
                height: 200,
                marginLeft: "70px",
                marginTop: "-40px",
              }}
              src={timer}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid sx={{ marginTop: "50px" }}></Grid>
      <InformationBottom {...charge} />
    </Grid>
  );
};
