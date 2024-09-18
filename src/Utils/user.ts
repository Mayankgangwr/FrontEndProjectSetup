import { IUserRequest } from "../Types/IUser";


export const initialUserState: IUserRequest = {
    displayName: "",
    username: "",
    password: "",
    avatar: "",
    managerName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
};

export const resetSignUpForm = (User?: IUserRequest) => {
    return User ?? initialUserState
};