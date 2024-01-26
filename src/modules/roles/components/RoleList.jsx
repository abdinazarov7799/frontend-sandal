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
import CreateRole from "./CreateRole";
import {ContentLoader} from "../../../components/loader";


const RoleList = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data,isLoading,refetch} = useGetAllQuery({
        key: KEYS.get_all_role,
        url: URLS.auth_role,
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.get_all_role,
    })

    const deleteRole = (roleID) => {
        Swal.fire({
            title: t("Do you want to delete a role?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            showCancelButton: true,
            confirmButtonColor: "#e22f2f",
            confirmButtonText: t("Yes"),
            cancelButtonText: t("Back"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({url: `${URLS.auth_role}/${roleID}`},{
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
                <Heading size={'md'}>{t('Roles')}</Heading>
                <Button size={"md"} w={150} justifyContent={"space-around"} onClick={onOpen}><FiPlus /> {t('Create role')}</Button>
            </Flex>
            <Stack divider={<StackDivider />} spacing='4'>
                {
                    (!isEmpty(get(data,'data.content',null)) &&
                        isArray(get(data,'data.content',null))) &&
                    (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>{t('Role id')}</Th>
                                        <Th>{t('Role name')}</Th>
                                        <Th>{t('Description')}</Th>
                                        <Th>{t('Delete')}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(data,'data.content',[]).map((role,i) => (
                                            <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                <Td>{get(role,'id','')}</Td>
                                                <Td>{get(role,'roleName','')}</Td>
                                                <Td>{get(role,'description')}</Td>
                                                <Td><IconButton icon={<FiX />} onClick={() => deleteRole(get(role,'id',''))} /></Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )
                }
            </Stack>
            <CreateRole onOpen={onOpen} isOpen={isOpen} onClose={onClose} refetch={refetch}/>
        </>
    )
}
export default RoleList