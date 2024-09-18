import Flex, { AlignItems, JustifyContent } from "../Flex/Flex";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "./Layout.module.scss";
interface IMenuItem {
    icon?: any;
    title?: string;
    path?: string;
}
const MenuItem: React.FC<IMenuItem> = ({ icon, title, path = "/" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Flex className={`${Styles.MenuItem} ${location.pathname === path && Styles.Active}`} justifyContent={JustifyContent.START} alignItems={AlignItems.CENTER}
            onClick={() => {navigate(path)}}
        >
            {icon}<span>{title}</span>
        </Flex>
    );
}

export default MenuItem;