import { FC, useState } from "react";
import Styles from "./DesktopLayout.module.scss";
import { useSelector } from "react-redux";
import { IUserResponse } from "../../../Types/IUser";
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Persona } from "@fluentui/react-components";
import { ChevronDownRegular, MoreHorizontalRegular } from "@fluentui/react-icons";
import { Flex } from "../..";
import Logout from "../../Logout/Logout";
import { IAuthState } from "../../../Types/auth";
import { useNavigate } from "react-router-dom";

interface IUserLoggedStatusProps {

}

const UserLoggedStatus: FC<IUserLoggedStatusProps> = () => {
    const auth: IAuthState = useSelector((state: any) => state.auth);
    const [isArrowDown, setIsArrowDown] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleToggleMenu = () => {
        setIsArrowDown((prevState) => !prevState)
    }

    const handleAuthModel = () => {
        if (auth.status) {
            setIsOpen((prevState) => !prevState);
        } else {
            navigate("/login");
        }
    }

    return (
        <div className={Styles.LoggedStatusContainer}>
            <Flex className="gap-1" onClick={handleToggleMenu}>
                <Persona
                    name={auth.userData?.displayName}
                    secondaryText="Online"
                    presence={{ status: "available" }}
                    textAlignment="center" />
                <Menu open={isArrowDown}>
                    <MenuTrigger>
                        {isArrowDown ? <ChevronDownRegular /> : <MoreHorizontalRegular />}
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            {auth.status ? (
                                <MenuItem onClick={handleAuthModel}>Logout</MenuItem>
                            ) : (
                                <MenuItem onClick={handleAuthModel}>Logout</MenuItem>
                            )}
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </Flex>
            <Logout isOpen={isOpen} handleLogoutModel={handleAuthModel } />
        </div>
    )

};

export default UserLoggedStatus;