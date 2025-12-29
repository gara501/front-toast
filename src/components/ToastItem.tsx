import { ToastPayLoad } from "../types/toast";

export function ToastItem({ toast }: { toast: ToastPayLoad }) {
  return <div className={`rtk-toast rtk-${toast.theme}`}>{toast.content}</div>;
}
