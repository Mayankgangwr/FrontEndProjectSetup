import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { IWorkerResponse } from "../Types/IWorkers";
import { MoreVerticalFilled } from "@fluentui/react-icons";
import { ITableRow } from "../Components/Table/Interface";
import { FC } from "react";
import { getRole, getShift } from "./worker";


const TableAction: FC<any> = ({ id, onEdit, onDelete }) => (
    <Menu>
        <MenuTrigger disableButtonEnhancement>
            <MoreVerticalFilled fontSize={20} />
        </MenuTrigger>
        <MenuPopover>
            <MenuList>
                <MenuItem onClick={() => onEdit(id)}>Edit</MenuItem>
                <MenuItem onClick={() => onDelete(id)}>Delete</MenuItem>
            </MenuList>
        </MenuPopover>
    </Menu>)


const getFormattedTableRow = (item: IWorkerResponse, onEdit: (id: string) => void, onDelete: (id: string) => void): ITableRow => {
    return {
        displayName: {
            key: item.displayName,
            value: item.displayName
        },
        phoneNumber: {
            key: item.phoneNumber,
            value: item.phoneNumber
        },
        shiftId: {
            key: item.shiftId,
            value: getShift(item.shiftId) || "",
        },
        roleId: {
            key: item.roleId,
            value: getRole(item.roleId) || "",
        },
        isLoggedIn: {
            key: item.isLoggedIn ? 1 : 0,
            value: item.isLoggedIn ? 'Yes' : 'Out',
        },
        action: {
            key: "",
            value: <TableAction
                id={item._id}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        }
    };
};

export const getFormattedWorkerTable = (
    tableData: IWorkerResponse[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
): ITableRow[] => {
    return tableData.map(item => getFormattedTableRow(item, onEdit, onDelete));
};
