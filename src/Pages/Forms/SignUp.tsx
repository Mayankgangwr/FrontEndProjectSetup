import React, { useEffect, useState } from "react";
import Styles from "./Forms.module.scss";
import { Form, InputField } from "../../Components";
import validation from "../../Utils/Validations/Validation";
import { IUserRequest } from "../../Types/IUser";
import authController from "../../DataProvider/Controllers/AuthController";
import { initialUserState } from "../../Utils/user";

// Error state interface that matches the IUser structure
interface ISignUpErrorState extends IUserRequest { }

const SignUp: React.FC = () => {
  // Initial form state
  const [formData, setFormData] = useState<IUserRequest>(initialUserState);
  const [formErrors, setFormErrors] = useState<ISignUpErrorState>(initialUserState);
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Fields for each step
  const stepFields: (keyof IUserRequest)[][] = [
    ["displayName", "username", "password", "managerName", "phoneNumber"],
    ["address", "city", "state", "country", "pincode"],
  ];

  // Reset the form to initial state
  const resetForm = () => {
    setFormData(initialUserState);
    setFormErrors(initialUserState);
    setHasError(false);
    setActiveStep(1);
  };

  // Handle input changes
  const handleInputChange = async (value: string, name: keyof IUserRequest) => {
    const error = await validation.fieldValidation(value, name);
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate fields for the current step
  const validateStepFields = async (): Promise<boolean> => {
    const currentFields = stepFields[activeStep - 1];
    const validationResults = await Promise.all(
      currentFields.map(async (key) => {
        const error = await validation.fieldValidation(formData[key], key);
        setFormErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
        return error;
      })
    );
    return validationResults.every((err) => err === "");
  };

  // Handle navigation between steps
  const handleStepChange = (direction: "forward" | "backward") => {
    setActiveStep((prevStep) => prevStep + (direction === 'forward' ? 1 : -1));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = await validateStepFields();
    if (!isValid) return;

    if (activeStep === stepFields.length) {
      const response = await authController.register(formData);
      if (response) resetForm();
    } else {
      handleStepChange('forward');
    }
  };

  useEffect(() => {
    setHasError(stepFields[activeStep - 1].some((key) => !formData[key] || formErrors[key]));
  }, [formData, activeStep]);

  const stepLabels = ["Personal Details", "Address"];

  return (
    <Form
      stepper={{ activeStep, steps: stepLabels, handleStepClick: handleStepChange }}
      formHeader="User Registration"
      onSubmit={handleSubmit}
      hasError={hasError}
      authLink="signup"
    >
      <div className={Styles.FormBody}>
        {activeStep === 1 && (
          <>
            <InputField
              type="text"
              name="displayName"
              label="User Name:"
              className={Styles.InputField}
              value={formData.displayName}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter user name"
              error={formErrors.displayName}
            />
            <InputField
              type="text"
              name="username"
              label="Username:"
              className={Styles.InputField}
              value={formData.username}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter username"
              error={formErrors.username}
            />
            <InputField
              type="password"
              name="password"
              label="Password:"
              className={Styles.InputField}
              value={formData.password}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter password"
              error={formErrors.password}
            />
            <InputField
              type="text"
              name="managerName"
              label="Manager Name:"
              className={Styles.InputField}
              value={formData.managerName}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter manager's name"
              error={formErrors.managerName}
            />
            <InputField
              type="text"
              name="phoneNumber"
              label="Phone Number:"
              className={Styles.InputField}
              value={formData.phoneNumber}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter phone number"
              error={formErrors.phoneNumber}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            <InputField
              type="text"
              name="address"
              label="Address:"
              className={Styles.InputField}
              value={formData.address}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter address"
              error={formErrors.address}
            />
            <InputField
              type="text"
              name="city"
              label="City:"
              className={Styles.InputField}
              value={formData.city}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter city"
              error={formErrors.city}
            />
            <InputField
              type="text"
              name="state"
              label="State:"
              className={Styles.InputField}
              value={formData.state}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter state"
              error={formErrors.state}
            />
            <InputField
              type="text"
              name="country"
              label="Country:"
              className={Styles.InputField}
              value={formData.country}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter country"
              error={formErrors.country}
            />
            <InputField
              type="text"
              name="pincode"
              label="Pincode:"
              className={Styles.InputField}
              value={formData.pincode}
              setValue={(value, name) => handleInputChange(value, name as keyof IUserRequest)}
              placeholder="Enter pincode"
              error={formErrors.pincode}
            />
          </>
        )}
      </div>
    </Form>
  );
};

export default SignUp;
