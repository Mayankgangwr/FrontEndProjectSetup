import { roleOptions, shiftOptions } from "../Constants/worker";
import { IBankDetails, IWorkerRequest, IWorkerResponse } from "../Types/IWorkers";
import validation from "./Validations/Validation";

export const initialBankState: IBankDetails = {
    name: "",
    accountNo: "",
    ifsc: "",
    branch: ""

}
export const initialWorkerState: IWorkerRequest = {
    _id: "",
    shiftId: "",
    roleId: "",
    displayName: "",
    username: "",
    password: "",
    phoneNumber: "",
    position: "",
    dob: "",
    aadharCard: "",
    panCard: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
};

export const initialWorkerErrorState: IWorkerRequest = initialWorkerState;


export const resetWorkerForm = (worker?: IWorkerResponse): IWorkerRequest => {
    return {
        _id: worker?._id || initialWorkerState._id,
        shiftId: worker?.shiftId || initialWorkerState.shiftId,
        roleId: worker?.roleId || initialWorkerState.roleId,
        displayName: worker?.displayName || initialWorkerState.displayName,
        username: worker?.username || initialWorkerState.username,
        password: initialWorkerState.password,  // Password should not be populated from response
        phoneNumber: worker?.phoneNumber || initialWorkerState.phoneNumber,
        position: worker?.position || initialWorkerState.position,
        dob: worker?.dob ? new Date(worker.dob * 1000).toLocaleDateString() : initialWorkerState.dob,  // Convert timestamp to string
        aadharCard: worker?.aadharCard || initialWorkerState.aadharCard,
        panCard: worker?.panCard || initialWorkerState.panCard,
        address: worker?.address || initialWorkerState.address,
        city: worker?.city || initialWorkerState.city,
        state: worker?.state || initialWorkerState.state,
        country: worker?.country || initialWorkerState.country,
        pincode: worker?.pincode || initialWorkerState.pincode
    };
};


export const resetWorkerFormError = (error?: IWorkerRequest): IWorkerRequest => {
    return {
        _id: error?._id || initialWorkerErrorState._id,
        shiftId: error?.shiftId || initialWorkerErrorState.shiftId,
        roleId: error?.roleId || initialWorkerErrorState.roleId,
        displayName: error?.displayName || initialWorkerErrorState.displayName,
        username: initialWorkerErrorState.username,
        password: initialWorkerErrorState.password,
        phoneNumber: error?.phoneNumber || initialWorkerErrorState.phoneNumber,
        position: error?.position || initialWorkerErrorState.position,
        dob: error?.dob || initialWorkerErrorState.dob,
        aadharCard: error?.aadharCard || initialWorkerErrorState.aadharCard,
        panCard: error?.panCard || initialWorkerErrorState.panCard,
        address: error?.address || initialWorkerErrorState.address,
        city: error?.city || initialWorkerErrorState.city,
        state: error?.state || initialWorkerErrorState.state,
        country: error?.country || initialWorkerErrorState.country,
        pincode: error?.pincode || initialWorkerErrorState.pincode
    };
};

export const getRole = (roleId: string) => {
    const role = roleOptions.find((role) => role.id === roleId);
    return role?.header;
}

export const getShift = (shiftId: string) => {
    const shift = shiftOptions.find((shift) => shift.id === shiftId);
    return shift?.header;
}

export const handleValidations = async (fields: (keyof IWorkerRequest)[], worker: IWorkerRequest, error: IWorkerRequest) => {
    try {
        const errors = error;
        // Perform validation for each field in parallel
        const validationResults = await Promise.all(
            fields.map(async (key) => {
                try {
                    const err = await validation.fieldValidation(worker[key], key);
                    errors[key] = err;
                    return err;
                } catch (validationError) {
                    // Handle specific field validation errors
                    return 'Validation error'; // Or use a specific error message
                }
            })
        );

        // Check if all validations passed
        const hasError = validationResults.some((err) => err !== "");
        return { hasError, errors };
    } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error during validation:', error);
        return { hasError: true, errors: null }; // Or handle as needed
    }
};
