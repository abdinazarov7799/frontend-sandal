import {useStore} from "../../../store/index.js";
import {get, isArray, isEmpty} from "lodash";
import {
    Box,
    Button,
    IconButton,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Image
} from "@chakra-ui/react";
import {FiX} from "react-icons/fi";
import React from "react";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";

const MyRequestsContainer = () => {
    const { t } = useTranslation();
    const requests = useStore((state) => get(state, "requests", []));

    const deleteProduct = () => {
        Swal.fire({
            title: t("O'chirishga ishonchigiz komilmi?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#e22f2f",
            confirmButtonText: t("Ha"),
            cancelButtonText: t("Qaytish"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {

            }
        });
    }

  return(
      <>
        <Box bg={'white'} p={4} width="100%" borderRadius="md">
            <Stack>
                {
                    (!isEmpty(requests) && isArray(requests)) ?
                    (
                        <>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>{t("Rasmi")}</Th>
                                            <Th>{t("Nomi")}</Th>
                                            <Th>{t("Soni")}</Th>
                                            <Th>{t("O'chirish")}</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            requests?.map((user,i) => (
                                                <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                    <Td>
                                                        <Image
                                                            src={get(user,'img_url','-')}
                                                            width={'80px'}
                                                        />
                                                    </Td>
                                                    <Td>{get(user,'name','-')}</Td>
                                                    <Td>{get(user,'count','-')}</Td>
                                                    <Td><IconButton icon={<FiX />} onClick={() => deleteProduct(get(user,'id',''))} /></Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Button
                                mt={4}
                                colorScheme={"blue"}
                                w={"100%"}
                            >
                                {t("Ariza yuborish")}
                            </Button>
                        </>
                    ) : (
                        <Text
                            textAlign={"center"}
                            my={12}
                            fontSize={22}
                        >
                            {t("Ariza yo'q yoki jo'natilgan")}
                        </Text>
                        )
                }
            </Stack>
        </Box>
      </>
  )
}
export default MyRequestsContainer;
