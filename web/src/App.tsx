import React from "react";
import { LoggedRole } from "./api/requests";
import { Content, Footer, Header } from "./components";
import { LoginPage } from "./components/auth/LoginPage";
import { ConfigPanel } from "./components/configuration";
import { Flex } from "./components/shared";
import { AuthCtxUse } from "./contexts/AuthContext";
import { ConfigPanelCtxProvider } from "./contexts/ConfigPanelCtx";
import { DataCtxProvider } from "./contexts/DataCtx";
import test_acceuil from "./assets/test_acceuil.png";

function App(): JSX.Element {
  return (
    <AuthCtxUse>
      {({ role }) =>
        role === LoggedRole.NotAuthenticated ? (
          <>
            <LoginPage />
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundImage: `url(${test_acceuil})`,
                /*backgroundRepeat: "no-repeat",*/
                backgroundSize: "100% 100%",
                zIndex: 0,
              }}
            ></div>
          </>
        ) : (
          <DataCtxProvider>
            <ConfigPanelCtxProvider>
              <ConfigPanel />
              <Flex
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: "#212529",
                  flex: 1,
                }}
              >
                <Header />
                <Content />
                <Footer />
              </Flex>
            </ConfigPanelCtxProvider>
          </DataCtxProvider>
        )
      }
    </AuthCtxUse>
  );
}
/* eslint-disable import/no-default-export */
export default App;
