import { ToastPayLoad } from "../types/toast";
import { ToastItem } from "./ToastItem";

interface Props {
  toasts: ToastPayLoad[];
}

export function ToastContainer({ toasts }: Props) {
  return (
    <div className="rtk-toast-root">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
