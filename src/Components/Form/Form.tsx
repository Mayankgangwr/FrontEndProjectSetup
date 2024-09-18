import React, { FC } from "react";
import Styles from "./Form.module.scss";
import StepNavigation from "./StepNavigation";
import FormButton, { IStepper } from "./FormButton";
import AuthLink from "./AuthLink";

interface IFormProps {
    stepper?: IStepper;
    formHeader: string;
    authLink?: string;
    onSubmit: (event: React.FormEvent) => void;
    hasError: boolean;
    children: React.ReactNode;
}

const Form: FC<IFormProps> = ({ stepper, formHeader, authLink, onSubmit, hasError, children }) => {
    return (
        <div className={Styles.Container}>
            <div className={Styles.StepperForm}>
                {formHeader && <h1 className={Styles.formHeader}>{formHeader}</h1>}
                {stepper &&
                    <StepNavigation
                        steps={stepper.steps}
                        activeStep={stepper.activeStep} />}

                <div className={Styles.FormBody}>
                    {children}
                </div>
                <FormButton
                    stepper={stepper}
                    handleSubmit={onSubmit}
                    hasError={hasError}
                />
                {authLink && <AuthLink authLink={authLink} />}
            </div>
        </div>
    );
}
export default Form;


