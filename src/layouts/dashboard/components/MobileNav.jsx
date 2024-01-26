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

const MobileNav = ({
                       onOpen,
                       username = "Admin",
                       logout = () => {
                       },
                       ...rest
                   }) => {
    const {t, i18n} = useTranslation();
    const languages = [
        {id: 1, title: "Uz"},
        {id: 2, title: "En"},
        {id: 3, title: "Ru"},
    ];
    const setLang = useSettingsStore((state) => get(state, "setLang", () => {
    }));
    const lang = useSettingsStore((state) => get(state, "lang"));
    const changeLang = (code) => {
        setLang(code);
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

            <Text
                display={{base: "flex", md: "none"}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                <NavLink to={"/"}>
                    <Image className={"dashboard-logo"} src={logo}/>
                </NavLink>
            </Text>
            <HStack spacing={{base: "2", md: "6"}}>
                <Menu>
                    <MenuButton
                        as={Button}
                        transition="all 0.3s"
                        _focus={{boxShadow: "none"}}
                    >
                        <HStack>
                            <VStack
                                display={{base: "flex", md: "flex"}}
                                alignItems="flex-start"
                                ml="2"
                            >
                                <Text fontSize="md" fontWeight={600}>{lang}</Text>
                            </VStack>
                            <Box display={{base: "flex", md: "flex"}}>
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
                            get(language, "title") !== lang && (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        changeLang(get(language, "title"));
                                    }}
                                >
                                    <Flex alignItems={"center"}>
                                        <Text ml={2}>{t(get(language, "title"))}</Text>
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
                                    src={
                                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
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
                                <MenuItem>{t("Profile")}</MenuItem>
                            </NavLink>
                            <MenuDivider/>
                            <MenuItem onClick={logout}>{t("Logout")}</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
export default MobileNav;
