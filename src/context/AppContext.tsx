// ============================= AppContext.tsx ============================= 
// Contexto global da aplicação
// Gerencia: usuário logado, dados de todas as entidades e funções para manipular esses dados (CRUD)
// ==========================================================================

import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

import type { Aeronave, Funcionario, Peca, Etapa, Teste } from "../types";
import { NivelPermissao } from "../types";

import {
  aeronavesIniciais, pecasIniciais,
  etapasIniciais, testesIniciais,
} from "../data/mockData";

// ─── Tipos do contexto ────────────────────────────────────────
// Define o que o contexto vai expor para toda a aplicação

interface AppContextType {
  // Usuário logado
  usuarioLogado: Funcionario | null;
  setUsuarioLogado: (f: Funcionario | null) => void;

  // Setup inicial
  setupFeito: boolean;
  concluirSetup: (admin: Funcionario) => void;

  // Dados
  aeronaves: Aeronave[];
  funcionarios: Funcionario[];
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];

  // CRUD Aeronaves
  adicionarAeronave: (a: Aeronave) => void;
  editarAeronave: (a: Aeronave) => void;
  excluirAeronave: (codigo: string) => void;

  // CRUD Funcionários
  adicionarFuncionario: (f: Funcionario) => void;
  editarFuncionario: (f: Funcionario) => void;
  excluirFuncionario: (id: string) => void;

  // CRUD Peças
  adicionarPeca: (p: Peca) => void;
  editarPeca: (p: Peca) => void;

  // CRUD Etapas
  adicionarEtapa: (e: Etapa) => void;
  editarEtapa: (e: Etapa) => void;

  // CRUD Testes
  adicionarTeste: (t: Teste) => void;

  // Helpers de permissão
  isAdmin: () => boolean;
  isEngenheiro: () => boolean;
  isOperador: () => boolean;
}

// ─── Criação do contexto ──────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────
// Envolve toda a aplicação e disponibiliza os dados e funções

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuarioLogado, setUsuarioLogado] = useState<Funcionario | null>(null);
  const [setupFeito, setSetupFeito] = useState(false);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(aeronavesIniciais);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [pecas, setPecas] = useState<Peca[]>(pecasIniciais);
  const [etapas, setEtapas] = useState<Etapa[]>(etapasIniciais);
  const [testes, setTestes] = useState<Teste[]>(testesIniciais);

  // ─── Setup inicial ──────────────────────────────────────────
  // Cria o primeiro administrador e marca o setup como concluído

  function concluirSetup(admin: Funcionario) {
    setFuncionarios([admin]);
    setSetupFeito(true);
  }

  // ─── CRUD Aeronaves ─────────────────────────────────────────

  function adicionarAeronave(a: Aeronave) {
    setAeronaves((prev) => [...prev, a]);
  }

  function editarAeronave(a: Aeronave) {
    setAeronaves((prev) => prev.map((x) => x.codigo === a.codigo ? a : x));
  }

  function excluirAeronave(codigo: string) {
    setAeronaves((prev) => prev.filter((x) => x.codigo !== codigo));
  }

  // ─── CRUD Funcionários ──────────────────────────────────────

  function adicionarFuncionario(f: Funcionario) {
    setFuncionarios((prev) => [...prev, f]);
  }

  function editarFuncionario(f: Funcionario) {
    setFuncionarios((prev) => prev.map((x) => x.id === f.id ? f : x));
  }

  function excluirFuncionario(id: string) {
    setFuncionarios((prev) => prev.filter((x) => x.id !== id));
  }

  // ─── CRUD Peças ─────────────────────────────────────────────

  function adicionarPeca(p: Peca) {
    setPecas((prev) => [...prev, p]);
  }

  function editarPeca(p: Peca) {
    setPecas((prev) => prev.map((x) => x.id === p.id ? p : x));
  }

  // ─── CRUD Etapas ────────────────────────────────────────────

  function adicionarEtapa(e: Etapa) {
    setEtapas((prev) => [...prev, e]);
  }

  function editarEtapa(e: Etapa) {
    setEtapas((prev) => prev.map((x) => x.id === e.id ? e : x));
  }

  // ─── CRUD Testes ────────────────────────────────────────────

  function adicionarTeste(t: Teste) {
    setTestes((prev) => [...prev, t]);
  }

  // ─── Helpers de permissão ───────────────────────────────────
  // Funções auxiliares para verificar o nível do usuário logado

  function isAdmin() {
    return usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;
  }

  function isEngenheiro() {
    return (
      usuarioLogado?.nivelPermissao === NivelPermissao.ENGENHEIRO ||
      usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR
    );
  }

  function isOperador() {
    return usuarioLogado !== null;
  }

  return (
    <AppContext.Provider value={{
      usuarioLogado, setUsuarioLogado,
      setupFeito, concluirSetup,
      aeronaves, funcionarios, pecas, etapas, testes,
      adicionarAeronave, editarAeronave, excluirAeronave,
      adicionarFuncionario, editarFuncionario, excluirFuncionario,
      adicionarPeca, editarPeca,
      adicionarEtapa, editarEtapa,
      adicionarTeste,
      isAdmin, isEngenheiro, isOperador,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook personalizado ───────────────────────────────────────
// Atalho para usar o contexto em qualquer componente

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro do AppProvider");
  return context;
}