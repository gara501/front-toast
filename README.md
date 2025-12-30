![npm](https://img.shields.io/npm/v/front-toast)
![license](https://img.shields.io/npm/l/front-toast)
![types](https://img.shields.io/npm/types/front-toast)
![downloads](https://img.shields.io/npm/dm/front-toast)
![build](https://github.com/gara501/front-toast/actions/workflows/ci.yml/badge.svg)

# front-toast

A lightweight, configurable, and framework-safe toast notification library for React applications.

**front-toast** is designed to be:

- ✅ Fully written in TypeScript
- ✅ Non-intrusive (no CSS leaks, no global overrides)
- ✅ Easy to integrate in any React app
- ✅ Highly customizable (themes, content, behavior)
- ✅ Compatible with any React node as content

Built with simplicity, performance, and maintainability in mind.

---

## ✨ Demo

Run the demo: 

```bash
npm run demo
```

> The demo showcases multiple toasts, custom content, themes, and automatic dismissal.

---

## ✨ Features

- 📦 Small bundle size, dependency-light
- 🎨 Themeable using pure CSS (no CSS-in-JS)
- 🧩 Accepts any `ReactNode` as toast content
- ⚡ Imperative API (trigger toasts from anywhere)
- ♻️ Automatic cleanup (no memory leaks)
- 🧠 Fully type-safe public API

---

## 📦 Installation

```bash
npm install front-toast
# or
yarn add front-toast
# or
pnpm add front-toast
```

---

## 🚀 Basic Usage

### 1️⃣ Wrap your application with `ToastProvider`

```tsx
import { ToastProvider } from "front-toast";

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

---

### 2️⃣ Trigger a toast from anywhere

```ts
import { toast } from "front-toast";

toast.show({
  content: "Hello world",
});
```

---

## 🧩 Custom Content

```tsx
toast.show({
  content: (
    <div>
      <strong>Success</strong>
      <p>Your action was completed</p>
    </div>
  ),
});
```

---

## ⚙️ Configuration Options

```ts
toast.show({
  content: "Saved successfully",
  duration: 3000,
  position: "top-right",
  theme: "success",
});
```

---

## 🧠 Available Options

| Option    | Type      | Default     | Description               |
|----------|-----------|-------------|---------------------------|
| content  | ReactNode | —           | Toast content             |
| duration | number    | 4000        | Auto-close time (ms)      |
| position | string    | top-right   | Toast position            |
| theme    | string    | default     | Visual theme              |
| closable | boolean   | true        | Show close button         |

---

## 🎨 Styling and Themes

front-toast uses pure CSS with scoped class names:

```css
.rtk-success {
  background-color: #16a34a;
  color: white;
}
```

### Custom Themes

You can define your own themes using pure CSS.

```css
.rtk-neon {
  background: linear-gradient(135deg, #22d3ee, #a855f7);
  color: #0f172a;
}
```
Now in your component, only need to add the theme name (without rtk), rtk should be always in your css definition, this is to avoid
name collisions

```bash
showToast("Branded toast", { theme: "neon" });
```

---

## 🧠 Architecture Internals

front-toast follows a **minimal event-driven architecture**.

### Core Concepts

```
toast.show()
     ↓
 EventBus (singleton)
     ↓
 ToastProvider (subscriber)
     ↓
 React Portal
     ↓
 ToastContainer → ToastItem
```

### Why this architecture?

- **Decoupled**: No hooks or context required to trigger toasts
- **Predictable**: One-way data flow
- **Performant**: O(1) subscriptions, minimal re-renders
- **Safe**: Automatic unsubscription and cleanup

### Key Modules

- `EventBus<T>`  
  Lightweight pub/sub system with zero dependencies

- `toastStore.ts`  
  Public imperative API (`toast.show()`)

- `ToastProvider`  
  Listens to events and manages toast lifecycle

- `ToastContainer`  
  Pure presentational component

- `toast.css`  
  Scoped, framework-safe styles

This design avoids common pitfalls like global state pollution, CSS bleeding, or heavy abstractions.

---

## 🤔 Why Front Toast?

Unlike many toast libraries, front-toast:

- Does not rely on uncontrolled portals
- Does not inject inline styles
- Does not force animations or design systems
- Does not leak global CSS
- Does not require Redux, Zustand, or Context APIs

Ideal for **design systems, enterprise apps, and long-term projects**.

---

## 🌍 Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Any browser supported by React

---

## 🤝 Contributing

Contributions are welcome.

Please ensure:
- Tests are passing
- TypeScript types remain accurate
- Public API remains stable

---

## 📄 License

MIT © Garadevcol
