import React, { useEffect } from "react";
import {Box, Image, Text} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { get } from "lodash";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { URLS } from "../../../constants/url";
import { useSettingsStore, useStore } from "../../../store";
import usePostQuery from "../../../hooks/api/usePostQuery";
import { OverlayLoader } from "../../../components/loader";
import logo from "../../../assets/images/logo.png";
import {useTranslation} from "react-i18next";

const LoginContainer = ({ ...rest }) => {
  const {t} = useTranslation()
  const { mutate, isLoading } = usePostQuery({
    url: URLS.login,
    hideSuccessToast: true,
  });
  const setToken = useSettingsStore((state) =>
    get(state, "setToken", () => {})
  );
  const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));

  const navigate = useNavigate();

  const loginRequest = (data) => {
    mutate(
      { url: URLS.login, attributes: data },
      {
        onSuccess: ({ data }) => {
          setToken(get(data, "access_token", null));
          setAuthenticated(true);
          navigate("/auth");
          Swal.fire({
            position: "center",
            icon: "success",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            title: t("Добро пожаловать в нашу систему"),
            iconColor: "#0BC4EA ",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "title-color",
            },
          });
        },
      }
    );
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <div className="text-center">
        <Image src={logo} className={"logo"} />
      </div>
      <LoginForm loginRequest={loginRequest} />
      <Box mt={4} textAlign={"center"}>
        <Link to={'/auth/register'}>{t("Register")}</Link>
      </Box>
    </>
  );
};

export default LoginContainer;
