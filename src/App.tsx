// ================================ App.tsx ================================ 
// Componente raiz da aplicação
// Gerencia as rotas e o fluxo de navegação
// ==========================================================================

import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";

// ─── Importação das páginas ──────────────────────────────────
// Cada página será criada em sua respectiva pasta

import Setup from "./pages/Setup/Setup";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Funcionarios from "./pages/Funcionarios/Funcionarios";
import Aeronaves from "./pages/Aeronaves/Aeronaves";
import AeronaveDetalhe from "./pages/Aeronaves/AeronaveDetalhe";
  
// ─── Tipos de rota ───────────────────────────────────────────
// Define todas as rotas possíveis da aplicação

export type Rota =
  | "setup"
  | "login"
  | "dashboard"
  | "aeronaves"
  | "aeronaves-cadastrar"
  | "aeronaves-editar"
  | "aeronaves-detalhar"
  | "nova-etapa"
  | "editar-etapa"
  | "nova-peca"
  | "editar-peca"
  | "novo-teste"
  | "relatorio"
  | "funcionarios"
  | "funcionarios-cadastrar"
  | "funcionarios-editar";

// ─── Roteador interno ────────────────────────────────────────
// Controla qual página é exibida com base na rota atual

function Roteador() {
  const { setupFeito, usuarioLogado } = useApp();

  // Estado da rota atual
  const [rota, setRota] = useState<Rota>("setup");

  // Estado para passar dados entre páginas (ex: aeronave selecionada)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [parametros, setParametros] = useState<Record<string, string>>({});
  
  // ─── Função de navegação ─────────────────────────────────
  // Chamada por qualquer componente para mudar de página

  function navegar(novaRota: Rota, params: Record<string, string> = {}) {
    setParametros(params);
    setRota(novaRota);
  }

  // ─── Lógica de redirecionamento ──────────────────────────
  // Garante que o usuário sempre esteja na tela correta

  if (!setupFeito) return <Setup navegar={navegar} />;
  if (setupFeito && !usuarioLogado) return <Login navegar={navegar} />;

  // ─── Renderização da rota atual ──────────────────────────

  switch (rota) {
    case "setup":
      return <Setup navegar={navegar} />;
    case "login":
      return <Login navegar={navegar} />;
    case "dashboard":
      return <Dashboard navegar={navegar} />;
    case "funcionarios":
      return <Funcionarios navegar={navegar} />;
    case "aeronaves":
      return <Aeronaves navegar={navegar} />;
    case "aeronaves-detalhar":
      return <AeronaveDetalhe navegar={navegar} codigo={parametros.codigo} />;

    // As páginas abaixo serão adicionadas conforme desenvolvimento
    default:
      return <Dashboard navegar={navegar} />;
  }
}

// ─── App principal ───────────────────────────────────────────
// Envolve tudo no AppProvider para disponibilizar o contexto

export default function App() {
  return (
    <AppProvider>
      <Roteador />
    </AppProvider>
  );
}