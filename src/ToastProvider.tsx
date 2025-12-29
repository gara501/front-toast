import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { onToast } from "./core/toastStore";
import type { ToastPayLoad } from "./types/toast";
import { ToastContainer } from "./components/ToastContainer";
import "./styles/toast.css";

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastPayLoad[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const unsubscribe = onToast((toast) => {
      setToasts((prev) => [...prev, toast]);

      const timeoutId = window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        timers.current.delete(toast.id);
      }, toast.duration);

      timers.current.set(toast.id, timeoutId);
    });

    return () => {
      unsubscribe();
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  return createPortal(<ToastContainer toasts={toasts} />, document.body);
}
