// ========================= EtapaForm.tsx ===========================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { StatusEtapa, NivelPermissao } from "../../types";
import styles from "./AeronaveForm.module.css";
import type { Etapa } from "../../types";

interface EtapaFormProps {
  codigoAeronave: string;
  etapa?: Etapa | null;
  onFechar: () => void;
}

export default function EtapaForm({ codigoAeronave, etapa, onFechar }: EtapaFormProps) {
  const { adicionarEtapa, editarEtapa, funcionarios, etapas } = useApp();
  const [nome, setNome] = useState(etapa?.nome ?? "");
  const [prazo, setPrazo] = useState(etapa?.prazo ?? "");
  const [status, setStatus] = useState<StatusEtapa>(etapa?.status ?? StatusEtapa.PENDENTE);
  const [nivelFiltro, setNivelFiltro] = useState<string>(NivelPermissao.OPERADOR);
  const [selecionados, setSelecionados] = useState<string[]>(etapa?.funcionariosAssociados ?? []);
  const [erro, setErro] = useState("");

  // ─── Filtra funcionários por nível selecionado ───────────
  const funcionariosFiltrados = funcionarios.filter((f) => f.nivelPermissao === nivelFiltro);


  // ─── Regra de ordem lógica ───────────────────────────────
  // Só pode criar etapa em ANDAMENTO se a última etapa estiver CONCLUIDA
  const etapasAeronave = etapas.filter((e) => e.codigoAeronave === codigoAeronave && e.id !== etapa?.id);
  const ultimaEtapa = etapasAeronave[etapasAeronave.length - 1];

  function validarOrdem(novoStatus: StatusEtapa): string {
    if (novoStatus === StatusEtapa.ANDAMENTO && ultimaEtapa && ultimaEtapa.status !== StatusEtapa.CONCLUIDA) {
      return `A etapa "${ultimaEtapa.nome}" precisa estar CONCLUÍDA antes de iniciar uma nova.`;
    }
    return "";
  }

  function handleSalvar() {
    if (!nome || !prazo) {
      setErro("Nome e prazo são obrigatórios.");
      return;
    }

    const erroOrdem = validarOrdem(status);
    if (erroOrdem) {
      setErro(erroOrdem);
      return;
    }

    if (etapa) {
      editarEtapa({ ...etapa, nome, prazo, status, funcionariosAssociados: selecionados });
    } else {
      adicionarEtapa({
        id: `ET${Date.now()}`,
        nome, prazo, status,
        funcionariosAssociados: selecionados,
        codigoAeronave,
      });
    }

    onFechar();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>{etapa ? "Editar Etapa" : "Nova Etapa"}</h3>

        <div className={styles.campo}>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Prazo</label>
          <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusEtapa)}>
            <option value={StatusEtapa.PENDENTE}>Pendente</option>
            <option value={StatusEtapa.ANDAMENTO}>Andamento</option>
            <option value={StatusEtapa.CONCLUIDA}>Concluída</option>
          </select>
        </div>

        {/* ─── Filtro por nível ────────────────────────── */}
        <div className={styles.campo}>
          <label>Filtrar funcionários por nível</label>
          <select value={nivelFiltro} onChange={(e) => setNivelFiltro(e.target.value)}>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
          </select>
        </div>

        {/* ─── Lista de funcionários filtrados ─────────── */}
        <div className={styles.campo}>
          <label>Funcionários Associados</label>
          {funcionariosFiltrados.length === 0 ? (
            <span style={{ fontSize: 13, color: "#7aafd4" }}>Nenhum funcionário neste nível.</span>
          ) : (
            <select
              multiple
              value={selecionados}
              onChange={(e) => setSelecionados(Array.from(e.target.selectedOptions, (o) => o.value))}
              style={{ height: 100 }}
            >
              {funcionariosFiltrados.map((f) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          )}
          <span style={{ fontSize: 11, color: "#7aafd4" }}>Segure Ctrl para selecionar mais de um.</span>
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.botoes}>
          <button className={styles.btnCancelar} onClick={onFechar}>Cancelar</button>
          <button className={styles.btnSalvar} onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}