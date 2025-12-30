// components/ToastContainer.tsx
import { ToastPayLoad, ToastPosition } from "../types/toast";
import { ToastItem } from "./ToastItem";

interface Props {
  toasts: ToastPayLoad[];
  position: ToastPosition;
}

export function ToastContainer({ toasts, position }: Props) {
  return (
    <div
      className={`rtk-toast-root ${position}`}
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
