import { useState } from "react";
import { showToast } from "../src/core/toastStore";

export default function App() {
  const [duration, setDuration] = useState(2000);

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 420,
      }}
    >
      <h1>front-toast playground</h1>

      {/* Duration control */}
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span>Toast duration (ms)</span>
        <input
          type="number"
          min={500}
          step={500}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>

      <button onClick={() => showToast("Default Toast", { duration })}>
        Default toast
      </button>

      <button
        onClick={() =>
          showToast(<strong>Left Side toast</strong>, {
            duration,
            position: "top-left",
          })
        }
      >
        Left side toast
      </button>

      <button
        onClick={() =>
          showToast("Dark theme toast", {
            duration,
            theme: "dark",
          })
        }
      >
        Dark theme
      </button>

      <button
        onClick={() =>
          showToast("Warning theme toast", {
            duration,
            theme: "warning",
          })
        }
      >
        Warning theme
      </button>

      <button
        onClick={() =>
          showToast("Success theme toast", {
            duration,
            theme: "success",
          })
        }
      >
        Success theme
      </button>

      <button
        onClick={() =>
          showToast("Error theme toast", {
            duration,
            theme: "error",
          })
        }
      >
        Error theme
      </button>

      <button
        onClick={() =>
          showToast("Custom theme toast", {
            duration,
            theme: "neon",
          })
        }
      >
        Custom theme (Neon theme defined in demo.css)
      </button>

      <button
        onClick={() =>
          showToast(
            <div>
              <h1>Hi I am a Big Toast title</h1>
              <strong>ReactNode content</strong>
            </div>,
            {
              duration,
            },
          )
        }
      >
        ReactNode toast
      </button>

      <button
        onClick={() => {
          showToast("Toast 1", { id: "122323", duration });
          showToast("Toast 2", { id: "2343433", duration });
        }}
      >
        Multiple toasts
      </button>
    </div>
  );
}
