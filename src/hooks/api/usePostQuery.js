import React from 'react';
import {useMutation, useQueryClient} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const postRequest = (url, attributes, config = {}) => request.post(url, attributes, config);

const  usePostQuery = ({hideSuccessToast = false, listKeyId = null}) => {
    const {t} = useTranslation();

        const queryClient = useQueryClient();

        const {mutate, isLoading, isError, error, isFetching} = useMutation(
            ({
                 url,
                 attributes,
                 config = {}
             }) => postRequest(url, attributes, config),
            {
                onSuccess: (data) => {
                    if (!hideSuccessToast) {
                        toast.success(t(data?.data?.message || 'SUCCESS'))
                    }

                    if (listKeyId) {
                        queryClient.invalidateQueries(listKeyId)
                    }
                },
                onError: (data) => {
                    toast.error(t(data?.response?.data?.message || 'ERROR'))
                }
            }
        );

        return {
            mutate,
            isLoading,
            isError,
            error,
            isFetching,
        }
    }
;

export default usePostQuery;
