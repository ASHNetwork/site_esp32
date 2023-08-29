import { Log } from "../components/log/LogContent";

export type MinMax = {
  min?: number;
  max: number;
};

export interface ESPData {
  consommationTotale: number;
  consommationSwitchA: number;
  consommationSwitchV: number;
  consommationAuxW: number;
  consommationAuxV: number;
  batteryReserv: number;
  nbCharge: number;
  // lastCharge: number;
  autonomie: number;
  charging: boolean;
}

export interface ESPStates {
  state: number;
}
export interface ESPSettings {
  setting: number;
}

export interface DeviceInfo {
  deviceModel: string;
  deviceName: string;
  deviceVersion: string;
  ipAddress: string;
  netMask: string;
  alertMail: string;
  //wifiPass: string;

  consommationTotale: MinMax;
  consommationSwitchA: MinMax;
  consommationSwitchV: MinMax;
  consommationAuxW: MinMax;
  consommationAuxV: MinMax;
  batteryReserv: MinMax;
  charging: boolean;
}

export function getData(): Promise<ESPData> {
  return fetch("/data").then((res) => res.json());
}

export function getLogs(): Promise<Log[]> {
  return fetch("/logs")
    .then((res) => res.json())
    .then((logs: Log[]) =>
      logs.map((log: Log) => ({ ...log, time: new Date() }))
    );
}

export function getInfos(): Promise<DeviceInfo> {
  return fetch("/device").then((res) => res.json());
}

export function getSetting(): Promise<ESPSettings> {
  return fetch("/setting").then((res) => res.json());
}

export function getHistory(): Promise<ESPSettings> {
  return fetch("/history").then((res) => res.json());
}

export function getState(): Promise<ESPStates> {
  return fetch("/state").then((res) => res.json());
}

export async function rebootESP(): Promise<void> {
  await fetch("/reboot");
}

export async function setApa18(): Promise<void> {
  await fetch("/18").then(getInfos).then(getSetting);
}

export async function setApa35(): Promise<void> {
  await fetch("/35").then(getInfos).then(getSetting);
}

export async function setApa63(): Promise<void> {
  await fetch("/63").then(getInfos).then(getSetting);
}

export async function boostESP(): Promise<void> {
  await fetch("/boost");
}

export async function unboostESP(): Promise<void> {
  await fetch("/unboost");
}

export type SetableInfo = Pick<
  DeviceInfo,
  "alertMail" | "deviceName" | "ipAddress" | "netMask"
>;

export async function updateInfos(infos: SetableInfo): Promise<void> {
  await fetch("/config", {
    method: "post",
    body: JSON.stringify(infos),
  });
}

export enum LoggedRole {
  SuperAdmin = "superAdmin",
  Admin = "admin",
  NotAuthenticated = "notAuthenticated",
}

function isLoggedRole(value: string): value is LoggedRole {
  return Object.values(LoggedRole).includes(value as LoggedRole);
}

export function apiLogin(infos: {
  username: string;
  password: string;
}): Promise<LoggedRole> {
  return fetch("/login", {
    method: "post",
    body: JSON.stringify(infos),
  })
    .then((res) => res.text())
    .then((a) => (isLoggedRole(a) ? a : LoggedRole.NotAuthenticated));
}

export function apiLogout(): Promise<undefined> {
  return fetch("/logout").then(() => undefined);
}

export function changePassword(infos: {
  oldPassword: string;
  newPassword: string;
}): Promise<boolean> {
  return fetch("/changepassword", {
    method: "post",
    body: JSON.stringify(infos),
  }).then((res) => res.status === 200);
}
