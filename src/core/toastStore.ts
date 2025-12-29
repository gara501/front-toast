import { EventBus } from "./eventBus";
import { applyMiddlewares } from "./middlewareManager";
import type { ToastPayLoad, ToastOptions } from "../types/toast";
import { ReactNode } from "react";

const toastBus = new EventBus<ToastPayLoad>();

export function showToast(content: ReactNode, options: ToastOptions = {}) {
  const toast: ToastPayLoad = {
    id: options.id ?? crypto.randomUUID(),
    content,
    duration: options.duration ?? 4000,
    theme: options.theme ?? "light",
  };

  const processed = applyMiddlewares(toast);

  if (processed) {
    toastBus.emit(processed);
  }
}

export function onToast(listener: (toast: ToastPayLoad) => void) {
  return toastBus.on(listener);
}
