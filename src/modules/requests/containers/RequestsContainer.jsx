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
    Flex, FocusLock,
    Heading, IconButton, Image, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger,
    Stack,
    Text, useDisclosure
} from "@chakra-ui/react";
import {get, isArray, isEmpty} from "lodash";
import dayjs from "dayjs";
import Pagination from "../../../components/pagination/index.jsx";
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import RejectForm from "../components/RejectForm.jsx";


const RequestsContainer = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { t } = useTranslation();

    const { data, isLoading,refetch } = usePaginateQuery({
        key: KEYS.order_list,
        url: URLS.order_list,
        params: {
            params: {
                size,
            }
        },
        page
    });
    const { mutate:acceptMutate } = usePostQuery({
        url: URLS.order_accept,
        listKeyId: KEYS.order_list,
    });

    const acceptOrder = (id) => {
        acceptMutate(
            {
                url: URLS.order_accept,
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
                        <Accordion allowToggle overflowX={"scroll"}>
                            {
                                get(data,'data.orders',[]).map((order) => (
                                    <AccordionItem key={get(order,'id')}>
                                        <AccordionButton>
                                            <Flex
                                                flex='1'
                                                textAlign='left'
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                            >
                                                <Flex alignItems={"center"}>
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
                                                    <Text ml={2} fontWeight={600} w={140}>
                                                        {t("Yaratilgan vaqti")}:
                                                    </Text>
                                                    <Text mx={2} w={160}>
                                                        {dayjs(get(order,'createdAt','-')).format("DD-MM-YYYY HH:mm:ss")}
                                                    </Text>
                                                    <Text fontWeight={600}>
                                                        {t("Holati")}
                                                    </Text>
                                                    <Badge
                                                        colorScheme='green'
                                                        mx={2}
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                        height={'30px'}
                                                    >
                                                        {t(get(order,'status'))}
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
                                                    <RejectForm id={get(order,'id')}/>
                                                </Flex>
                                            </Flex>
                                            <AccordionIcon />
                                        </AccordionButton>
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
