import {
    Button,
    Flex, Heading,
    IconButton,
    Stack,
    StackDivider,Table, TableContainer, Tbody, Td,
    Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get, isArray, isEmpty, isEqual} from "lodash";
import Swal from "sweetalert2";
import {FiPlus, FiX} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery";
import CreateBranch from "./CreateBranch.jsx";
import {ContentLoader} from "../../../components/loader";
import dayjs from "dayjs";


const BranchList = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data,isLoading,refetch} = useGetAllQuery({
        key: KEYS.branch_list,
        url: URLS.branch_list,
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.branch_list,
    })

    const deleteBranch = (id) => {
        Swal.fire({
            title: t("Filialni o'chirishga ishonchingiz komilmi?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            showCancelButton: true,
            confirmButtonColor: "#e22f2f",
            confirmButtonText: t("Ha"),
            cancelButtonText: t("Yo'q"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({url: `${URLS.branch_list}/${id}`},{
                    onSuccess: () => {
                        refetch();
                    }
                });
            }
        });
    };

    if (isLoading){
        return <ContentLoader />
    }
    return(
        <>
            <Flex display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={4}>
                <Heading size={'md'}>{t('Filiallar')}</Heading>
                <Button
                    size={"md"}
                    w={160}
                    justifyContent={"space-around"}
                    onClick={onOpen}>
                    <FiPlus /> {t("Filial qo'shish")}
                </Button>
            </Flex>
            <Stack divider={<StackDivider />} spacing='4'>
                {
                    (!isEmpty(get(data,'data',null)) &&
                        isArray(get(data,'data',null))) &&
                    (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>{t('Nomi')}</Th>
                                        <Th>{t('Tavsifi')}</Th>
                                        <Th>{t("Yaratilgan sana")}</Th>
                                        <Th>{t("Yangilangan sana")}</Th>
                                        <Th>{t("O'chirish")}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(data,'data',[]).map((branch,i) => (
                                            <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                <Td>{get(branch,'name','')}</Td>
                                                <Td>{get(branch,'description')}</Td>
                                                <Td>
                                                    {dayjs(get(branch,'createdAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td>
                                                    {dayjs(get(branch,'updatedAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td>
                                                    <IconButton
                                                        icon={<FiX />}
                                                        onClick={() => deleteBranch(get(branch,'id',''))}
                                                    />
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )
                }
            </Stack>
            <CreateBranch onOpen={onOpen} isOpen={isOpen} onClose={onClose} refetch={refetch}/>
        </>
    )
}
export default BranchList
