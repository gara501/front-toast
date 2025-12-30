import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { onToast } from "./core/toastStore";
import { ToastPayLoad, ToastPosition } from "./types/toast";
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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setToasts([]);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function groupByPosition(toasts: ToastPayLoad[]) {
    return toasts.reduce<Record<ToastPosition, ToastPayLoad[]>>(
      (acc, toast) => {
        acc[toast.position].push(toast);
        return acc;
      },
      {
        "top-left": [],
        "top-center": [],
        "top-right": [],
        "bottom-left": [],
        "bottom-center": [],
        "bottom-right": [],
      },
    );
  }

  if (typeof document === "undefined") return null;

  const grouped = groupByPosition(toasts);

  return createPortal(
    <>
      {Object.entries(grouped).map(([position, items]) =>
        items.length ? (
          <ToastContainer
            key={position}
            position={position as ToastPosition}
            toasts={items}
          />
        ) : null,
      )}
    </>,
    document.body,
  );
}
