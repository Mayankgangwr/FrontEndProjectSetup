import Styles from "./DesktopLayout.module.scss";
import { Persona } from "@fluentui/react-components";
import Flex, { AlignItems, FlexDirection, JustifyContent } from "../../Flex/Flex";
import { ArrowExitFilled, ClipboardTaskListLtrFilled, DocumentBulletListFilled, FoodFilled, GridFilled, HomeMoreFilled, LightbulbFilled, PeopleCommunityFilled, SettingsFilled } from "@fluentui/react-icons";
import MenuItem from "../MenuItem";
interface IMenuItem {
    icon: JSX.Element;
    title: string;
    path: string;
}
const MenuItems: IMenuItem[] =
    [
        {
            icon: <GridFilled />,
            title: "Dashboard",
            path: "/"
        },
        {
            icon: <FoodFilled />,
            title: "Orders",
            path: "/orders"
        },
        {
            icon: <FoodFilled />,
            title: "Category",
            path: "/category"
        },
        {
            icon: <FoodFilled />,
            title: "Food List",
            path: "/foodlist"
        },
        {
            icon: <DocumentBulletListFilled />,
            title: "Billing",
            path: "/billing"
        },
        {
            icon: <PeopleCommunityFilled />,
            title: "Workers",
            path: "/workers"

        },
        {
            icon: <HomeMoreFilled />,
            title: "Inventory",
            path: "/inventory"
        },
        {
            icon: <ClipboardTaskListLtrFilled />,
            title: "Reports",
            path: "/reports"
        },

    ];
const Sidebar = () => {
    return (
        <Flex className={Styles.Sidebar} direction={FlexDirection.COLUMN} justifyContent={JustifyContent.BETWEEN} alignItems={AlignItems.CENTER}>
            <Flex className="pb-3 w-full" direction={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER}>
                <Persona className="pb-4" size="huge" name="Prince Kurmi" textAlignment="center" secondaryText="Developer, India" />
                <hr className="w-full mb-4" />
                {MenuItems.map((item: IMenuItem) => (
                    <MenuItem
                        icon={item.icon}
                        title={item.title}
                        path={item.path}
                    />
                ))}
                <hr className="w-full mt-2 mb-1" />
                <MenuItem
                    icon={<SettingsFilled />}
                    title="Settings"
                    path="/settings"
                />
                <MenuItem
                    icon={<LightbulbFilled />}
                    title="Help"
                    path="/help"
                />
            </Flex>
            <MenuItem
                icon={<ArrowExitFilled />}
                title="Logout"
                path="/logout"
            />

        </Flex>
    );

};
export default Sidebar;