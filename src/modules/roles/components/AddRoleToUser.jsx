import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import usePostQuery from "../../../hooks/api/usePostQuery";
import {URLS} from "../../../constants/url";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery";
import {KEYS} from "../../../constants/key";
import {get, isArray, isEmpty} from "lodash";
import {useState} from "react";


const AddRoleToUser = ({ isOpen, onOpen, onClose, refetch, user}) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const {data,isLoading} = useGetAllQuery({
        key: KEYS.get_all_role,
        url: URLS.auth_role,
    });

    const { mutate } = usePostQuery({
        url: URLS.auth_role,
    });
    const onSubmit = () => {
        if (!isEmpty(name)){
            mutate(
                {url: `${URLS.auth_role}/${user}/${name}`},
                {
                    onSuccess: () => {
                        refetch();
                        onClose();
                    }
                });
        }

    };


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('Add role')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        (!isEmpty(get(data,'data.content',null)) &&
                            isArray(get(data,'data.content',null))) &&
                        (
                            <>
                                <Select placeholder='Select option' onChange={(e) => setName(e.target.value)}>
                                    {
                                        get(data, 'data.content', []).map((role, i) => (
                                            <option value={get(role,'roleName' ,'')} key={i+1} >{get(role,'roleName' ,'')}</option>
                                        ))
                                    }
                                </Select>
                                <Button w={'100%'} mt={4} onClick={onSubmit}>
                                    {t('Save')}
                                </Button>
                            </>
                        )
                    }

                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default AddRoleToUser;