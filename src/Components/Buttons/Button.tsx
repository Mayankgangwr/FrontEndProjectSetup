import { FC } from "react";
import Styles from "./Button.module.scss";
import { Button as UIButton } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";

const Button: FC<ButtonProps> = (props) => {

    return (<div className={`${Styles.Button} ${props.className}`}><UIButton {...props} /></div>);
}
export default Button;