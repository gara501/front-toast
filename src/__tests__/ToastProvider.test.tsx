import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ToastProvider } from "../ToastProvider";
import { showToast } from "../core/toastStore";

describe("ToastProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders toast content when emitted", () => {
    render(<ToastProvider />);

    act(() => {
      showToast("Hello toast", { duration: 1000 });
    });

    expect(screen.getByText("Hello toast")).toBeInTheDocument();
  });

  it("removes toast after duration", () => {
    render(<ToastProvider />);

    act(() => {
      showToast("Auto close", { duration: 500 });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText("Auto close")).not.toBeInTheDocument();
  });

  it("handles multiple toasts independently", () => {
    render(<ToastProvider />);

    act(() => {
      showToast("Toast 1", { id: "1", duration: 500 });
      showToast("Toast 2", { id: "2", duration: 1000 });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText("Toast 1")).not.toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText("Toast 2")).not.toBeInTheDocument();
  });
});
