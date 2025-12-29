import { EventBus } from "./eventBus";
import type { ToastPayLoad, ToastOptions } from "../types/toast";
import { ReactNode } from "react";

const toastBus = new EventBus<ToastPayLoad>();

export function showToast(content: ReactNode, options: ToastOptions = {}) {
  toastBus.emit({
    id: options.id ?? crypto.randomUUID(),
    content,
    duration: options.duration ?? 4000,
    theme: options.theme ?? "light",
  });
}

export function onToast(listener: (toast: ToastPayLoad) => void) {
  return toastBus.on(listener);
}
