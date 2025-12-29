import { describe, it, expect, vi } from "vitest";
import { EventBus } from "./eventBus";

describe("EventBus", () => {
  it("notifies a single listener", () => {
    const bus = new EventBus<string>();
    const listener = vi.fn();

    bus.on(listener);
    bus.emit("hello");

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith("hello");
  });

  it("notifies multiple listeners", () => {
    const bus = new EventBus<number>();
    const l1 = vi.fn();
    const l2 = vi.fn();

    bus.on(l1);
    bus.on(l2);

    bus.emit(42);

    expect(l1).toHaveBeenCalledWith(42);
    expect(l2).toHaveBeenCalledWith(42);
  });

  it("unsubscribes correctly", () => {
    const bus = new EventBus<string>();
    const listener = vi.fn();

    const unsubscribe = bus.on(listener);
    unsubscribe();

    bus.emit("test");

    expect(listener).not.toHaveBeenCalled();
  });

  it("does not affect other listeners when unsubscribing one", () => {
    const bus = new EventBus<string>();
    const l1 = vi.fn();
    const l2 = vi.fn();

    const unsubscribe = bus.on(l1);
    bus.on(l2);

    unsubscribe();
    bus.emit("payload");

    expect(l1).not.toHaveBeenCalled();
    expect(l2).toHaveBeenCalledOnce();
  });
});
