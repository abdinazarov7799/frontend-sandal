import React from "react";
import { useQuery } from "react-query";
import { request } from "../../services/api";
import { toast } from "react-toastify";

const usePaginateQuery = ({
  key = "get-all",
  url = "/",
  page = 1,
  params = {},
  showSuccessMsg = false,
  showErrorMsg = false,
}) => {
  const { isLoading, isError, data, error, isFetching, refetch} = useQuery(
    [key, page, params],
    () => request.get(`${url}?pageNumber=${page}`, params),
    {
      keepPreviousData: true,
      onSuccess: () => {
        if (showSuccessMsg) {
          toast.success(t("SUCCESS"));
        }
      },
      onError: (data) => {
        if (showErrorMsg) {
          toast.error(t(data?.response?.data?.message || `ERROR`));
        }
      },
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch
  };
};

export default usePaginateQuery;
