import {useTranslation} from "react-i18next";
import {useSettingsStore} from "../../../store";
import {get} from "lodash";
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton, MenuDivider, MenuItem, MenuList,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import React from "react";
import userImg from '../../../assets/images/user.png';
import storage from "../../../services/storage/index.js";

const MobileNav = ({
                       onOpen,
                       username = "Admin",
                       logout = () => {
                       },
                       ...rest
                   }) => {
    const {t, i18n} = useTranslation();
    const languages = [
        {id: 1, key: "Uz", label: "Uz lotincha"},
        {id: 2, key: "Kr", label: "Уз крилча"},
    ];
    const setLang = useSettingsStore((state) => get(state, "setLang", () => {}));
    const lang = useSettingsStore((state) => get(state, "lang"));
    const changeLang = (code) => {
        setLang(code);
        storage.set("lang",code)
        return i18n.changeLanguage(code);
    };
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{base: "space-between", md: "flex-end"}}
            {...rest}
        >
            <IconButton
                display={{base: "flex", md: "none"}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <NavLink to={"/"} >
                <Image
                    className={"dashboard-logo"}
                    width={150}
                    display={{base: "flex", md: "none"}}
                    src={logo}
                />
            </NavLink>

            <HStack spacing={{base: "2", md: "6"}}>
                <Menu>
                    <MenuButton
                        as={Button}
                        transition="all 0.3s"
                        _focus={{boxShadow: "none"}}
                    >
                        <HStack>
                            <VStack
                                display={{base: "flex"}}
                                alignItems="flex-start"
                            >
                                <Text fontSize="md" fontWeight={600}>{lang}</Text>
                            </VStack>
                            <Box>
                                <FiChevronDown/>
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList
                        bg={useColorModeValue("white", "gray.900")}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                        p={0}
                    >
                        {languages?.map((language, index) => (
                            get(language, "key") !== lang && (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        changeLang(get(language, "key"));
                                    }}
                                >
                                    <Flex alignItems={"center"}>
                                        <Text ml={2}>{t(get(language, "label"))}</Text>
                                    </Flex>
                                </MenuItem>
                            )
                        ))}
                    </MenuList>
                </Menu>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: "none"}}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={userImg}
                                />
                                <VStack
                                    display={{base: "none", md: "flex"}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{username}</Text>
                                </VStack>
                                <Box display={{base: "none", md: "flex"}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <NavLink to={'/profile'}>
                                <MenuItem>{t("Profil")}</MenuItem>
                            </NavLink>
                            <MenuDivider/>
                            <MenuItem onClick={logout}>{t("Chqish")}</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
export default MobileNav;
