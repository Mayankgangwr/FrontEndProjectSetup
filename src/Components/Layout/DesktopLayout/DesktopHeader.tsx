import Styles from "./DesktopLayout.module.scss";
import Flex, { FlexDirection, AlignItems, JustifyContent, FlexWrap } from "../../Flex/Flex";
import { Text, Persona } from "@fluentui/react-components";
import moment from "moment";
import { useEffect, useState } from "react";
import UserLoggedStatus from "./UserLoggedStatus";

const DesktopHeader = () => {
    const [hasShadow, setHasShadow] = useState(false);
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 76) {
                setHasShadow(true);
            } else {
                setHasShadow(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Flex className={`${Styles.Container} ${hasShadow  && Styles.Scrolled}`} direction={FlexDirection.ROW} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.BETWEEN} flexWrap={FlexWrap.WRAP}>
            <Flex direction={FlexDirection.COLUMN} alignItems={AlignItems.START} justifyContent={JustifyContent.CENTER}>
                <Text className={Styles.Header}>Dashboard</Text>
                <Text className={Styles.Time}>{moment().format("Do MMM YYYY")}</Text>
            </Flex>
            <Text className={Styles.BrandName}>My App</Text>
            <UserLoggedStatus />
        </Flex>
    );
}
export default DesktopHeader;