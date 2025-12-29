import { ReactNode } from "react";
export type ToastTheme = "light" | "dark" | "custom";

export interface ToastOptions {
  id?: string;
  duration?: number;
  theme?: ToastTheme;
}

export interface ToastPayLoad {
  id: string;
  content: ReactNode;
  duration: number;
  theme: ToastTheme;
}
