import React from "react";
import {useForm} from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import {useTranslation} from "react-i18next";

export default function RegisterForm({registerRequest = () => {}, ...rest}) {
    const {t} = useTranslation();
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm();

    const onSubmit = (values) => {
        const data = {
            phone: values.phone.replace(/\D/g, ""),
            passport: values.passport.toUpperCase().replace(' ',''),
            personalIdentificationNumber: values.personalIdentificationNumber
        };
        registerRequest(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={8} isInvalid={errors.phone}>
                <FormLabel htmlFor="phone">{t('Phone number')}</FormLabel>
                <InputGroup>
                    <InputLeftAddon children="+998"/>
                    <Input
                        id="phone"
                        {...register("phone", {
                            required: t("Phone number is required"),
                            minLength: {value: 7, message: t("Minimum length should be 7")},
                        })}
                        type="tel"
                        placeholder="(__) ___ __ __"
                        mask="(99)-999-9999"
                        as={InputMask}
                    />
                </InputGroup>

                <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.passport}>
                <FormLabel htmlFor="passport">{t('Passport')}</FormLabel>
                <InputGroup>
                    <Input
                        id="passport"
                        {...register("passport", {
                            required: t("Passport is required"),
                            minLength: {value: 9, message: t("Minimum length should be 9")},
                        })}
                        type="tel"
                        placeholder="__ _______"
                        mask="** 9999999"
                        as={InputMask}
                        textTransform={"uppercase"}
                    />
                </InputGroup>

                <FormErrorMessage>
                    {errors.passport && errors.passport.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={errors.personalIdentificationNumber}>
                <FormLabel htmlFor="personalIdentificationNumber">{t("PNFL")}</FormLabel>
                <InputGroup>
                    <Input
                        id="personalIdentificationNumber"
                        {...register("personalIdentificationNumber", {
                            required: t("PINFL is required"),
                            minLength: {value: 14, message: t("Minimum length should be 14")},
                        })}
                        type="tel"
                        placeholder="______________"
                        mask="99999999999999"
                        as={InputMask}
                    />
                </InputGroup>

                <FormErrorMessage>
                    {errors.personalIdentificationNumber && errors.personalIdentificationNumber.message}
                </FormErrorMessage>
            </FormControl>
            <Stack spacing={6} color={"white"}>
                <Button
                    mt={8}
                    colorScheme="cyan"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    <Text color="white">{t('Get the code')}</Text>
                </Button>
            </Stack>
        </form>
    );
}
