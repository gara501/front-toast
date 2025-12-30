import { ToastPayLoad } from "../types/toast";

interface Props {
  toast: ToastPayLoad;
}

export function ToastItem({ toast }: Props) {
  const isAssertive = toast.theme === "error" || toast.theme === "warning";

  return (
    <div
      className={`rtk-toast rtk-${toast.theme ?? "light"}`}
      role={isAssertive ? "alert" : "status"}
      aria-live={isAssertive ? "assertive" : "polite"}
      aria-atomic="true"
      style={
        {
          "--toast-duration": `${toast.duration}ms`,
        } as React.CSSProperties
      }
    >
      <div className="rtk-toast-content">{toast.content}</div>

      {toast.duration > 0 && (
        <div key={toast.id} className="rtk-toast-progress" />
      )}
    </div>
  );
}
