import React, { createContext, ReactNode, useContext, useState } from "react";

const noop = function () {
  return undefined;
};

export interface ConfigPanelCtxState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
export const ConfigPanelCtx = createContext<ConfigPanelCtxState>({
  isOpen: false,
  open: noop,
  close: noop,
});

export function ConfigPanelCtxProvider({
  children,
}: {
  children?: ReactNode | undefined;
}): JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <ConfigPanelCtx.Provider
      value={{
        isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
      {children}
    </ConfigPanelCtx.Provider>
  );
}

export function useConfigPanelCtx(): ConfigPanelCtxState {
  return useContext(ConfigPanelCtx);
}
