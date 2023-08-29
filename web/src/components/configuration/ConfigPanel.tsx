import React, { useState } from "react";
import { Field } from ".";
import {
  changePassword,
  setApa18,
  setApa35,
  setApa63,
  updateInfos,
} from "../../api/requests";
import { useConfigPanelCtx } from "../../contexts/ConfigPanelCtx";
import { useDataCtx } from "../../contexts/DataCtx";
import { useErrorState } from "../../contexts/ErrorState";
import { t } from "../../utils/Lang";
import { Flex } from "../shared";
import { Button } from "../shared/Button";
import { PasswordField } from "./PasswordField";
const styles: Record<string, React.CSSProperties> = {
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 500,
    backgroundColor: "rgba(50,50,50,0.7)",
  },
  configModal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: innerWidth,
    height: innerHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  configPanel: {
    flex: 0,
    flexShrink: 1,
    backgroundColor: "#212529",
    borderColor: "#7e4d36",
    borderStyle: "solid",
    flexDirection: "column",
    minWidth: "60%",
    borderWidth: 1,
    zIndex: 501,
  },
};
export const ConfigPanel = (): JSX.Element | null => {
  const { close: realClose, isOpen } = useConfigPanelCtx();
  const {
    info: {
      ipAddress: oldIpAddress,
      netMask: oldNetMask,
      deviceName: oldDeviceName,
      alertMail: oldAlertMail,
      //wifiPass: oldWifiPass,
    },
    setInfo,
  } = useDataCtx();
  const [newIpAddress, setIpAddress] = useState<string>();
  const [newNetMask, setNetMask] = useState<string>();
  const [newDeviceName, setDeviceName] = useState<string>();
  const [newAlertMail, setAlertMail] = useState<string>();
  //const [newWifipass, setwifipass] = useState<string>();
  const [errMsg, setErrorMsg] = useErrorState("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassworda, setNewPassworda] = useState<string>("");
  const ipAddress = newIpAddress ?? oldIpAddress;
  const netMask = newNetMask ?? oldNetMask;
  const deviceName = newDeviceName ?? oldDeviceName;
  const alertMail = newAlertMail ?? oldAlertMail;
  //const wifiPass = newWifipass ?? oldWifiPass;
  function close() {
    setIpAddress(oldIpAddress);
    setDeviceName(oldDeviceName);
    setAlertMail(oldAlertMail);
    //setwifipass(oldWifiPass);
    realClose();
  }
  function confirm() {
    setInfo({ ipAddress, netMask, deviceName, alertMail });
    updateInfos({ ipAddress, netMask, deviceName, alertMail });
    realClose();
  }

  function boutton() {
    <>
      <Button value={t("setApash18")} onClick={setApa18} />
      <Button value={t("setApash35")} onClick={setApa35} />
      <Button value={t("setApash63")} onClick={setApa63} />
    </>;
  }
  const handlePasswordChangeProcess = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      newPassworda.length === 0
    ) {
      return setErrorMsg("Please fill required field");
    }

    if (oldPassword === newPassword) {
      return setErrorMsg(t("passwordIntegrityError"));
    }

    if (newPassword !== newPassworda) {
      return setErrorMsg(t("identiqueproblem"));
    }
    if (newPassword == newPassworda) {
      changePassword({ oldPassword, newPassword })
        .then(() => {
          setOldPassword("");
          setNewPassword("");
          setNewPassworda("");
          return setErrorMsg(t("passwordchanged"));
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    }
  };

  return isOpen ? (
    <Flex style={styles.main} onClick={close}>
      <Flex style={styles.configModal}>
        <Flex
          style={styles.configPanel}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
        >
          <form>
            <p style={{ textAlign: "center", padding: 10 }}>
              {t("cofigurationTitle")}
            </p>
            <Field
              type={t("ipAddress")}
              label={t("ipAddress")}
              value={ipAddress}
              onTextChange={setIpAddress}
            />
            <Field
              type={t("netMask")}
              label={t("netMask")}
              value={netMask}
              onTextChange={setNetMask}
            />
            <Field
              label={t("deviceName")}
              value={deviceName}
              onTextChange={setDeviceName}
              type={t("deviceName")}
            />
            <Field
              label={t("alertMail")}
              value={alertMail}
              onTextChange={setAlertMail}
              type={t("alertMail")}
            />
            {/* <Field label="Identifiant" value="val" /> */}
            <Flex style={{ justifyContent: "flex-end" }}>
              <Button value={t("confirm")} onClick={confirm} />
              <Button value={t("cancel")} onClick={close} />
            </Flex>
            <Flex style={{ padding: 20, justifyContent: "flex-start" }}>
              <p style={{ color: "white" }}>{t("changePassword")}</p>
              <Flex style={{ justifyContent: "center" }}>
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {errMsg}
                </p>
              </Flex>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
                paddingLeft: 10,
                flexGrow: 1,
              }}
            >
              <PasswordField
                type="password"
                label={t("oldPassword")}
                value={oldPassword}
                onTextChange={setOldPassword}
              />
              <PasswordField
                type="password"
                label={t("newPassword")}
                value={newPassword}
                onTextChange={setNewPassword}
              />
              <PasswordField
                type="password"
                label={"Confirmer le nouveau mot de passe"}
                value={newPassworda}
                onTextChange={setNewPassworda}
              />
              <Flex style={{ justifyContent: "center", flexGrow: 0 }}>
                <Button
                  value={t("confirmPassword")}
                  onClick={handlePasswordChangeProcess}
                />
                {boutton()};
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  ) : null;
};
