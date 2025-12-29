import { showToast } from "../src/core/toastStore";

export default function App() {
  return (
    <div
      style={{ padding: 40, display: "flex", flexDirection: "column", gap: 12 }}
    >
      <h1>front-toast playground</h1>

      <button onClick={() => showToast("Toast por defecto")}>
        Default toast
      </button>

      <button
        onClick={() =>
          showToast("Toast oscuro", {
            theme: "dark",
          })
        }
      >
        Dark theme
      </button>

      <button
        onClick={() =>
          showToast(<strong>ReactNode content</strong>, {
            duration: 6000,
          })
        }
      >
        ReactNode toast
      </button>

      <button
        onClick={() => {
          showToast("Toast 1", { id: "1", duration: 1000 });
          showToast("Toast 2", { id: "2", duration: 2000 });
        }}
      >
        Multiple toasts
      </button>
    </div>
  );
}
