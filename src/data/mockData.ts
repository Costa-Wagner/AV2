// =============================== mockData.ts ============================== 
// Dados iniciais do sistema (substitui o banco de dados)
// Aqui ficam os registros padrão carregados na aplicação
// ==========================================================================

import type { 
  Aeronave,
  Peca, Etapa, Teste
} from "../types";

import {
  TipoAeronave, TipoPeca,
  StatusPeca, StatusEtapa, TipoTeste, ResultadoTeste
} from "../types";

// ─── Aeronaves iniciais ───────────────────────────────────────
// Exemplos de aeronaves para demonstração do sistema

export const aeronavesIniciais: Aeronave[] = [
  {
    codigo: "AE-001",
    modelo: "Boeing 737 MAX",
    tipo: TipoAeronave.COMERCIAL,
    capacidade: 189,
    alcance: 6570,
    cliente: "Boeing",
    dataEntrega: "2026-12-31",
  },
  {
    codigo: "AE-002",
    modelo: "F-39 Gripen",
    tipo: TipoAeronave.MILITAR,
    capacidade: 1,
    alcance: 3200,
    cliente: "FAB",
    dataEntrega: "2027-06-30",
  },
];

// ─── Peças iniciais ───────────────────────────────────────────

export const pecasIniciais: Peca[] = [
  {
    id: "P001",
    nome: "Motor CFM56",
    tipo: TipoPeca.IMPORTADA,
    fornecedor: "CFM International",
    status: StatusPeca.EM_PRODUCAO,
    codigoAeronave: "AE-001",
  },
];

// ─── Etapas iniciais ─────────────────────────────────────────

export const etapasIniciais: Etapa[] = [
  {
    id: "ET001",
    nome: "Estrutura da Fuselagem",
    prazo: "2026-06-30",
    status: StatusEtapa.ANDAMENTO,
    funcionariosAssociados: ["F001"],
    codigoAeronave: "AE-001",
  },
];

// ─── Testes iniciais ─────────────────────────────────────────

export const testesIniciais: Teste[] = [
  {
    id: "T001",
    tipo: TipoTeste.ELETRICO,
    resultado: ResultadoTeste.APROVADO,
    codigoAeronave: "AE-001",
    data: "2026-01-15",
  },
];