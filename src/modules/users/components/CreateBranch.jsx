import {
    Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Text,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import React from "react";
import {useForm} from "react-hook-form";
import {URLS} from "../../../constants/url";
import usePostQuery from "../../../hooks/api/usePostQuery";

const CreateBranch = ({ isOpen, onOpen, onClose, refetch}) => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const { mutate, isLoading } = usePostQuery({
        url: URLS.branch_list,
    });
    const onSubmit = ({name, description}) => {
        mutate(
            { url: URLS.branch_list, attributes: {name,description,isActive: true}},
            {
                onSuccess: () => {
                    refetch();
                    onClose();
                }
            });
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('Filial yaratish')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel htmlFor="name">{t('Filial nomi')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="name"
                                    {...register("name", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder={t("Nomi")}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mt={5} isInvalid={errors.description}>
                            <FormLabel htmlFor={"description"}>{t('Filial tavsifi')}</FormLabel>
                            <Input
                                id={"description"}
                                type="text"
                                placeholder={t("Tavsifi")}
                                {...register("description", {
                                    required: true,
                                })}
                            />
                        </FormControl>

                        <Stack spacing={6} color={"white"}>
                            <Button
                                mt={8}
                                colorScheme="blue"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                <Text color="white">{t('Yaratish')}</Text>
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>
                        {t('Yopish')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default CreateBranch;
