import { useEffect, useState } from "react";
import { workerHeader } from "../../Constants/TableHeader";
import { getFormattedWorkerTable } from "../../Utils/formatTable";
import Styles from "./Dashboard.module.scss";
import { Button, Container, Flex, Table } from "../../Components";
import { ISort } from "../../Components/Table/Interface";
import AddWorker from "../../Components/Worker/AddWorker";
import { useSelector, useDispatch } from "react-redux";
import { JustifyContent } from "../../Components/Flex/Flex";
import workerController from "../../DataProvider/Controllers/WorkerController";
import { setWorker } from "../../Store/Slices/workerSlice";
import { IWorkerResponse } from "../../Types/IWorkers";
import { IUserResponse } from "../../Types/IUser";



const Dashboard = () => {
    const user: IUserResponse | null = useSelector((state: any) => state.auth.userData);
    const workers = useSelector((state: any) => state.worker.workers);
    const [tableHeader, setTableHeader] = useState<any>([]);
    const [tableRows, setTableRows] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<{ key: boolean; data: IWorkerResponse } | null>(null);

    const dispatch = useDispatch();

    const hadleLoadWorker = async () => {
        const response: IWorkerResponse[] | null = await workerController.getWorkers();
        if (response) dispatch(setWorker(response));
    }
    const handleEdit = (id: string) => {
        const worker = workers.find((data: any) => data._id === id);
        if (worker) {
            const edit = {
                key: true,
                data: worker
            }
            setIsEdit(() => edit);
        } else {
            alert("Data not found!");
        }

    }

    const handleDelte = (id: string) => {

    }
    useEffect(() => {
        if (user) {
            hadleLoadWorker();
        }
    }, [user]);
    useEffect(() => {
        let tableHeader = workerHeader;
        let tableRows = getFormattedWorkerTable(workers, handleEdit, handleDelte);
        setTableHeader(() => tableHeader)
        setTableRows(() => tableRows);
    }, [workers]);

    const handleDialogToggle = (isOpen: boolean) => {
        if (isEdit) {
            setIsEdit(null);
        } else {
            setIsOpen(isOpen);
        }
    }


    return (
        <Container>
            <Flex className="py-3" justifyContent={JustifyContent.END}>
                <Button
                    children="Add Member"
                    className={Styles.AddMember}
                    onClick={() => handleDialogToggle(true)}
                    shape="rounded"
                    size="medium"
                    color="#ffc107"
                    appearance="primary"
                />

            </Flex>
            <Table
                tableHeader={tableHeader}
                tableRows={tableRows}
                initialSort={{ key: "name", sortBy: ISort.ASC }}
                rowsPerPage={[10, 20, 30]}
            />

            {isOpen && (<AddWorker isOpen={isOpen} onClose={handleDialogToggle} />)}
            {isEdit && (<AddWorker isOpen={isEdit.key} data={isEdit.data} onClose={handleDialogToggle} />)}
        </Container>
    )
}

export default Dashboard;