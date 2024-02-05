import Pagination from "../../../components/pagination/index.jsx";
import {useEffect, useState} from "react";
import {get, isArray, isEmpty} from "lodash";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardBody,
    Text,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";
import {CreateProject} from "../components/CreateCategory.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";


const ProductsContainer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data,isLoading,isFetching,refetch} = useGetAllQuery({
        key: KEYS.category_list,
        url: URLS.category_list,
        params: {
            params: {
                page,
                size,
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [page]);

  return(
      <>
          <Box bg={'white'} p={4} width="100%" borderRadius="md">
              <Flex alignItems={"center"}>
                  <Heading mr={4}>{t('Kategoriyalar')}</Heading>
                  <HasAccess access={[config.ROLES.ADMIN]}>
                      <Button
                          variant='outline'
                          colorScheme={'blue'}
                          leftIcon={<AiOutlinePlus />}
                          onClick={onOpen}
                      >
                          {t("Yangi kategoriya qo'shish")}
                      </Button>
                      <CreateProject isOpen={isOpen} onClose={onClose} refetch={refetch}/>
                  </HasAccess>
              </Flex>

              {
                  !isEmpty(get(data,'data.categories',[])) ? (
                      isArray(get(data,'data.categories',[])) && (
                          <SimpleGrid columns={{sm: 1,md: 2,lg: 3}} spacing={8} py={6}>
                              {
                                  get(data,'data.categories',[])?.map((data,i) => (
                                      <Card
                                          key={i+1}
                                          cursor={"pointer"}
                                          _hover={{backgroundColor: '#f8f8f8'}}
                                          onClick={() => navigate(`/products/view/${data.id}`)}
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
                                              <Stack mt='6' spacing='3'>
                                                  <Heading size='md'>{get(data,'name')}</Heading>
                                                  <Text>{get(data,'description')}</Text>
                                              </Stack>
                                          </CardBody>
                                      </Card>
                                  ))
                              }
                          </SimpleGrid>
                      )
                  )  : (
                      <Box mt={8}>
                          <Text>{t("Malumot yo'q")}</Text>
                      </Box>
                  )
              }


              <Pagination
                  setPage={setPage}
                  pageCount={get(data, "data.totalPages", 1)}
                  page={page}
              />
          </Box>
      </>
  )
}
export default ProductsContainer
