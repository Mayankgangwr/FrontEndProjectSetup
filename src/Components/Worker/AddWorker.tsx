import React, { useEffect, useState } from "react";
import Styles from "./Worker.module.scss";
import validation from "../../Utils/Validations/Validation";
import { InputField, DialogForm, Dropdown } from "..";
import { IWorkerRequest, IWorkerResponse } from "../../Types/IWorkers";
import workerController from "../../DataProvider/Controllers/WorkerController";
import { useDispatch } from "react-redux";
import { createWorker, updateWorker } from "../../Store/Slices/workerSlice";
import { handleValidations, initialWorkerErrorState, initialWorkerState, resetWorkerForm } from "../../Utils/worker";
import { roleOptions, shiftOptions } from "../../Constants/worker";
import { convertDateIntoTimeStamp } from "../../Utils/basic";

// Error state interface matches the IWorkerRequest structure
interface IWorkerState extends IWorkerRequest { }
interface IWorkerErrorState extends IWorkerRequest { }
interface IWorkerProps {
    isOpen: boolean;
    data?: IWorkerResponse;
    onClose: (isOpen: boolean) => void;
}

const AddWorker: React.FC<IWorkerProps> = ({ isOpen, data = undefined, onClose }) => {
    const [worker, setWorker] = useState<IWorkerState>(initialWorkerState);
    const [error, setError] = useState<IWorkerErrorState>(initialWorkerErrorState);
    const [hasError, setHasError] = useState<boolean>(true);
    const [activeStep, setActiveStep] = useState<number>(1);

    const dispatch = useDispatch();
    // Populate form with worker data when editing
    useEffect(() => {
        const validateAndCheck = async () => {
            const workerData = resetWorkerForm(data);
            await validateStepFields(workerData);
            setWorker(() => workerData);
        };
        if (data) {
            validateAndCheck();
        }
    }, [data]);

    // Step definitions
    const stepsItems = ["Basic Details", "Personal Details", "Address"];
    const stepFields = [
        ["displayName", "shiftId", "roleId", "username", "password"] as (keyof IWorkerState)[],
        ["position", "phoneNumber", "dob", "aadharCard", "panCard"] as (keyof IWorkerState)[],
        ["address", "city", "state", "country", "pincode"] as (keyof IWorkerState)[]
    ];

    // Reset the form to the initial state
    const handleResetForm = () => {
        setWorker(resetWorkerForm());
        setError(initialWorkerErrorState);
        setHasError(false);
        setActiveStep(1);
    };

    // Handle input changes
    const handleInputChange = async (value: string, name: keyof IWorkerState) => {
        const err = await validation.fieldValidation(value, name);
        setError((prevError) => ({ ...prevError, [name]: err }));
        setHasError(() => err ? true : false)
        setWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };

    // Validate the current step's fields
    const validateStepFields = async (worker: IWorkerRequest): Promise<boolean> => {
        let fields = stepFields[activeStep - 1];
        if (data) {
            fields = fields.filter((key: string) => key !== 'username' && key !== 'password');
        }
        const { hasError, errors } = await handleValidations(fields, worker, error);
        setHasError(() => hasError);
        errors && setError(() => errors);
        return !hasError;

    };

    // Handle step navigation
    const handleStepChange = (direction: "forward" | "backward") => {
        setActiveStep((prevStep) => (direction === "forward" ? prevStep + 1 : prevStep - 1));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const isValid = await validateStepFields(worker);
        if (!isValid) return;
        const workerData: any = {
            _id: worker._id,
            shiftId: worker.shiftId,
            roleId: worker.roleId,
            displayName: worker.displayName,
            phoneNumber: worker.phoneNumber,
            position: worker.position,
            dob: convertDateIntoTimeStamp(worker.dob),
            aadharCard: worker.aadharCard,
            panCard: worker.panCard,
            address: worker.address,
            city: worker.city,
            state: worker.state,
            country: worker.country,
            pincode: worker.aadharCard
        };
        // Check if updating or creating new worker
        if (data) {
            // Update existing worker
            const response: any = await workerController.updateWorker(workerData);
            if (response) {
                dispatch(updateWorker(response));
                handleResetForm();
            }
        } else {
            // Create new worker
            const response: any = await workerController.addWorker(workerData);
            if (response) {
                dispatch(createWorker(response));
                handleResetForm();
            }
        }
    };

    // Check for errors in the current step
    useEffect(() => {
        const validateAndCheck = async () => {
            await validateStepFields(worker);
        };
        if (data) {
            validateAndCheck();
        }
    }, [activeStep, worker]);


    // Render form fields based on the active step
    const renderStepFields = () => {
        switch (activeStep) {
            case 1:
                return (
                    <div className="mt-3">
                        <InputField
                            type="text"
                            name="displayName"
                            label="Worker name"
                            value={worker.displayName}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter worker name"
                            error={error.displayName}
                        />
                        <Dropdown
                            name="shiftId"
                            label="Shift"
                            options={shiftOptions}
                            value={worker.shiftId}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            error={error.shiftId}
                        />
                        <Dropdown
                            name="roleId"
                            label="Role"
                            options={roleOptions}
                            value={worker.roleId}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            error={error.roleId}
                        />
                        <InputField
                            type="email"
                            name="username"
                            label="Username"
                            value={worker.username}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter username"
                            error={error.username}
                            readOnly={data ? true : false}
                            autoComplete="off"
                        />
                        <InputField
                            type="password"
                            name="password"
                            label="Password"
                            value={data ? `********` : worker.password}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter password"
                            error={error.password}
                            readOnly={data ? true : false}
                            autoComplete="new-password"
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="mt-3">
                        <InputField
                            type="text"
                            name="position"
                            label="Position"
                            value={worker.position}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter position"
                            error={error.position}
                        />
                        <InputField
                            type="text"
                            name="phoneNumber"
                            label="Phone Number"
                            value={worker.phoneNumber}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter phone number"
                            error={error.phoneNumber}
                        />
                        <InputField
                            type="date"
                            name="dob"
                            label="Date of Birth"
                            value={worker.dob}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            error={error.dob}
                        />
                        <InputField
                            type="text"
                            name="aadharCard"
                            label="Aadhar Card"
                            value={worker.aadharCard}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter Aadhar Card number"
                            error={error.aadharCard}
                        />
                        <InputField
                            type="text"
                            name="panCard"
                            label="PAN Card"
                            value={worker.panCard}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter PAN Card number"
                            error={error.panCard}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="mt-3">
                        <InputField
                            type="text"
                            name="address"
                            label="Address"
                            value={worker.address}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter address"
                            error={error.address}
                        />
                        <InputField
                            type="text"
                            name="city"
                            label="City"
                            value={worker.city}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter city"
                            error={error.city}
                        />
                        <InputField
                            type="text"
                            name="state"
                            label="State"
                            value={worker.state}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter state"
                            error={error.state}
                        />
                        <InputField
                            type="text"
                            name="country"
                            label="Country"
                            value={worker.country}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter country"
                            error={error.country}
                        />
                        <InputField
                            type="text"
                            name="pincode"
                            label="Pincode"
                            value={worker.pincode}
                            setValue={(value, name) => handleInputChange(value, name as keyof IWorkerState)}
                            placeholder="Enter pincode"
                            error={error.pincode}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <DialogForm
            isOpen={isOpen}
            formHeader={{
                title: data ? "Edit Worker" : "Add Worker",
                onClose: onClose,
            }}
            stepper={{
                activeStep: activeStep,
                steps: stepsItems,
                handleStepClick: handleStepChange,
            }}
            onSubmit={handleSubmit}
            hasError={hasError}
        >
            <div className={Styles.FormBody}>
                {renderStepFields()}
                {/* {(worker.roleId && worker.shiftId) ? renderStepFields() : <Spinner />} */}
            </div>
        </DialogForm>
    );

};

export default AddWorker;
