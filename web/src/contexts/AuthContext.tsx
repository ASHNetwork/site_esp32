import React, { createContext, ReactNode, useContext, useState } from "react";
import { apiLogin, apiLogout, LoggedRole } from "../api/requests";

export interface AuthCtxState {
  role: LoggedRole;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthCtx = createContext<AuthCtxState>({
  login: () => Promise.resolve(false),
  logout: () => undefined,
  role: LoggedRole.NotAuthenticated,
});

export function AuthCtxProvider({
  children,
}: {
  children?: ReactNode | undefined;
}): JSX.Element {
  const [role, setRole] = useState<LoggedRole>(LoggedRole.NotAuthenticated);
  function login(username: string, password: string) {
    return apiLogin({ username, password }).then((newRole) => {
      setRole(newRole);
      return LoggedRole.NotAuthenticated !== newRole;
    });
  }
  function logout() {
    apiLogout();
    setRole(LoggedRole.NotAuthenticated);
  }
  return (
    <AuthCtx.Provider
      value={{
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuthCtx(): AuthCtxState {
  return useContext(AuthCtx);
}

export const AuthCtxUse = ({
  children,
}: {
  children: (ctx: AuthCtxState) => JSX.Element;
}): JSX.Element => (
  <AuthCtxProvider>
    <AuthCtx.Consumer>{children}</AuthCtx.Consumer>
  </AuthCtxProvider>
);
