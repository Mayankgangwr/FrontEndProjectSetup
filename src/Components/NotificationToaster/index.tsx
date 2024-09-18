import * as React from "react";
import {
  useId,
  Link,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from "@fluentui/react-components";

interface NotificationToasterProps {
  title: string;
  body: string;
  subtitle?: string;
  intent?: "success" | "error" | "warning" | "info";
  actions?: React.ReactNode; // Can pass custom actions (e.g., links or buttons)
  onNotify?: (triggerToast: () => void) => void; // Parent can receive the toast trigger function
}

const NotificationToaster: React.FC<NotificationToasterProps> = ({
  title,
  body,
  subtitle,
  intent = "success",
  actions,
  onNotify, // Callback for parent to receive trigger function
}) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  // Function to trigger the toast
  const triggerToast = React.useCallback(() => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody subtitle={subtitle}>{body}</ToastBody>
        {actions && <ToastFooter>{actions}</ToastFooter>}
      </Toast>,
      { intent }
    );
  }, [dispatchToast, title, body, subtitle, actions, intent]);

  // Call `onNotify` and pass the trigger function
  React.useEffect(() => {
    if (onNotify) {
      onNotify(triggerToast);
    }
  }, [onNotify, triggerToast]);

  return <Toaster toasterId={toasterId} />;
};

export default NotificationToaster;
