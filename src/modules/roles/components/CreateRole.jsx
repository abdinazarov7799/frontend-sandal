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

const CreateRole = ({ isOpen, onOpen, onClose, refetch}) => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const { mutate, isLoading } = usePostQuery({
        url: URLS.auth_role,
    });
    const onSubmit = ({roleName, description}) => {
        mutate(
            { url: URLS.auth_role, attributes: {roleName,description}},
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
                <ModalHeader>{t('Create role')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.roleName}>
                            <FormLabel htmlFor="roleName">{t('Role')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="roleName"
                                    {...register("roleName", {
                                        required: t("Name is required"),
                                    })}
                                    type="text"
                                    placeholder="Role name"
                                />
                            </InputGroup>

                            <FormErrorMessage>
                                {errors.roleName && errors.login.roleName}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={5} isInvalid={errors.description}>
                            <FormLabel htmlFor={"description"}>{t('Description')}</FormLabel>
                            <Input
                                id={"description"}
                                type="text"
                                placeholder={t("Role description")}
                                {...register("description", {
                                    required: t("Description  is required"),
                                })}
                            />
                            <FormErrorMessage>
                                {errors.description && errors.password.description}
                            </FormErrorMessage>
                        </FormControl>
                        <Stack spacing={6} color={"white"}>
                            <Button
                                mt={8}
                                colorScheme="cyan"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                <Text color="white">{t('Create')}</Text>
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>
                        {t('Close')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default CreateRole;