export const DEFAULT_INFO = {
  deviceName: "name of the apash",
  deviceModel: "Apash 18 - 363 Wh",
  ipAddress: "192.168.0.90",
  netMask: "255.255.255.0",
  alertMail: "test@test.te",
  deviceVersion: "1.37",
  //wifiPass: "ashnetwork",
  consommationTotale: {
    min: 0,
    max: 100,
  },
  consommationSwitchA: {
    min: 0,
    max: 100,
  },
  consommationSwitchV: {
    min: 0,
    max: 100,
  },
  consommationAuxW: {
    min: 0,
    max: 100,
  },
  consommationAuxV: {
    min: 0,
    max: 100,
  },
  batteryReserv: {
    min: 0,
    max: 100,
  },
  charging: false,
};
export const DEFAULT_DATA = {
  consommationTotale: 79,
  consommationSwitchA: 0,
  consommationSwitchV: 0,
  consommationAuxW: 0,
  consommationAuxV: 0,
  batteryReserv: 0,
  nbCharge: 0,
  // lastCharge: 0,
  autonomie: 0,
  charging: true,
};
export const DEFAULT_SETTINGS = {
  setting: 0,
};
export const DEFAULT_STATES = {
  state: 0,
};
export const DEFAULT_HISTORY = {
  state: 0,
};
export const DEFAULT_CTX = {
  setInfo: (): void => undefined,
  logs: [],
  data: DEFAULT_DATA,
  info: DEFAULT_INFO,
  states: DEFAULT_STATES,
  settings: DEFAULT_SETTINGS,
  history: DEFAULT_HISTORY,
};
