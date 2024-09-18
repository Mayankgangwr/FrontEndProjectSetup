import { FC, useState } from "react";
import {
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
} from "@fluentui/react-components";
import authController from "../../DataProvider/Controllers/AuthController";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import NotificationToaster from "../NotificationToaster"; // Import the NotificationToaster
import { useNavigate } from "react-router-dom";

interface ILogoutProps {
    isOpen: boolean;
    handleLogoutModel: () => void;
}

const Logout: FC<ILogoutProps> = ({ isOpen, handleLogoutModel }) => {
    const [notifyTrigger, setNotifyTrigger] = useState<() => void>(); // Store the notification trigger function

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleConfirmLogout = async () => {
        try {
            const response = await authController.logout();
            if (response) {
                dispatch(logout());

                // Show the notification
                if (notifyTrigger) {
                    notifyTrigger();
                }

                // Navigate to the login page after showing the toast
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            handleLogoutModel();
        }
    };

    return (
        <>
            {/* Notification toaster to show success message */}
            <NotificationToaster
                title="Logged Out"
                body="You have been successfully logged out."
                intent="success"
                onNotify={(triggerToast) => setNotifyTrigger(() => triggerToast)}
            />

            <Dialog open={isOpen}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogContent>
                            Are you sure you want to log out? You will need to log in again to access your account.
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={handleLogoutModel}>
                                Cancel
                            </Button>
                            <Button appearance="primary" onClick={handleConfirmLogout}>
                                Log Out
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </>
    );
};

export default Logout;
