import { describe, it, expect } from "vitest";
import type { ToastPayLoad } from "../../types/toast";
import type { ToastMiddleware } from "../middleware";

describe("ToastMiddleware type", () => {
  it("allows transforming a toast", () => {
    const middleware: ToastMiddleware = (toast) => ({
      ...toast,
      theme: "dark",
    });

    const toast: ToastPayLoad = {
      id: "1",
      content: "Test",
      duration: 1000,
      theme: "light",
    };

    const result = middleware(toast);
    expect(result?.theme).toBe("dark");
  });

  it("allows cancelling a toast", () => {
    const middleware: ToastMiddleware = () => null;

    const toast: ToastPayLoad = {
      id: "1",
      content: "Test",
      duration: 1000,
      theme: "light",
    };

    const result = middleware(toast);
    expect(result).toBeNull();
  });
});
