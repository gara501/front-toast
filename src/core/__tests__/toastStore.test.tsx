import { describe, it, expect, vi, beforeEach } from "vitest";
import { showToast, onToast } from "../toastStore";
import type { ToastPayLoad } from "../../types/toast";
import React from "react";

describe("toastStore", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("emits a toast with default values", () => {
    // Mock crypto
    vi.stubGlobal("crypto", {
      randomUUID: () => "uuid-1",
    });

    const listener = vi.fn();
    const unsubscribe = onToast(listener as (toast: ToastPayLoad) => void);

    showToast("Hello");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith({
      id: "uuid-1",
      content: "Hello",
      duration: 4000,
      theme: "light",
    });

    unsubscribe();
  });

  it("respects provided options", () => {
    const listener = vi.fn();
    const unsubscribe = onToast(listener as (toast: ToastPayLoad) => void);

    showToast("Custom", {
      id: "custom-id",
      duration: 1000,
      theme: "dark",
    });

    expect(listener).toHaveBeenCalledWith({
      id: "custom-id",
      content: "Custom",
      duration: 1000,
      theme: "dark",
    });

    unsubscribe();
  });

  it("accepts ReactNode as content", () => {
    const listener = vi.fn();
    const unsubscribe = onToast(listener as (toast: ToastPayLoad) => void);

    const node = <strong>Toast</strong>;

    showToast(node);

    const payload = listener.mock.calls[0][0];

    expect(payload.content).toBe(node);

    unsubscribe();
  });

  it("unsubscribe stops receiving toasts", () => {
    const listener = vi.fn();
    const unsubscribe = onToast(listener);

    unsubscribe();
    showToast("Should not fire");

    expect(listener).not.toHaveBeenCalled();
  });
});
