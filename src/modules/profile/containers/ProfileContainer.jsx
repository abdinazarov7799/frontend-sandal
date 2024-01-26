import {ContentLoader, OverlayLoader} from "../../../components/loader";
import {
    AbsoluteCenter,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Stat,
    StatLabel,
    StatNumber,
    Text, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import ProfileImg from "../../../assets/images/user.png";
import {useTranslation} from "react-i18next";
import {get} from "lodash";
import {useStore} from "../../../store";
import ChangePassword from "../components/ChangePassword";
import Swal from "sweetalert2";
import usePostQuery from "../../../hooks/api/usePostQuery";

const ProfileContainer = () => {
    const { t } = useTranslation();
    const username = useStore((state) => get(state, "user.username", null));
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate, isLoading } = usePostQuery({
        url: URLS.change_password,
        hideSuccessToast: true,
    });
    const {data,isFetching} = useGetAllQuery({
        key: KEYS.get_auth_user_info,
        url: URLS.get_auth_user_info,
        params:{
            params:{
                username,
            }
        },
    });
    const changePasswordRequest = (data) => {
        mutate(
            { url: URLS.change_password, attributes: data },
            {
                onSuccess: ({ data }) => {
                    onClose();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        backdrop: "rgba(0,0,0,0.9)",
                        background: "none",
                        title: t("Password changed successfully"),
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
  return(
      <>
          <Box bg={'white'} p={4} width="100%" borderRadius="md">
              {isFetching ? <OverlayLoader/> : (
                  <>
                      <Heading size="md" m={4}>
                          {t("Profile page")}
                      </Heading>
                      <Divider />
                      <Flex mt={6}>
                          <Image fallbackSrc={ProfileImg} w={120} mr={4}/>
                          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                              <Text>{t("FIO")}</Text>
                              <Text fontSize={20} fontWeight={600} mb={2}>{get(data, 'data.fullName','')}</Text>
                              <Text>{t("Passport")}</Text>
                              <Text fontSize={20} fontWeight={600}>{get(data, 'data.passport','')}</Text>
                          </Box>
                      </Flex>
                      <Box position='relative' my={8}>
                          <Divider />
                          <AbsoluteCenter bg={'white'} px={4}>
                              {t("More information")}
                          </AbsoluteCenter>
                      </Box>
                      <Flex
                          flexDirection={{
                              sm: "column",
                              lg: "row",
                          }}
                          justifyContent={"space-between"}
                          borderWidth={1}
                          rounded={"lg"}
                          shadow={"sm"}
                          py={2}
                          px={4}
                      >
                          <Box
                               py={2}
                               px={4}
                               w={"50%"}
                          >
                              <Stat display={"flex"} justifyContent={"start"} mb={4}>
                                  <StatLabel>{t("User name")}</StatLabel>
                                  <StatNumber fontSize={14} pr={2}>
                                      {get(data, 'data.userName','')}
                                  </StatNumber>
                              </Stat>
                              <Stat display={"flex"} justifyContent={"start"} mb={4}>
                                  <StatLabel>{t("Phone")}</StatLabel>
                                  <StatNumber fontSize={14}>
                                      {get(data, 'data.phone','')}
                                  </StatNumber>
                              </Stat>
                              <Stat display={"flex"} justifyContent={"start"}>
                                  <StatLabel>{t("Birthday")}</StatLabel>
                                  <StatNumber fontSize={14}>
                                      {get(data, 'data.birthday','')}
                                  </StatNumber>
                              </Stat>
                          </Box>
                          <Box
                               py={2}
                               px={4}
                               w={"50%"}
                          >
                              <Stat display={"flex"} justifyContent={"start"} mb={4}>
                                  <StatLabel>{t("PINFL")}</StatLabel>
                                  <StatNumber fontSize={14} pr={2}>
                                      {get(data, 'data.pinfl','')}
                                  </StatNumber>
                              </Stat>
                              <Stat display={"flex"} justifyContent={"start"} mb={4}>
                                  <StatLabel>{t("INN")}</StatLabel>
                                  <StatNumber fontSize={14}>
                                      {get(data, 'data.inn','')}
                                  </StatNumber>
                              </Stat>
                              <Stat display={"flex"} justifyContent={"start"}>
                                  <StatLabel>{t("Gender")}</StatLabel>
                                  <StatNumber fontSize={14}>
                                      {get(data, 'data.gender','')}
                                  </StatNumber>
                              </Stat>
                          </Box>
                      </Flex>
                      <Flex mt={3}>
                          <Button onClick={onOpen}>{t("Change password")}</Button>
                          <Modal isOpen={isOpen} onClose={onClose} >
                              <ModalOverlay />
                              <ModalContent>
                                  <ModalHeader>{t('Change password')}</ModalHeader>
                                  <ModalCloseButton />

                                  <ModalBody>
                                      <ChangePassword changePasswordRequest={changePasswordRequest}/>
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button colorScheme='cyan'
                                              mr={3}
                                              onClick={onClose}
                                              color={"white"}
                                      >
                                          {t('Close')}
                                      </Button>
                                  </ModalFooter>
                              </ModalContent>
                          </Modal>
                      </Flex>
                  </>
              )}
          </Box>
      </>
  )
}
export default ProfileContainer;
