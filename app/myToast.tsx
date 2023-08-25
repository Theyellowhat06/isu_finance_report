import { Id, toast } from "react-toastify";

export const toastSuccess = (toastId: Id, message: string) => {
  toast.update(toastId, {
    type: toast.TYPE.SUCCESS,
    autoClose: 2000,
    render: message,
    isLoading: false,
  });
};

export const toastError = (toastId: Id, message: string) => {
  toast.update(toastId, {
    type: toast.TYPE.ERROR,
    autoClose: 2000,
    render: message,
    isLoading: false,
  });
};
