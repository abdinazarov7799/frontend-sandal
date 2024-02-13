import {
    Button,
    FormControl, FormErrorMessage,
    FormLabel, Input, InputGroup, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid, Text
} from "@chakra-ui/react";
import React from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {URLS} from "../../../constants/url.js";
import usePostQuery from "../../../hooks/api/usePostQuery.js";

export const CreateProject = ({isOpen,onClose,refetch,...rest}) => {
    const { t } = useTranslation();
    const { mutate, isLoading } = usePostQuery({});
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();


    const onSubmit = (values) => {
        mutate(
            { url: URLS.category_list, attributes: values },
            {
                onSuccess: ({ data }) => {
                    onClose();
                    refetch();
                },
            }
        );
    };
    return(
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{base: 'sm', md: 'xl'}}
          {...rest}
      >
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>{t("Yangi kategoriya yaratish")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <SimpleGrid columns={{base: 1}} gap={5}>
                          <FormControl isInvalid={errors.name}>
                              <FormLabel htmlFor="name">{t('Kategoriya nomi')}</FormLabel>
                              <InputGroup>
                                  <Input
                                      id="name"
                                      {...register("name", {
                                          required: "Kategoriya nomini kiritish majburiy",
                                      })}
                                      placeholder={t("Nomi")}
                                  />
                              </InputGroup>
                              <FormErrorMessage>
                                  {errors.name && errors.name.message}
                              </FormErrorMessage>
                          </FormControl>

                          <FormControl isInvalid={errors.description}>
                              <FormLabel htmlFor="description">{t('Tavsifi')}</FormLabel>
                              <InputGroup>
                                  <Input
                                      id="description"
                                      {...register("description", {
                                          required: "Kategoriya tavsifini kiritish majburiy",
                                      })}
                                      placeholder={t("Tavsif")}
                                  />
                              </InputGroup>
                              <FormErrorMessage>
                                  {errors.description && errors.description.message}
                              </FormErrorMessage>
                          </FormControl>

                          <FormControl isInvalid={errors.img_url}>
                              <FormLabel htmlFor="img_url">{t('Rasm havolasi')}</FormLabel>
                              <InputGroup>
                                  <Input
                                      id="img_url"
                                      {...register("img_url", {
                                          required: "Rasm havolasini kiritish majburiy",
                                      })}
                                      placeholder={t("URL")}
                                  />
                              </InputGroup>
                              <FormErrorMessage>
                                  {errors.img_url && errors.img_url.message}
                              </FormErrorMessage>
                          </FormControl>

                      </SimpleGrid>
                      <Button
                          mt={4}
                          isLoading={isSubmitting}
                          type="submit"
                          width={"100%"}
                          colorScheme={'blue'}
                      >
                          <Text color="white">{t("Yaratish")}</Text>
                      </Button>
                  </form>
              </ModalBody>
              <ModalFooter>
                  <Button onClick={onClose}>
                      {t('Qaytish')}
                  </Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    )
}
