import { ReactNode } from "react";
export type ToastTheme =
  | "light"
  | "dark"
  | "success"
  | "error"
  | "warning"
  | (string & {});
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  id?: string;
  duration?: number;
  theme?: ToastTheme;
  position?: ToastPosition;
  dismissible?: boolean;
}

export interface ToastPayLoad {
  id: string;
  content: ReactNode;
  duration: number;
  theme: ToastTheme;
  position: ToastPosition;
  dismissible?: boolean;
}
