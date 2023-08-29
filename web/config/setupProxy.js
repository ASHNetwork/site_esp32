/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const DATA = {
  device: {
    deviceName: "deviceName",
    deviceModel: "deviceModel",
    ipAddress: "ipAddress",
    alertMail: "alertMail",
    consommationTotale: { min: 0, max: 100 },
    consommationSwitchA: { min: 0, max: 100 },
    consommationSwitchV: { min: 0, max: 100 },
    consommationAuxW: { min: 0, max: 100 },
    consommationAuxV: { min: 0, max: 100 },
    batteryReserv: { min: 0, max: 100 },
  },
  data: {
    consommationTotale: 1,
    consommationSwitchA: 1,
    consommationSwitchV: 1,
    consommationAuxW: 1,
    consommationAuxV: 1,
    batteryReserv: 1,
    nbCharge: 1,
    lastCharge: 1,
    autonomie: 1,
  },
};
const routes = {
  get: {
    "/device": (_, response) => {
      console.log("device");
      response.send(DATA.device);
    },
    "/data": (_, response) => {
      response.send(DATA.data);
    },
    "/logs": (_, response) => {
      response.send([
        {
          time: new Date(),
          message: "new log",
          level: "INFO",
        },
      ]);
    },
    "/reboot": (_, response) => {
      console.log("reboot");
      response.status(200).send();
    },
    "/logout": (_, response) => {
      console.log("logout");
      response.status(200).send();
    },
  },
  post: {
    "/config": (req, response) => {
      console.log("config");
      // const newVal = req.body;
      // DATA.device = { ...DATA.device, ...newVal };
      response.status(200).send();
    },
    "/login": (req, response) => {
      console.log("login", req.body);
      response.status(200).send("admin");
      //   const { username, password } = req.body;
      //   if (username === "admin" && password === "admin") {
      //     response.status(200).send("admin");
      //   } else if (username === "superAdmin" && password === "superAdmin") {
      //     response.status(200).send("superAdmin");
      //   } else {
      //     response.status(200).send("notAuthenticated");
      //   }
    },
  },
};

module.exports = (app) => {
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  console.error("setting devServer");
  Object.keys(routes.get).forEach((k) => {
    app.get(k, routes.get[k]);
  });
  Object.keys(routes.post).forEach((k) => {
    app.post(k, routes.post[k]);
  });
};
