import React, {useState} from "react";
import {Box, Image} from "@chakra-ui/react";
import {get, isEmpty} from "lodash";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { URLS } from "../../../constants/url";
import usePostQuery from "../../../hooks/api/usePostQuery";
import { OverlayLoader } from "../../../components/loader";
import logo from "../../../assets/images/logo.png";
import RegisterForm from "../components/RegisterForm";
import {useTranslation} from "react-i18next";

const RegisterContainer = ({ ...rest }) => {
  const {t} = useTranslation();
  const [confirmToken, setConfirmToken] = useState(null);
  const { mutate, isLoading } = usePostQuery({
    url: URLS.register,
    hideSuccessToast: true,
  });

  const navigate = useNavigate();

    const registerRequest = (data) => {
        mutate(
            { url: URLS.register, attributes: data },
            {
                onSuccess: ({ data }) => {
                    setConfirmToken(get(data, "token.token", null));
                },
            }
        );
    };
  const confirmRequest = (data) => {
    mutate(
      { url: URLS.confirm, attributes: data },
      {
        onSuccess: ({ data }) => {
          navigate("/auth");
          Swal.fire({
            position: "center",
            icon: "success",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            title: t("Success"),
            iconColor: "#0BC4EA ",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "title-color",
            },
          });
        }
      }
    );
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <div className="text-center">
        <Image src={logo} className={"logo"} />
      </div>
        <RegisterForm registerRequest={registerRequest} />
      <Box mt={4} textAlign={"center"}>
        <Link to={'/auth'}>{t("Login")}</Link>
      </Box>
    </>
  );
};

export default RegisterContainer;
