import React from "react";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";
import {useSettingsStore, useStore} from "../../store";
import {get} from "lodash";
import Swal from "sweetalert2";
import storage from "../../services/storage";
import {useTranslation} from "react-i18next";
import SidebarContent from "./components/SidebarContent";
import MobileNav from "./components/MobileNav";


export default function DashboardLayout({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const user = useStore((state) => get(state, "user", {}));
    const setUser = useStore((state) => get(state, "setUser", () => {}));
    const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));
    const {t} = useTranslation();
    const clearToken = useSettingsStore((state) =>
        get(state, "setToken", () => {})
    );

    const navigate = useNavigate();

    const logout = () => {
        Swal.fire({
            title: t("Chiqishga ishonchingiz komilmi?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            showCancelButton: true,
            confirmButtonColor: "#13D6D1",
            confirmButtonText: t("ha albatta"),
            cancelButtonText: t("ortga qaytish"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthenticated(false);
                setUser(null);
                clearToken(null);
                storage.remove("settings");
                navigate("/auth");
            }
        });
    };
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: "none", md: "block"}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav
                onOpen={onOpen}
                username={get(user, "username")}
                logout={logout}
            />
            <Box ml={{base: 0, md: 60}} p="4">
                <Outlet/>
            </Box>
        </Box>
    );
}
