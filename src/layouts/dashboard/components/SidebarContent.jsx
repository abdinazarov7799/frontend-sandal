import {useTranslation} from "react-i18next";
import {Box, CloseButton, Flex, Icon, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {get} from "lodash";
import React from "react";
import {FiDownload,FiUsers,FiShoppingCart,FiShare} from "react-icons/fi";
import config from "../../../config";
import HasAccess from "../../../services/auth/HasAccess";


const LinkItems = [
    {
        name: "Mahsulotlar",
        icon: FiShoppingCart,
        url: "/products",
        access: [config.ROLES.USER,config.ROLES.ADMIN],
    },
    {
        name: "Mening arizalarim",
        icon: FiShare,
        url: "/my-requests",
        access: [config.ROLES.USER,config.ROLES.ADMIN]
    },
    {
        name: "Kelgan arizalar",
        icon: FiDownload,
        url: "/requests",
        access: [config.ROLES.ADMIN]
    },
    {
        name: "Foydalanuvchilar",
        icon: FiUsers,
        url: "/users",
        access: [config.ROLES.ADMIN]
    },
];

const SidebarContent = ({onClose, ...rest}) => {
    const {t} = useTranslation();
    const NavItem = ({icon, children, ...rest}) => {
        return (
            <Link
                href="#"
                style={{textDecoration: "none"}}
                _focus={{boxShadow: "none"}}
            >
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    my={"2"}
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: "blue.200",
                        color: "white",
                    }}
                    {...rest}
                >
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: "white",
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        );
    };
    return (
        <>
            <Box
                transition="3s ease"
                bg={useColorModeValue("white", "gray.900")}
                borderRight="1px"
                borderRightColor={useColorModeValue("gray.200", "gray.700")}
                w={{base: "full", md: 60}}
                pos="fixed"
                h="full"
                {...rest}
            >
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        <NavLink to={"/"}>
                            <Image className={"dashboard-logo"} src={logo}/>
                        </NavLink>
                    </Text>
                    <CloseButton display={{base: "flex", md: "none"}} onClick={onClose}/>
                </Flex>
                {LinkItems.map((link,index) => {
                    return (
                        <HasAccess
                            access={get(link, "access")}
                            key={link.name}
                        >
                            <NavLink to={get(link, "url")} key={index} onClick={onClose}>
                                <NavItem icon={get(link,"icon")}>
                                    {t(get(link,"name",""))}
                                </NavItem>
                            </NavLink>
                        </HasAccess>
                    )
                })}
            </Box>
        </>
    );
};
export default SidebarContent;
