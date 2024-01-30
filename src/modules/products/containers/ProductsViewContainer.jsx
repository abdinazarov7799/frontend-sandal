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
    HStack,
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
import { get, isArray, isEmpty } from "lodash";
import Pagination from "../../../components/pagination/index.jsx";
import { CreateProduct } from "../components/CreateProduct.jsx";
import { useStore } from "../../../store/index.js";
import {toast} from "react-toastify";

const ProductsViewContainer = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [countes, setCountes] = useState([]);
    const addRequests = useStore((state) => get(state, "addRequests", () => {}));

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

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const onChange = (e,data) => {
        const {value} = e.target;
        const { id, name, img_url } = data;

        const productObj = {
            id,
            name,
            img_url,
            count: value,
        };
        setCountes((prevCountes) => [...prevCountes, productObj]);
    };
    const addToRequest = () => {
        toast.success(t("Arizalar ro'yxatiga qo'shildi"))
        addRequests(countes);
    };

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
                            {t("Yangi mahsulot qo'shish")}
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
                                        <Image src={get(data, "img_url", "")} alt="Image" borderRadius="lg" />
                                        <Stack mt="6" spacing="3">
                                            <Heading size="md">{get(data, "name")}</Heading>
                                            <Text>{get(data, "description")}</Text>
                                            <Text>
                                                {t("Bor:")} {get(data, "count", 0)} {t("dona")}
                                            </Text>
                                        </Stack>
                                        <Flex alignItems={"center"} justifyContent={"space-between"} mt={4}>
                                            <Input
                                                placeholder={t("Soni")}
                                                type={"number"}
                                                max={get(data, "count", 0)}
                                                name={get(data,'name','')}
                                                min={0}
                                                id={get(data, "id")}
                                                onChange={(e) => onChange(e,data)}
                                            />
                                            <Button ml={2} px={12} onClick={addToRequest}>
                                                {t("Arizaga qo'shish")}
                                            </Button>
                                        </Flex>
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