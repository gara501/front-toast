import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { onToast } from "./core/toastStore";
import { ToastPayLoad } from "./types/toast";
import { ToastContainer } from "./components/ToastContainer";
import "./styles/toast.css";

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastPayLoad[]>([]);

  useEffect(() => {
    return onToast((toast) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    });
  }, []);

  return createPortal(<ToastContainer toasts={toasts} />, document.body);
}
