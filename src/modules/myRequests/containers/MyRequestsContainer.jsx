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
import {URLS} from "../../../constants/url.js";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import useRequests from "../../../store/requests.jsx";
import RequestHistoryList from "../components/RequestHistoryList.jsx";
import useAuth from "../../../hooks/auth/useAuth.js";

const MyRequestsContainer = () => {
    const { t } = useTranslation();
    const requests = useRequests((state) => get(state, "requests", []));
    const setRequests = useRequests((state) => get(state, "setRequests", ()=>{}));
    const { user } = useAuth({});
    const user_id = get(user,'user.id');

    const { mutate } = usePostQuery({
        url: URLS.order_list,
        hideSuccessToast: true,
    });

    const newRequest = () => {
        mutate(
            {
                url: URLS.order_list,
                attributes: {
                    items: requests,
                    user_id,
                }},
            {
                onSuccess: ({ data }) => {
                    setRequests([]);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        backdrop: "rgba(0,0,0,0.9)",
                        background: "none",
                        title: t("Arizangiz muvofaqiyatli jo'natildi"),
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
    const deleteProduct = (productId) => {
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
                const updatedRequests = requests.filter((item) => item.id !== productId);
                setRequests(updatedRequests);
            }
        });
    }

  return(
      <>
        <Box bg={'white'} p={4} width="100%" borderRadius="md" mb={4}>
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
                                            requests?.map((product,i) => (
                                                <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                    <Td>
                                                        <Image
                                                            src={get(product,'img_url','-')}
                                                            width={'80px'}
                                                        />
                                                    </Td>
                                                    <Td>{get(product,'name','-')}</Td>
                                                    <Td>{get(product,'count','-')}</Td>
                                                    <Td>
                                                        <IconButton
                                                            icon={<FiX />}
                                                            onClick={() => deleteProduct(get(product,'id',''))}
                                                        />
                                                    </Td>
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
                                onClick={newRequest}
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
                            {t("Aktiv arizalar mavjud emas")}
                        </Text>
                        )
                }
            </Stack>
        </Box>
          <RequestHistoryList user_id={user_id}/>
      </>
  )
}
export default MyRequestsContainer;
