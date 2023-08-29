import React, { useState } from "react";
import { useAuthCtx } from "../../contexts/AuthContext";
import { useErrorState } from "../../contexts/ErrorState";
import { t } from "../../utils/Lang";
import { Field } from "../configuration";
import { PasswordField } from "../configuration/PasswordField";
import { Flex } from "../shared";
import { Button } from "../shared/Button";

const styles: Record<string, React.CSSProperties> = {
  main: {
    flexDirection: "column",
    backgroundColor: "#212529",
    borderColor: "#7e4d36",
    borderStyle: "solid",
    justifyContent: "center",
    flexGrow: 0,
    marginRight: "5%",
    zIndex: 1,
  },
};

export function LoginPage(): JSX.Element {
  const { login } = useAuthCtx();
  const [username, setUsername] = useState<string>("");
  const [password, setPasswod] = useState<string>("");
  const [errMsg, setErrorMsg] = useErrorState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username && !password) {
      setErrorMsg(t("empty"));
    }

    try {
      const data = await login(username, password);
      if (!data) {
        setErrorMsg(t("incorrectPassword"));
      }
    } catch (error) {
      setErrorMsg(t("incorrectPassword"));
    }
  };

  return (
    <Flex style={styles.main}>
      <form onSubmit={handleSubmit}>
        <Flex
          style={{
            flexDirection: "column",
          }}
        >
          <Field
            label={t("username")}
            onTextChange={setUsername}
            value={username}
            type="username"
          />

          <PasswordField
            label={t("password")}
            onTextChange={setPasswod}
            value={password}
            type="password"
          />
        </Flex>
        <p
          style={{
            color: "red",
            margin: 5,
            height: 20,
            textAlign: "center",
          }}
        >
          {errMsg}
        </p>
        <Button
          value={t("loginButton")}
          type="submit"
          style={{
            marginLeft: "35%",
            marginBottom: "1rem",
          }}
        />
      </form>
    </Flex>
  );
}
