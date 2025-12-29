import { describe, it, expect, vi, afterEach } from "vitest";
import { applyMiddlewares, useToastMiddleware } from "../../core/middlewareManager";
import type { ToastPayLoad } from "../../types/toast";

describe("middlewareManager", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("applies middleware in order", () => {
    const unsubscribe = useToastMiddleware((toast) => ({
      ...toast,
      theme: "dark",
    }));

    const toast: ToastPayLoad = {
      id: "1",
      content: "Hello",
      duration: 3000,
      theme: "light",
    };

    const result = applyMiddlewares(toast);

    expect(result?.theme).toBe("dark");
    unsubscribe();
  });

  it("can cancel a toast", () => {
    const unsubscribe = useToastMiddleware(() => null);

    const toast: ToastPayLoad = {
      id: "1",
      content: "Blocked",
      duration: 3000,
      theme: "light",
    };

    const result = applyMiddlewares(toast);

    expect(result).toBeNull();
    unsubscribe();
  });

  it("removes middleware on unsubscribe", () => {
    const middleware = vi.fn((toast) => toast);
    const unsubscribe = useToastMiddleware(middleware);

    unsubscribe();

    const toast: ToastPayLoad = {
      id: "1",
      content: "Hello",
      duration: 3000,
      theme: "light",
    };

    applyMiddlewares(toast);

    expect(middleware).not.toHaveBeenCalled();
  });
});
