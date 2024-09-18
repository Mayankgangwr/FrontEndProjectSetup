import Styles from "./MobileLayout.module.scss";
import Flex, { FlexDirection, AlignItems, JustifyContent, FlexWrap } from "../../Flex/Flex";
import { Text, Persona } from "@fluentui/react-components";
import { AlertFilled } from "@fluentui/react-icons";
import { MobileMenu } from "../../../Assets/Icons";

const MobileHeader = () => {
    return (
        <>
        <Flex className={Styles.Container} direction={FlexDirection.ROW} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.BETWEEN} flexWrap={FlexWrap.WRAP}>
            <Flex className="gap-1" direction={FlexDirection.ROW} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.START}>
                <MobileMenu size="lg" onClick={()=>{
                    alert("Open Menu")
                }} />
                <Text className={Styles.Logo}>App<Text> Name</Text></Text>
            </Flex>
            <Flex className="gap-3" direction={FlexDirection.ROW} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.CENTER}>
                <div className={Styles.AlertMessage}><AlertFilled fontSize={25} /></div>
                <Persona avatar={`https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg`} />
            </Flex>
        </Flex>
        </>
    );
}
export default MobileHeader;