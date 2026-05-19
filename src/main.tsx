// ================================ main.tsx ================================ 
// Ponto de entrada da aplicação
// Renderiza o componente App no elemento root do HTML
// ==========================================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// ─── Inicialização ───────────────────────────────────────────
// Monta a aplicação React no elemento com id="root" do index.html

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);