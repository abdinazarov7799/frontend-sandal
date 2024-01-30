import {
    AbsoluteCenter,
    Box,
    Divider,
    Flex,
    Heading,
    Image,
    Stat,
    StatLabel,
    StatNumber,
    Text
} from "@chakra-ui/react";
import React from "react";
import ProfileImg from "../../../assets/images/user.png";
import {useTranslation} from "react-i18next";
import {get} from "lodash";
import {useStore} from "../../../store";

const ProfileContainer = () => {
    const { t } = useTranslation();
    const user = useStore((state) => get(state, "user", null));
  return(
      <>
          <Box bg={'white'} p={4} width="100%" borderRadius="md">
              <Heading size="md" my={4}>
                  {t("Profil")}
              </Heading>
              <Divider />
              <Flex mt={6}>
                  <Image fallbackSrc={ProfileImg} w={120} mr={4}/>
                  <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                      <Text>{t("Ism")}</Text>
                      <Text fontSize={20} fontWeight={600} mb={2}>{get(user, 'user.firstname','')}</Text>
                      <Text>{t("Familiya")}</Text>
                      <Text fontSize={20} fontWeight={600}>{get(user, 'user.lastname','')}</Text>
                  </Box>
              </Flex>
              <Box position='relative' my={8}>
                  <Divider />
                  <AbsoluteCenter bg={'white'} px={4}>
                      {t("Ko'proq malumot")}
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
                  <Stat display={"flex"} justifyContent={"start"} mb={4}>
                      <StatLabel>{t("Login")}</StatLabel>
                      <StatNumber fontSize={14} pr={2}>
                          {get(user, 'user.login','')}
                      </StatNumber>
                  </Stat>
                  <Stat display={"flex"} justifyContent={"start"} mb={4}>
                      <StatLabel>{t("Telefon")}</StatLabel>
                      <StatNumber fontSize={14}>
                          {get(user, 'user.phone','')}
                      </StatNumber>
                  </Stat>
                  <Stat display={"flex"} justifyContent={"start"}>
                      <StatLabel>{t("Filial")}</StatLabel>
                      <StatNumber fontSize={14}>
                          {get(user, 'branch.name','')}
                      </StatNumber>
                  </Stat>
                  <Stat display={"flex"} justifyContent={"start"} mb={4}>
                      <StatLabel>{t("Roli")}</StatLabel>
                      <StatNumber fontSize={14} pr={2}>
                          {get(user, 'role.name','')}
                      </StatNumber>
                  </Stat>
              </Flex>
          </Box>
      </>
  )
}
export default ProfileContainer;
