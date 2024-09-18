import React from "react";
import Styles from "./DataFields.module.scss";
import { Dropdown as DropdownComponent, Field, Listbox, Option } from "@fluentui/react-components";

interface IOption {
    id: string;
    header: string;
}

interface IDropdownProps {
    options: IOption[];
    name: string;
    label?: string;
    value: string; // This should be the ID of the selected option
    className?: string;
    setValue: (value: string, name: string) => void;
    error?: string;
    labelOrientation?: "vertical" | "horizontal";
}

const Dropdown: React.FC<IDropdownProps> = ({
    name,
    label,
    value,
    options = [],
    className = '',
    setValue,
    error,
    labelOrientation = "vertical",
}) => {

    const getSelectedItem = (id: string): string => {
        const option = options.find(option => option.id === id);
        return option ? option.header : "Select option";
    };

    return (
        <Field
            className={`${Styles.DropdownContainer} ${className}`}
            label={label}
            hint={error}
            orientation={labelOrientation}
        >
            <DropdownComponent
                value={getSelectedItem(value)}
                name={name}
                className={Styles.Dropdown}
                onOptionSelect={(_ev, data) => setValue(data.optionValue || "", name)}
                clearable
            >
                <Listbox className={Styles.Listbox}>
                    {options.map(option => (
                        <Option key={option.id} value={option.id} text={option.header}>
                            {option.header}
                        </Option>
                    ))}
                </Listbox>
            </DropdownComponent>
        </Field>
    );
};

export default Dropdown;
