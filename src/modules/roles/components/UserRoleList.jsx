import {
    Button,
    Flex, Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    StackDivider, Stat, StatLabel, StatNumber, Table, TableContainer, Tbody, Td,
    Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get, isArray, isEmpty, isEqual} from "lodash";
import Swal from "sweetalert2";
import {FiPlus, FiX} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery";
import AddRoleToUser from "./AddRoleToUser";


const UserRoleList = () => {
    const [phone, setPhone] = useState('');
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data,isLoading,refetch} = useGetAllQuery({
        key: KEYS.find_users_by_phone,
        url: URLS.find_users_by_phone,
        params:{
            params:{
                phone,
            }
        },
        enabled: false,
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.find_users_by_phone,
    })
    useEffect(() => {
        if (isEqual(phone.toString().length, 9)){
            refetch();
        }
    }, [phone]);

    const revokeRole = (roleName) => {
        Swal.fire({
            title: t("Do you want to cancel a role?"),
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
                mutate({url: `${URLS.auth_role}/${get(data,'data.id',null)}/${roleName}`},{
                    onSuccess: () => {
                        refetch();
                    }
                });
            }
        });
    };

    return(
        <>
            <Heading mb={4} size={'md'}>{t('Find user')}</Heading>
            <InputGroup mt={2} mb={4}>
                <Input
                    placeholder={"Search"}
                    type={"number"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <InputRightElement children={<FaSearch />} />
            </InputGroup>
            {
                !isEmpty(get(data,'data.roles',null)) && (
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
                        mb={4}
                    >
                        <Stat display={"flex"} justifyContent={"start"}>
                            <StatLabel>{t("ID")}</StatLabel>
                            <StatNumber fontSize={14} pr={2}>
                                {get(data, 'data.id','')}
                            </StatNumber>
                        </Stat>
                        <Stat display={"flex"} justifyContent={"start"}>
                            <StatLabel>{t("Phone")}</StatLabel>
                            <StatNumber fontSize={14}>
                                {get(data, 'data.phone','')}
                            </StatNumber>
                        </Stat>
                        <Button size={"md"} w={140} justifyContent={"space-around"} onClick={onOpen}><FiPlus /> {t('Grant role')}</Button>
                    </Flex>
                )
            }
            <AddRoleToUser
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
                user={get(data, 'data.id','')}
            />
            <Stack divider={<StackDivider />} spacing='4'>
                {
                    (!isEmpty(get(data,'data.roles',null)) &&
                        isArray(get(data,'data.roles',null))) &&
                    (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Role id</Th>
                                        <Th>Role name</Th>
                                        <Th>Description</Th>
                                        <Th>Revoke</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(data,'data.roles',[]).map((role,i) => (
                                            <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                <Td>{get(role,'id','')}</Td>
                                                <Td>{get(role,'roleName','')}</Td>
                                                <Td>{get(role,'description')}</Td>
                                                <Td><IconButton icon={<FiX />} onClick={() => revokeRole(get(role,'roleName',''))} /></Td>
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
export default UserRoleList