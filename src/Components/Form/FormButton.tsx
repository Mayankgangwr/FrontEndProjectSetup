import React from "react";
import { Button, mergeClasses } from "@fluentui/react-components";
import { ChevronLeftRegular } from "@fluentui/react-icons";
import Styles from "./Form.module.scss";
import Flex from "../Flex/Flex";
export interface IStepper {
  steps: string[];
  activeStep: number;
  handleStepClick: (direction: 'forward' | 'backward') => void;
}

interface FormButtonProps {
  stepper?: IStepper;
  handleSubmit: (event: React.FormEvent) => void;
  hasError: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ stepper, handleSubmit, hasError }) => {
  const activeStep = stepper?.activeStep ?? 0; // Default to 0 if stepper is undefined
  const steps = stepper?.steps ?? []; // Default to empty array if steps are undefined
  const handleStepClick = stepper?.handleStepClick;

  const handleSubmitButton = (event: React.FormEvent) => {
    if (stepper) {
      if (activeStep === steps.length) {
        handleSubmit(event);
      } else {
        handleStepClick?.("forward");
      }
    } else {
      handleSubmit(event);
    }
  };

  return (
    <Flex className={mergeClasses(Styles.FormButton, !activeStep && Styles.SingleBtn)}>
      {stepper && <div>
        {activeStep > 1 && (
          <Button
            className={Styles.LinkButton}
            appearance="primary"
            onClick={() => handleStepClick?.("backward")}
          >
            <ChevronLeftRegular className="linkbtn_svg" /> Back
          </Button>
        )}
      </div>
      }
      <Button
        className={activeStep ? "" : 'w-full'}
        appearance="primary"
        onClick={handleSubmitButton}
        disabled={hasError}
      >
        {activeStep === steps.length ? 'Submit' : 'Next'}
      </Button>
    </Flex>
  );
};

export default FormButton;
