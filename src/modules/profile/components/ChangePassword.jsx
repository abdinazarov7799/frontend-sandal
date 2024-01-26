import React from "react";
import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
export default function ChangePassword({ changePasswordRequest = () => {}, ...rest }) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const {t} = useTranslation();
    const onSubmit = (values) => {
        const data = {
            current: values.current,
            password: values.password,
        };
        changePasswordRequest(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={8} isInvalid={errors.current}>
                <FormLabel htmlFor="current">{t('Current Password')}</FormLabel>
                <InputGroup>
                    <Input
                        id="current"
                        {...register("current", {
                            required: t("Current password is required"),
                            minLength: { value: 8, message: t("Minimum length should be 8") },
                        })}
                        type="password"
                        placeholder={t("Current Password")}
                    />
                </InputGroup>

                <FormErrorMessage>
                    {errors.current && errors.current.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={errors.password}>
                <FormLabel htmlFor={"password"}>{t('New Password')}</FormLabel>
                <Input
                    id={"password"}
                    type="password"
                    placeholder={t("New Password")}
                    {...register("password", {
                        required: t("New password  is required"),
                        minLength: { value: 8, message: t("Minimum length should be 8") },
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Stack spacing={6} color={"white"}>
                <Button
                    mt={8}
                    colorScheme="cyan"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    <Text color="white">{t('Change')}</Text>
                </Button>
            </Stack>
        </form>
    );
}
