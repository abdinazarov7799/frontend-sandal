import React from "react";
import {useForm} from "react-hook-form";
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
import InputMask from "react-input-mask";
import {useTranslation} from "react-i18next";

export default function ConfirmForm({confirmRequest = () => {},confirmToken}) {
    const {t} = useTranslation();
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm();

    const onSubmit = (values) => {
        const data = {
            data: values.password,
            secret: values.secret,
            token: confirmToken,
        };
        confirmRequest(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt={8} isInvalid={errors.secret}>
                <FormLabel htmlFor="secret">{t('SMS code')}</FormLabel>
                <InputGroup>
                    <Input
                        id="secret"
                        {...register("secret", {
                            required: t("Sms code is required"),
                            minLength: {value: 5, message: t("Minimum length should be 5")},
                        })}
                        type="tel"
                        placeholder="_____"
                        mask="99999"
                        as={InputMask}
                    />
                </InputGroup>

                <FormErrorMessage>
                    {errors.secret && errors.secret.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={errors.password}>
              <FormLabel htmlFor={"password"}>{t('Password')}</FormLabel>
              <Input
                id={"password"}
                type="password"
                placeholder={t("Password")}
                {...register("password", {
                  required: t("Password  is required"),
                  minLength: { value: 8, message: t("Minimum length should be 8")},
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
                    <Text color="white">{t('Register')}</Text>
                </Button>
            </Stack>
        </form>
    );
}
