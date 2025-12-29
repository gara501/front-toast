type Listener<T> = (payload: T) => void;

export class EventBus<T> {
  private listeners = new Set<Listener<T>>();

  on(listener: Listener<T>): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener); // ← ignoramos el boolean
    };
  }

  emit(payload: T) {
    this.listeners.forEach((listener) => listener(payload));
  }
}
