import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App"; // Appをインポート

// createRootを使用してルートを作成
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// renderメソッドを呼び出してコンポーネントをレンダリング
root.render(
  <React.StrictMode>
    <Router>
      <App /> {/* Appコンポーネント */}
    </Router>
  </React.StrictMode>
);

reportWebVitals();
