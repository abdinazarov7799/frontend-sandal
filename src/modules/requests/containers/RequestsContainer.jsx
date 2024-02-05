import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem, AccordionPanel,
    Badge,
    Box, Button, Divider,
    Flex,
    Heading, Image,
    Stack,
    Text
} from "@chakra-ui/react";
import {get, isArray, isEmpty} from "lodash";
import dayjs from "dayjs";
import Pagination from "../../../components/pagination/index.jsx";
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";


const RequestsContainer = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { t } = useTranslation();

    const { data, isLoading,refetch } = useGetAllQuery({
        key: KEYS.order_list,
        url: URLS.order_list,
        params: {
            params: {
                page,
                size,
            }
        }
    });
    const { mutate:acceptMutate } = usePostQuery({
        url: URLS.order_accept,
        listKeyId: KEYS.order_list,
    });
    const { mutate:rejectMutate } = usePostQuery({
        url: URLS.order_reject,
        listKeyId: KEYS.order_list,
    });

    useEffect(() => {
        refetch()
    }, [page]);

    const acceptOrder = (id) => {
        acceptMutate(
            {
                url: URLS.order_accept,
                attributes: {
                    id
                }},
        );
    }
    const rejectOrder = (id) => {
        rejectMutate(
            {
                url: URLS.order_reject,
                attributes: {
                    id
                }},
        );
    }

  return(
      <>
        <Box bg={'white'} p={4} width="100%" borderRadius="md" mb={4}>
            <Heading size={'md'} textAlign={"center"} mb={6}>{t("Kelgan arizalar")}</Heading>
            {
                (!isEmpty(get(data,'data.orders',[])) && isArray(get(data,'data.orders'))) ? (
                    <Stack>
                        <Accordion allowToggle>
                            {
                                get(data,'data.orders',[]).map((order) => (
                                    <AccordionItem key={get(order,'id')}>
                                        <h2>
                                            <AccordionButton>
                                                <Flex
                                                    flex='1'
                                                    textAlign='left'
                                                    alignItems={"center"}
                                                    justifyContent={"space-between"}
                                                >
                                                    <Flex>
                                                        <Text fontWeight={600}>
                                                            {t("Filial")}:
                                                        </Text>
                                                        <Text mx={1}>
                                                            {get(order,'branch_name','-')}
                                                        </Text>
                                                        <Text ml={2} fontWeight={600}>
                                                            {t("Yaratgan")}:
                                                        </Text>
                                                        <Text mx={1}>
                                                            {get(order,'user_firstname','-')}
                                                        </Text>
                                                        <Text>
                                                            {get(order,'user_lastname','-')}
                                                        </Text>
                                                        <Text ml={2} fontWeight={600}>
                                                            {t("Yaratilgan vaqti")}:
                                                        </Text>
                                                        <Text mx={2}>
                                                            {dayjs(get(order,'createdAt','-')).format("DD-MM-YYYY HH:mm:ss")}
                                                        </Text>
                                                        <Text fontWeight={600}>
                                                            {t("Holati")}
                                                        </Text>
                                                        <Badge colorScheme='green' py={1} mx={2}>
                                                            {get(order,'status')}
                                                        </Badge>
                                                    </Flex>
                                                    <Flex>
                                                        <Button
                                                            colorScheme={"green"}
                                                            size={"sm"}
                                                            variant='outline'
                                                            ml={1}
                                                            onClick={() => acceptOrder(get(order,'id'))}
                                                        >
                                                            {t("Qabul qilish")}
                                                        </Button>
                                                        <Button
                                                            colorScheme={"red"}
                                                            size={"sm"}
                                                            mx={3}
                                                            variant='outline'
                                                            onClick={() => rejectOrder(get(order,'id'))}
                                                        >
                                                            {t("Rad etish")}
                                                        </Button>
                                                    </Flex>
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            {
                                                get(order,'items',[]).map((item) => (
                                                    <Box key={get(item,'id')}>
                                                        <Divider />
                                                        <Flex
                                                            alignItems={"center"}
                                                            justifyContent={"space-between"}
                                                            my={2}
                                                        >
                                                            <Image
                                                                src={get(item,'img_url')}
                                                                width={'80px'}
                                                                height={'60px'}
                                                                objectFit={"cover"}
                                                            />
                                                            <Text>{get(item,'name')}</Text>
                                                            <Text>{get(item,'count')}</Text>
                                                        </Flex>
                                                    </Box>
                                                ))
                                            }
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    </Stack>
                ) : (
                    <Text
                        textAlign={"center"}
                        my={12}
                        fontSize={22}
                    >
                        {t("Malumot yo'q")}
                    </Text>
                )
            }
            <Pagination setPage={setPage} pageCount={get(data, "data.totalPages", 1)} page={page} />
        </Box>
      </>
  )
}
export default RequestsContainer;
