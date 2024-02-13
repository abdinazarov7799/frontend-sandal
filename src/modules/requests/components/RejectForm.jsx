import {
    Button,
    FocusLock,
    FormControl,
    FormLabel,
    Input, Popover,
    PopoverArrow, PopoverCloseButton,
    PopoverContent,
    PopoverTrigger, useDisclosure
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {URLS} from "../../../constants/url.js";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import React, {useState} from "react";
import {get, isEmpty} from "lodash";
import {toast} from "react-toastify";


const RejectForm = ({id}) => {
    const { t } = useTranslation()
    const {isOpen,onClose,onOpen} = useDisclosure()
    const { mutate:rejectMutate } = usePostQuery({
        url: URLS.order_reject,
        listKeyId: KEYS.order_list,
    });
    const [comment,setComment] = useState('')
    const rejectOrder = () => {
        if (!isEmpty(comment)){
            rejectMutate(
                {
                    url: URLS.order_reject,
                    attributes: {
                        id,
                        reject_comment: comment
                    }},
            );
        }else {
            toast.error(t("Kiritish majburiy"))
        }
    }

  return(
      <>
          <Popover
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              placement='right'
              closeOnBlur={false}
          >
              <PopoverTrigger>
                  <Button
                      colorScheme={"red"}
                      size={"sm"}
                      mx={3}
                      variant='outline'
                  >
                      {t("Rad etish")}
                  </Button>
              </PopoverTrigger>
              <PopoverContent p={5}>
                  <FocusLock returnFocus persistentFocus={false}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <FormControl>
                          <FormLabel name="reject_comment">{t("Sababini yozing")}</FormLabel>
                          <Input
                              name="reject_comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                          />
                      </FormControl>
                      <Button mt={3} colorScheme={'red'} width={'100%'} onClick={rejectOrder}>
                          {t("Qabul qilish")}
                      </Button>
                  </FocusLock>
              </PopoverContent>
          </Popover>
      </>
  )
}
export default RejectForm
