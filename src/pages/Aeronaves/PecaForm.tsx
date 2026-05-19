// ========================= PecaForm.tsx ===========================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { TipoPeca, StatusPeca } from "../../types";
import styles from "./AeronaveForm.module.css";
import type { Peca } from "../../types";

interface PecaFormProps {
  codigoAeronave: string;
  peca?: Peca | null;
  onFechar: () => void;
}

export default function PecaForm({ codigoAeronave, peca, onFechar }: PecaFormProps) {
  const { adicionarPeca, editarPeca } = useApp();
  const [nome, setNome] = useState(peca?.nome ?? "");
  const [tipo, setTipo] = useState<TipoPeca>(peca?.tipo ?? TipoPeca.NACIONAL);
  const [fornecedor, setFornecedor] = useState(peca?.fornecedor ?? "");
  const [status, setStatus] = useState<StatusPeca>(peca?.status ?? StatusPeca.EM_PRODUCAO);
  const [erro, setErro] = useState("");

  function handleSalvar() {
    if (!nome || !fornecedor) {
      setErro("Nome e fornecedor são obrigatórios.");
      return;
    }

    if (peca) {
      editarPeca({ ...peca, nome, tipo, fornecedor, status });
    } else {
      adicionarPeca({ 
        id: `P${Date.now()}`,
        nome, tipo, fornecedor, status,
        codigoAeronave
      });
    }

    onFechar();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>{peca ? "Editar Peça" : "Nova Peça"}</h3>


        <div className={styles.campo}>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoPeca)}>
            <option value={TipoPeca.NACIONAL}>Nacional</option>
            <option value={TipoPeca.IMPORTADA}>Importada</option>
          </select>
        </div>
        <div className={styles.campo}>
          <label>Fornecedor</label>
          <input value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusPeca)}>
            <option value={StatusPeca.EM_PRODUCAO}>Em Produção</option>
            <option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</option>
            <option value={StatusPeca.PRONTA}>Pronta</option>
          </select>
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