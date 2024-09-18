import { PresenceBadgeStatus } from "@fluentui/react-components";

export interface IBank{
    name: string;
    accountNo: string;
    ifsc: string;
    branch: string;
}
export interface IEmployee {
    id: string;
    restroId: string;
    name: string;
    position: string;
    phoneNumber: string;
    image: string;
    dob: string;
    aadharCard: string;
    bank: IBank;
    panCard: string;
    shift: string;
    isLoggedIn: PresenceBadgeStatus;
    loggedAt: string;
    loggedOut: string
}