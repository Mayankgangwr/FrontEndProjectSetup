class Validation {

    async fieldValidation(value: string, fieldName: string): Promise<string> {
        let error: string = "";
        switch (fieldName) {
            case 'password':
                const specialCharacterRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
                if (value.length < 8 || value.length > 20 || !specialCharacterRegex.test(value)) {
                    error = "Password must be between 8 and 20 characters and contain at least one special character";
                }
                break;
            case 'displayName':
                if (value.trim() === "") {
                    error = "Name is required";
                } else if (value.length < 3 || value.length > 100) {
                    error = "Name must be between 3 and 100 characters";
                }
                break;
            case 'managerName':
                if (value.trim() === "") {
                    error = "Manager Name is required";
                } else if (value.length < 3 || value.length > 100) {
                    error = "Manager name must be between 3 and 100 characters";
                }
                break;
            case 'phoneNumber':
                if (value.trim() === "") {
                    error = "Contact No. is required";
                } else if (!/^\+\d+$/.test(value)) {
                    error = "Contact must start with + and country code";
                }
                break;
            case 'username':
                if (value.trim() === "") {
                    error = "Email is required";
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    error = "Enter a valid email";
                }
                break;
            case 'address':
                if (value.trim() === "") {
                    error = "Address is required";
                } else if (value.length < 15 || value.length > 200) {
                    error = "Address must be between 15 and 200 characters";
                }
                break;
            case 'country':
                if (value.trim() === "") {
                    error = "Country is required";
                } else if (value.length < 3 || value.length > 100) {
                    error = "Country name must be between 3 and 100 characters";
                }
                break;
            case 'state':
                if (value.trim() === "") {
                    error = "State name is required";
                }
                break;
            case 'city':
                if (value.trim() === "") {
                    error = "City is required";
                } else if (value.length < 3 || value.length > 100) {
                    error = "City name must be between 3 and 100 characters";
                }
                break;
            case 'pincode':
                if (value.trim() === "" || !/^\d+$/.test(value)) {
                    error = "Pin code is required";
                } else if (value.length !== 6) {
                    error = "Pin code must have 6 characters";
                }
                break;
            case 'shiftId':
                if (value.trim() === "") {
                    error = "Shift is required";
                }
                break;
            case 'roleId':
                if (value.trim() === "") {
                    error = "Role is required";
                }
                break;
            case 'avatar':
                if (value.trim() === "") {
                    error = "Avatar is required";
                }
                break;
            case 'position':
                if (value.trim() === "") {
                    error = "Position is required";
                }
                break;
            case 'dob':
                if (value.trim() === "") {
                    error = "Date of birth is required";
                }
                break;
            case 'aadharCard':
                if (value.trim() === "") {
                    error = "City is required";
                } else if (value.trim() === "" || !/^\d{12}$/.test(value)) {
                    error = "Aadhar card must have 12 digits";
                }
                break;
            case 'panCard':
                if (value.trim() === "") {
                    error = "City is required";
                } else if (value.trim() === "" || !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value)) {
                    error = "Enter a valid PAN card number";
                }
                break;
            default:
                break;
        }
        return error;
    }
}

const validation = new Validation();
export default validation;
