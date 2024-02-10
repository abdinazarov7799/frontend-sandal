import {
    Button, FormControl, FormLabel, Input, InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, Stack, Text,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {URLS} from "../../../constants/url";
import usePostQuery from "../../../hooks/api/usePostQuery";
import {get} from "lodash";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";

const CreateUser = ({ isOpen, onOpen, onClose, refetch}) => {
    const { t } = useTranslation();
    const [branch_id,setBranchId] = useState();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const {data} = useGetAllQuery({
        key: KEYS.branch_list,
        url: URLS.branch_list,
    });

    const { mutate, isLoading } = usePostQuery({
        url: URLS.sign_up,
    });

    const onSubmit = ({firstname,lastname,login,password,phone}) => {
        mutate(
            {
                url: URLS.sign_up,
                attributes: {
                    firstname,
                    lastname,
                    login,
                    password,
                    phone,
                    branch_id,
                    role_id: 2,
                }
            },
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
                <ModalHeader>{t('Foydalanuvchi yaratish')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.login}>
                            <FormLabel htmlFor="login">{t('Login')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="login"
                                    {...register("login", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Login"
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl my={2} isInvalid={errors.password}>
                            <FormLabel htmlFor={"password"}>{t('Parol')}</FormLabel>
                            <Input
                                id={"password"}
                                type="password"
                                placeholder={t("Parol")}
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </FormControl>

                        <FormControl my={2} isInvalid={errors.firstname}>
                            <FormLabel htmlFor="firstname">{t('Foydalanuvchi ismi')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="firstname"
                                    {...register("firstname", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Ismi"
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl my={2} isInvalid={errors.lastname}>
                            <FormLabel htmlFor="lastname">{t('Foydalanuvchi familiyasi')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="lastname"
                                    {...register("lastname", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Familiya"
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl my={2} isInvalid={errors.phone}>
                            <FormLabel htmlFor="phone">{t('Foydalanuvchi raqami')}</FormLabel>
                            <InputGroup>
                                <Input
                                    id="phone"
                                    {...register("phone", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Telefon"
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl my={2} isInvalid={errors.branch_id}>
                            <FormLabel htmlFor="branch_id">{t('Filial')}</FormLabel>
                            <Select
                                onChange={(e) => setBranchId(e.target.value)}
                                id={"branch_id"}
                                placeholder={t("Filialni tanlang")}
                            >
                                {
                                    get(data, 'data', []).map((branch) => (
                                        <option
                                            value={get(branch,'id' ,'')}
                                            key={get(branch,'id' ,'')}
                                        >
                                            {get(branch,'name' ,'')}
                                        </option>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <Stack spacing={6} color={"white"}>
                            <Button
                                mt={8}
                                colorScheme="blue"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                <Text color="white">{t("Ro'yxatdan o'tqazish")}</Text>
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
export default CreateUser;
