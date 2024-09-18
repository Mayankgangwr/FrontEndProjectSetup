import React from "react";
import { Button, DialogTitle, DialogTrigger, Text } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import cssStyles from "./Form.module.scss";

export interface IFormHeaderProps {
    title: string;
    description?: string;
    onClose: (isOpen: boolean) => void;
}

const FormHeader: React.FC<IFormHeaderProps> = ({ title, description, onClose }) => {
    const renderDescriptionText = (description: string) => {
        let text = description;
        if (description.split(' ').length > 10) {
            text = `${description.split(' ').slice(0, 15).join(' ')}...`;
        }
        return text;
    }
    return (
        <DialogTitle
            action={
                <DialogTrigger action="close">
                    <Button
                        appearance="transparent"
                        aria-label="close"
                        icon={<DismissRegular />}
                        onClick={()=>onClose(false)}
                    />
                </DialogTrigger>
            }
        >
            <div className={cssStyles.FormHeader}>
                <Text className={cssStyles.HeaderText}>
                    {title || `Custom Automation Template`}
                </Text>
                <Text className={cssStyles.DailogDescription}>
                    {description && renderDescriptionText(description)}
                </Text>
            </div>
        </DialogTitle>
    )
};

export default FormHeader;
