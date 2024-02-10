import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    Input,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import { KEYS } from "../../../constants/key.js";
import { URLS } from "../../../constants/url.js";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";
import { AiOutlinePlus } from "react-icons/ai";
import {get, isArray, isEmpty, isEqual} from "lodash";
import Pagination from "../../../components/pagination/index.jsx";
import { CreateProduct } from "../components/CreateProduct.jsx";
import {toast} from "react-toastify";
import useRequests from "../../../store/requests.jsx";
import Swal from "sweetalert2";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import UpdateProduct from "../components/UpdateProduct.jsx";

const ProductsViewContainer = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:updateIsOpen, onOpen:updateOnOpen, onClose:updateOnClose } = useDisclosure();
    const [order, setOrder] = useState({});
    const requests = useRequests((state) => get(state, "requests", []));
    const setRequests = useRequests((state) => get(state, "setRequests", () => {}));

    const { data, isLoading, isFetching, refetch } = useGetAllQuery({
        key: KEYS.products_list,
        url: URLS.products_list,
        params: {
            params: {
                page,
                size,
                category_id: id,
            },
        },
    });

    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.products_list
    });

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const onChange = (e, data) => {
        const { value, max} = e.target;
        const { id, name, img_url } = data;

        if (+value <= +max){
            const productObj = {
                id,
                name,
                img_url,
                count: value,
            };
            if (isEmpty(value)){
                setOrder({})
            }else {
                setOrder(productObj);
            }
        }else {
            toast.error(t("Noto'g'ri qiymat kiritdingiz"))
        }
    };
    const addToRequest = () => {
        if (!isEmpty(order)) {
            toast.success(t("Arizalar ro'yxatiga qo'shildi"));
            setRequests([...requests, order]);
            setOrder({})
        } else {
            toast.error(t("Arizaga qo'shish uchun mahsulot tanlang"));
        }
    };

    const deleteProduct = (id) => {
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
                mutate({url: `${URLS.products_list}/${id}`})
            }
        });
    }

    return (
        <>
            <Box bg={"white"} p={4} width="100%" borderRadius="md">
                <Flex alignItems={"center"}>
                    <Heading mr={4}>{t("Mahsulotlar")}</Heading>
                    <HasAccess access={[config.ROLES.ADMIN]}>
                        <Button
                            variant="outline"
                            colorScheme={"blue"}
                            leftIcon={<AiOutlinePlus />}
                            onClick={onOpen}
                        >
                            {t("Yaratish")}
                        </Button>
                        <CreateProduct isOpen={isOpen} onClose={onClose} refetch={refetch} category_id={id} />
                    </HasAccess>
                </Flex>

                {!isEmpty(get(data, "data.products", [])) ? (
                    isArray(get(data, "data.products", [])) && (
                        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} py={6}>
                            {get(data, "data.products", [])?.map((data, i) => (
                                <Card
                                    key={i + 1}
                                    cursor={"pointer"}
                                    _hover={{ backgroundColor: "#f8f8f8" }}
                                >
                                    <CardBody>
                                        <Image
                                            src={get(data, "img_url", "")}
                                            height={200}
                                            width={"100%"}
                                            objectFit={"cover"}
                                            mx={"auto"}
                                            alt="Image"
                                        />
                                        <Stack mt="6" spacing="3">
                                            <Heading size="md">{get(data, "name")}</Heading>
                                            <Text>{get(data, "description")}</Text>
                                            <Text>
                                                {t("Qoldi")}: {get(data, "count", 0)} {t("dona")}
                                            </Text>
                                            <Text>
                                                {t("Narxi")}: {Intl.NumberFormat('en-US').format(get(data,'price',0))} {t("so'm")}
                                            </Text>
                                        </Stack>
                                        <Flex alignItems={"center"} justifyContent={"space-between"} mt={4} mb={2}>
                                            <Input
                                                placeholder={t("Soni")}
                                                type={"number"}
                                                max={get(data, "count", 0)}
                                                name={get(data,'name','')}
                                                value={isEqual(get(data,'id'),get(order,'id')) && get(order,'count',0)}
                                                min={0}
                                                id={get(data, "id")}
                                                onChange={(e) => onChange(e,data)}
                                            />
                                            <Button
                                                ml={2}
                                                px={12}
                                                onClick={addToRequest}
                                            >
                                                {t("Arizaga qo'shish")}
                                            </Button>
                                        </Flex>
                                        <HasAccess access={[config.ROLES.ADMIN]}>
                                            <SimpleGrid columns={2} gap={2}>
                                                <Button colorScheme={"blue"} onClick={updateOnOpen}>
                                                    {t("O'zgartirish")}
                                                </Button>
                                                <Button colorScheme={"red"} onClick={() => deleteProduct(get(data, "id"))}>
                                                    {t("O'chirish")}
                                                </Button>
                                            </SimpleGrid>
                                            <UpdateProduct isOpen={updateIsOpen} onClose={updateOnClose} refetch={refetch} id={get(data, "id")} />
                                        </HasAccess>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    )
                ) : (
                    <Box mt={8}>
                        <Text>{t("Malumot yo'q")}</Text>
                    </Box>
                )}

                <Pagination setPage={setPage} pageCount={get(data, "data.totalPages", 1)} page={page} />
            </Box>
        </>
    );
};

export default ProductsViewContainer;
