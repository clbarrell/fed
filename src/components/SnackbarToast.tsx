import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { ReactComponent as CheckCircle } from "../assets/check-circle.svg";
import { ReactComponent as X } from "../assets/x.svg";
import { ReactComponent as Info } from "../assets/info.svg";

export type SnackbarToastProps = {
  isOpen: boolean;
  handleClose: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
  closeSnackbar: () => void;
  message: string;
  messageType: "success" | "info" | "";
};

export const SnackbarToast: React.FC<SnackbarToastProps> = ({
  isOpen,
  handleClose,
  closeSnackbar,
  message,
  messageType,
}) => {
  const coreCSS =
    "py-2 px-4 lg:px-6 font-semibold rounded-full text-sm leading-none shadow flex-auto flex items-center";

  const snackbarContent = () => {
    if (messageType === "success") {
      return (
        <div className={`bg-green-600 text-white ${coreCSS}`}>
          <CheckCircle /> <span className="ml-2 flex-auto">{message}</span>
        </div>
      );
    }
    return (
      <div className={`bg-gray-600 text-white ${coreCSS}`}>
        <Info />
        <span className="ml-2 flex-auto">{message}</span>
        <button
          className="hover:bg-gray-100 rounded-full border- border-gray-100 hover:text-gray-600 items-center bg-gray-500 uppercase px-2 py-1 text-xs font-bold flex ml-3"
          onClick={closeSnackbar}
        >
          <span className="flex-0 mr-1">Close</span>
          <X />
        </button>
      </div>
    );
  };

  const autoHide = messageType === "success" ? 3500 : 10000;

  return (
    <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={autoHide}>
      {snackbarContent()}
    </Snackbar>
  );
};

export default SnackbarToast;
