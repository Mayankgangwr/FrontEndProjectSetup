// Interface for Bank Details
export interface IBankDetails {
    name: string;
    accountNo: string;
    ifsc: string;
    branch: string;
}

// Interface for Worker Request
export interface IWorkerRequest {
    _id: string;
    shiftId: string;
    roleId: string;
    displayName: string;
    username: string;
    password: string;
    phoneNumber: string;
    position: string;
    dob: string;
    aadharCard: string;
    panCard: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

// Interface for Worker Response
export interface IWorkerResponse {
    _id: string;
    restroId: string;
    roleId: string;
    shiftId: string;
    displayName: string;
    username: string;
    position: string;
    avatar: string | null;
    phoneNumber: string;
    dob: number | null;  // Assuming dob is a timestamp (UNIX format)
    aadharCard: string | null;
    panCard: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
    isLoggedIn: boolean;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}



// Interface for Worker Table
export interface IWorkerTable {
    name: JSX.Element;
    phoneNumber: string;
    shift: string;
    workTiming: string;
    action: JSX.Element;
}




