// =============================== index.ts =============================== 

// ─── Enums ───────────────────────────────────────────

export const TipoAeronave = { COMERCIAL: "COMERCIAL", MILITAR: "MILITAR" } as const;
export type TipoAeronave = typeof TipoAeronave[keyof typeof TipoAeronave];

export const TipoPeca = { NACIONAL: "NACIONAL", IMPORTADA: "IMPORTADA" } as const;
export type TipoPeca = typeof TipoPeca[keyof typeof TipoPeca];

export const StatusPeca = { EM_PRODUCAO: "EM_PRODUCAO", EM_TRANSPORTE: "EM_TRANSPORTE", PRONTA: "PRONTA" } as const;
export type StatusPeca = typeof StatusPeca[keyof typeof StatusPeca];

export const StatusEtapa = { PENDENTE: "PENDENTE", ANDAMENTO: "ANDAMENTO", CONCLUIDA: "CONCLUIDA" } as const;
export type StatusEtapa = typeof StatusEtapa[keyof typeof StatusEtapa];

export const NivelPermissao = { OPERADOR: "OPERADOR", ENGENHEIRO: "ENGENHEIRO", ADMINISTRADOR: "ADMINISTRADOR" } as const;
export type NivelPermissao = typeof NivelPermissao[keyof typeof NivelPermissao];

export const TipoTeste = { ELETRICO: "ELETRICO", HIDRAULICO: "HIDRAULICO", AERODINAMICO: "AERODINAMICO" } as const;
export type TipoTeste = typeof TipoTeste[keyof typeof TipoTeste];

export const ResultadoTeste = { APROVADO: "APROVADO", REPROVADO: "REPROVADO" } as const;
export type ResultadoTeste = typeof ResultadoTeste[keyof typeof ResultadoTeste];

// ─── Interfaces ──────────────────────────────────────

export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  username: string;
  senha: string;
  nivelPermissao: NivelPermissao;
}

export interface Peca {
  id: string;
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
  codigoAeronave: string;
}

export interface Teste {
  id: string;
  tipo: TipoTeste;
  resultado: ResultadoTeste;
  codigoAeronave: string;
  data: string;
}

export interface Etapa {
  id: string;
  nome: string;
  prazo: string;
  status: StatusEtapa;
  funcionariosAssociados: string[]; // array de Funcionario.id
  codigoAeronave: string;
}

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  cliente: string;
  dataEntrega: string;
}