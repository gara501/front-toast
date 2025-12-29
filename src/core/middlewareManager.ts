import type { ToastMiddleware } from "./middleware";
import type { ToastPayLoad } from "../types/toast";

const middlewares: ToastMiddleware[] = [];

export function useToastMiddleware(middleware: ToastMiddleware) {
  middlewares.push(middleware);

  return () => {
    const index = middlewares.indexOf(middleware);
    if (index !== -1) middlewares.splice(index, 1);
  };
}

export function applyMiddlewares(toast: ToastPayLoad): ToastPayLoad | null {
  let current: ToastPayLoad | null = toast;

  for (const middleware of middlewares) {
    if (current === null) return null;
    current = middleware(current);
  }

  return current;
}
