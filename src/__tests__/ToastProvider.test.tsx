import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ToastProvider } from "../ToastProvider";
import { showToast } from "../core/toastStore";

describe("ToastProvider", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders toast content when emitted", async () => {
    render(<ToastProvider />);

    act(() => {
      showToast("Hello Toast", { duration: 1000 });
    });

    expect(await screen.findByText("Hello Toast")).toBeInTheDocument();
  });

  it("removes toast after duration", async () => {
    vi.useFakeTimers();
    render(<ToastProvider />);

    act(() => {
      showToast("Auto close", { duration: 500 });
    });

    expect(screen.getByText("Auto close")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText("Auto close")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("is SSR-safe", () => {
    const { container } = render(<ToastProvider />);
    expect(container.firstChild).toBeNull();
  });
});
