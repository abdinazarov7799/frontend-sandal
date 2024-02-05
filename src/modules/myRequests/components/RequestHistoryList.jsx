import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import React, {useEffect, useState} from "react";
import {get, isArray, isEmpty} from "lodash";
import Pagination from "../../../components/pagination/index.jsx";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel, Badge,
    Box, Divider, Flex,
    Heading, Image,
    Stack, Text
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";


const RequestHistoryList = ({user_id}) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { t } = useTranslation();

    const { data, isLoading,refetch } = useGetAllQuery({
        key: KEYS.user_order_list,
        url: URLS.user_order_list,
        params: {
            params: {
                page,
                size,
                userId: user_id,
            },
        },
    });

    useEffect(() => {
        refetch();
    }, [page]);

    return(
      <>
          <Box bg={'white'} p={4} width="100%" borderRadius="md">
              <Heading size={'md'} textAlign={"center"} mb={6}>{t("Jarayondagi arizalar")}</Heading>
              {
                  (!isEmpty(get(data,'data.orders',[])) && isArray(get(data,'data.orders'))) ? (
                      <Stack>
                          <Accordion allowToggle>
                              {
                                  get(data,'data.orders',[]).map((order) => (
                                      <AccordionItem key={get(order,'id')}>
                                          <h2>
                                              <AccordionButton>
                                                  <Flex as="span" flex='1' textAlign='left'>
                                                      <Text>
                                                          {t("Yaratilgan vaqti")}
                                                      </Text>
                                                      <Text mx={4}>
                                                          {dayjs(get(order,'createdAt','-')).format("DD-MM-YYYY HH:mm:ss")}
                                                      </Text>
                                                      <Badge colorScheme='green' py={1}>
                                                          {get(order,'status')}
                                                      </Badge>
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
export default RequestHistoryList;
