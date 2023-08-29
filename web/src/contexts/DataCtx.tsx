import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_CTX,
  DEFAULT_DATA,
  DEFAULT_INFO,
  DEFAULT_SETTINGS,
  DEFAULT_STATES,
} from "../api/DefaultValues";
import {
  DeviceInfo,
  ESPData,
  getData,
  getSetting,
  getState,
  getInfos,
  getLogs,
  SetableInfo,
  updateInfos,
  ESPSettings,
  ESPStates,
} from "../api/requests";
import { Log } from "../components/log/LogContent";

export interface DataCtxState {
  info: DeviceInfo;
  data: ESPData;
  settings: ESPSettings;
  states: ESPStates;
  logs: Log[];
  setInfo: (info: SetableInfo) => void;
}
const REFRESH_TIME = 1500;

export const DataCtx = createContext<DataCtxState>(DEFAULT_CTX);

export function DataCtxProvider({
  children,
}: {
  children?: ReactNode | undefined;
}): JSX.Element {
  const [data, setData] = useState<ESPData>(DEFAULT_DATA);
  const [settings, setSettings] = useState<ESPSettings>(DEFAULT_SETTINGS);
  const [states, setStates] = useState<ESPStates>(DEFAULT_STATES);
  const [info, setInfo] = useState<DeviceInfo>(DEFAULT_INFO);
  const [logs, setLogs] = useState<Log[]>([]);
  function addLogs(newLogs: Log[]) {
    setLogs((oldLogs) => [...oldLogs, ...newLogs]);
  }
  function reloadInfo() {
    return getInfos().then(setInfo);
  }
  function reloadSetting() {
    return getSetting().then(setSettings);
  }
  useEffect(() => {
    reloadInfo();
    reloadSetting();
    const interval = setInterval(() => {
      Promise.all([
        getLogs().then(addLogs),
        getData().then(setData),
        getState().then(setStates),
      ]);
    }, REFRESH_TIME);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <DataCtx.Provider
      value={{
        info,
        data,
        settings,
        states,
        logs,
        setInfo: (info: SetableInfo) => {
          updateInfos(info).then(() => reloadInfo());
        },
      }}
    >
      {children}
    </DataCtx.Provider>
  );
}

export function useDataCtx(): DataCtxState {
  return useContext(DataCtx);
}
