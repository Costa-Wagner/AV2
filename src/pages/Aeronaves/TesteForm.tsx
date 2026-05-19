// ========================= TesteForm.tsx ===========================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { TipoTeste, ResultadoTeste } from "../../types";
import styles from "./AeronaveForm.module.css";
import type { Teste } from "../../types";

interface TesteFormProps {
  codigoAeronave: string;
  testes: Teste[];
  onFechar: () => void;
}

export default function TesteForm({ codigoAeronave, testes, onFechar }: TesteFormProps) {
  const { adicionarTeste } = useApp();
  const [tipo, setTipo] = useState<TipoTeste>(TipoTeste.ELETRICO);
  const [resultado, setResultado] = useState<ResultadoTeste>(ResultadoTeste.APROVADO);
  const [data, setData] = useState("");
  const [erro, setErro] = useState("");

  function handleSalvar() {
    if (!data) {
      setErro("Data é obrigatória.");
      return;
    }

    const mesmoTipo = testes.filter((t) => t.tipo === tipo);
    const numero = mesmoTipo.length + 1;
    const id = numero > 1 ? `T${Date.now()}_${numero}` : `T${Date.now()}`;

    adicionarTeste({ id, tipo, resultado, codigoAeronave, data });
    onFechar();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>Novo Teste</h3>

        <div className={styles.campo}>
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoTeste)}>
            <option value={TipoTeste.ELETRICO}>Elétrico</option>
            <option value={TipoTeste.HIDRAULICO}>Hidráulico</option>
            <option value={TipoTeste.AERODINAMICO}>Aerodinâmico</option>
          </select>
        </div>
        <div className={styles.campo}>
          <label>Resultado</label>
          <select value={resultado} onChange={(e) => setResultado(e.target.value as ResultadoTeste)}>
            <option value={ResultadoTeste.APROVADO}>Aprovado</option>
            <option value={ResultadoTeste.REPROVADO}>Reprovado</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label>Data do Teste</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
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