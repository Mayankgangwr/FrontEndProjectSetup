import React from "react";
import { Button } from "@fluentui/react-components";
import { mergeClasses } from "@fluentui/react-components";
import Styles from "./Form.module.scss";

interface StepNavigationProps {
    steps: string[];
    activeStep: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, activeStep }) => (
    <div className="automationStepper">
        <div className={Styles.Steps}>
            {steps.map((label, index) => {
                const isComplate = activeStep > index + 1;
                const isActive = activeStep === index + 1;
                return (
                    <Button
                        key={index}
                        className={mergeClasses(
                            Styles.individualSteps,
                            (isComplate && Styles.completedChipsClass),
                            (isActive && Styles.activeChipsClass))}
                    >
                        {label}
                    </Button>
                )
            }
            )}
        </div>
    </div>
);

export default StepNavigation;
