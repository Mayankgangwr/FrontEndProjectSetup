import { ITableHeader } from "../Components/Table/Interface";

export const workerHeader: ITableHeader[] = [
    {
        key: "displayName",
        title: "Name",
        isSearch: true
    },
    {
        key: "phoneNumber",
        title: "Phone No."
    },
    {
        key: "shiftId",
        title: "Shift"
    },
    {
        key: "roleId",
        title: "Role"
    },
    {
        key: "isLoggedIn",
        title: "Is LoggedIn"
    },
    {
        key: "action",
        title: "Action",
        isFilter: false,
        isSort: false
    },

];