import { describe, it, expect, vi } from "vitest";
import { showToast, onToast } from "../../core/toastStore";
import type { ToastPayLoad } from "../../types/toast";

describe("toastStore", () => {
  it("emits a toast to subscribers", () => {
    const listener = vi.fn();
    const unsubscribe = onToast(listener as (toast: ToastPayLoad) => void);

    showToast("Hello", { duration: 1000 });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].content).toBe("Hello");

    unsubscribe();
  });

  it("applies default options", () => {
    const listener = vi.fn();
    const unsubscribe = onToast(listener as (toast: ToastPayLoad) => void);

    showToast("Default");

    const toast = listener.mock.calls[0][0];

    expect(toast.duration).toBe(4000);
    expect(toast.theme).toBe("light");

    unsubscribe();
  });
});
