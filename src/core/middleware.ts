import type { ToastPayLoad } from "../types/toast";

export type ToastMiddleware = (toast: ToastPayLoad) => ToastPayLoad | null;
