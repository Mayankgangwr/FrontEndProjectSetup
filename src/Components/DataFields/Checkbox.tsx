import React from "react";
import Styles from "./DataFields.module.scss";
import { Checkbox as CheckBox } from "@fluentui/react-components";

interface ICheckboxProps {
    label?: string;
    name?: string;
    value?: boolean;
    labelClassName?: any
    className?: any;
    setValue: (value: string, name: string) => void;
    isDisable?: boolean;
    labelPosition?: "before" | "after";
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const { name, label, value, className, setValue, isDisable, labelPosition = "before"
    } = props;

    return (
        <CheckBox
            name={name}
            checked={value}
            labelPosition={labelPosition}
            className={`${Styles.checkBox} ${className}`}
            label={label}
            disabled={isDisable}
            onChange={(event: any, data: any) => {
                setValue(data.checked, event.target.name)
            }}
        />
    );
};
export default Checkbox;