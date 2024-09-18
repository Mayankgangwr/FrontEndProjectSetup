import { IIconsProps } from "./IconsProps";
import Styles from "./Icons.module.scss";

const MobileMenu: React.FC<IIconsProps> = ({ className = '', size = "sm", onClick }) => {
    return (
        <svg onClick={() => onClick && onClick()} className={`${className} ${size === "lg" ? Styles.Large : size === "md" ? Styles.Medium : Styles.Small}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" /></svg>
    );

}
export default MobileMenu;