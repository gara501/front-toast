// core/toastStore.ts
import { EventBus } from "./eventBus";
import type { ToastPayLoad, ToastOptions, ToastPosition } from "../types/toast";
import { ReactNode } from "react";

const toastBus = new EventBus<ToastPayLoad>();
const positionBus = new EventBus<ToastPosition>();

let currentPosition: ToastPosition = "top-right";

export function showToast(content: ReactNode, options: ToastOptions = {}) {
  if (options.position && options.position !== currentPosition) {
    currentPosition = options.position;
    positionBus.emit(currentPosition);
  }

  toastBus.emit({
    id: options.id ?? crypto.randomUUID(),
    content,
    duration: options.duration ?? 4000,
    theme: options.theme ?? "light",
    position: options.position ?? "top-right",
    dismissible: options.dismissible ?? true,
  });
}

export function onToast(listener: (toast: ToastPayLoad) => void) {
  return toastBus.on(listener);
}

export function onPositionChange(listener: (pos: ToastPosition) => void) {
  listener(currentPosition); // sync inicial
  return positionBus.on(listener);
}
