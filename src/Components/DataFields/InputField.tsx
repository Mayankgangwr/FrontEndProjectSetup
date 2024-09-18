import React from "react";
import Styles from "./DataFields.module.scss";
import { Field, Input } from "@fluentui/react-components";
import { DismissRegular, SearchRegular } from "@fluentui/react-icons";

interface InputFieldProps {
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'number' | 'time' | 'week';
    label?: string;
    name: string;
    value: string;
    labelClassName?: string;
    className?: string;
    setValue: (value: string, name: string) => void;
    clearable?: boolean;
    isDisabled?: boolean;
    error?: string;
    placeholder?: string;
    labelOrientation?: "horizontal" | "vertical";
    readOnly?: boolean;
    autoComplete?: string; // Correct type for autoComplete
}

const InputField: React.FC<InputFieldProps> = ({
    type = 'text',
    name,
    label,
    value = '',
    className = '',
    setValue,
    clearable = false,
    isDisabled = false,
    error,
    placeholder,
    labelOrientation = "vertical",
    readOnly = false,
    autoComplete = "off"
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value, event.target.name);
    };

    const handleClear = () => {
        setValue("", name);
    };

    const showClearButton = clearable && value.length > 0;
    const contentAfter = type === "search" 
        ? (showClearButton ? <DismissRegular onClick={handleClear} /> : <SearchRegular onClick={handleClear} />)
        : (showClearButton ? <DismissRegular onClick={handleClear} /> : null);

    return (
        <Field
            label={label}
            orientation={labelOrientation}
            hint={error}
            className={`${Styles.InputField} ${labelOrientation === "horizontal" ? Styles.horizontalLabelInputField : ''} ${className}`}
        >
            <Input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder={placeholder}
                contentAfter={contentAfter}
                autoComplete={autoComplete}
                readOnly={readOnly}
            />
        </Field>
    );
};

export default InputField;
