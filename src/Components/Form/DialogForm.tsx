import React, { FC } from "react";
import { Dialog, DialogBody, DialogContent, DialogSurface } from "@fluentui/react-components";
import Styles from "./Form.module.scss";
import FormHeader, { IFormHeaderProps } from "./FormHeader";
import FormButton, { IStepper } from "./FormButton";
import StepNavigation from "./StepNavigation";

interface IDialogFormProps {
    isOpen: boolean;
    formHeader: IFormHeaderProps;
    stepper?: IStepper;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent) => void;
    hasError: boolean;
}

const DialogForm: FC<IDialogFormProps> = ({ isOpen, formHeader, stepper, children, onSubmit, hasError }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(_, open) => open || formHeader.onClose(!isOpen)}>
            <DialogSurface className={Styles.DialogSurface}>
                <DialogBody>
                    <FormHeader
                        title={formHeader?.title}
                        description={formHeader?.description || ''}
                        onClose={formHeader.onClose} />
                    <DialogContent>
                        <div
                            className={Styles.DialogContent}
                        >
                            {stepper && (
                                <StepNavigation
                                    steps={stepper.steps}
                                    activeStep={stepper.activeStep} />
                            )}
                            <div className={Styles.FormBody}>
                                {children}
                            </div>
                            <FormButton
                                stepper={stepper}
                                handleSubmit={onSubmit}
                                hasError={hasError}
                            />
                        </div>

                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}
export default DialogForm;