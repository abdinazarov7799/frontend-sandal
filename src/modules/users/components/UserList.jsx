import {
    Button,
    Flex, Heading,
    IconButton,
    Stack,
    StackDivider, Table, TableContainer, Tbody, Td,
    Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import React, from "react";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get, isArray, isEmpty, isEqual} from "lodash";
import Swal from "sweetalert2";
import {FiPlus, FiX} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery";
import dayjs from "dayjs";
import CreateUser from "./CreateUser.jsx";


const UserList = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data,isLoading,refetch} = useGetAllQuery({
        key: KEYS.users_list,
        url: URLS.users_list,
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.users_list,
    })

    const deleteUser = (id) => {
        Swal.fire({
            title: t("Foydalanuvchini o'chirishga ishonchingiz komilmi?"),
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
                mutate({url: `${URLS.users_list}/${id}`},{
                    onSuccess: () => {
                        refetch();
                    }
                });
            }
        });
    };

    return(
        <>
            <Flex justifyContent={"space-between"} mb={6}>
                <Heading mb={4} size={'md'}>{t('Foydalanuvchilar')}</Heading>
                <Button
                    size={"md"}
                    w={230}
                    justifyContent={"space-around"}
                    onClick={onOpen}
                >
                    <FiPlus /> {t('Foydalanuvchi yaratish')}
                </Button>
            </Flex>
            <CreateUser
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
                user={get(data, 'data.id','')}
            />
            <Stack>
                {
                    (!isEmpty(get(data,'data',null)) &&
                        isArray(get(data,'data',null))) &&
                    (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>{t("Login")}</Th>
                                        <Th>{t("Ism")}</Th>
                                        <Th>{t("Familiya")}</Th>
                                        <Th>{t("Telefon")}</Th>
                                        <Th>{t("Yaratilgan sana")}</Th>
                                        <Th>{t("Yangilangan sana")}</Th>
                                        <Th>{t("O'chirish")}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(data,'data',[])?.map((user,i) => (
                                            <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                <Td>{get(user,'login','-')}</Td>
                                                <Td>{get(user,'firstname','-')}</Td>
                                                <Td>{get(user,'lastname','-')}</Td>
                                                <Td>{get(user,'phone','-')}</Td>
                                                <Td>
                                                    {dayjs(get(user,'createdAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td>
                                                    {dayjs(get(user,'updatedAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td><IconButton icon={<FiX />} onClick={() => deleteUser(get(user,'id',''))} /></Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )
                }
            </Stack>
        </>
    )
}
export default UserList
