// ========================= AeronaveForm.tsx ===========================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Aeronave } from "../../types";
import { TipoAeronave } from "../../types";
import styles from "./AeronaveForm.module.css";

interface AeronaveFormProps {
  aeronave: Aeronave | null;
  onFechar: () => void;
}

export default function AeronaveForm({ aeronave, onFechar }: AeronaveFormProps) {
  const { adicionarAeronave, editarAeronave, aeronaves } = useApp();

  const proximoCodigo = aeronave?.codigo ?? (() => {
    const numeros = aeronaves
      .map((a) => parseInt(a.codigo.replace("AE-", "")))
      .filter((n) => !isNaN(n));
    const proximo = numeros.length > 0 ? Math.max(...numeros) + 1 : 1;
    return `AE-${String(proximo).padStart(3, "0")}`;
  })();

  const [codigo] = useState(proximoCodigo);
  const [modelo, setModelo] = useState(aeronave?.modelo ?? "");
  const [tipo, setTipo] = useState<TipoAeronave>(aeronave?.tipo ?? TipoAeronave.COMERCIAL);
  const [capacidade, setCapacidade] = useState(aeronave?.capacidade?.toString() ?? "");
  const [alcance, setAlcance] = useState(aeronave?.alcance?.toString() ?? "");
  const [cliente, setCliente] = useState(aeronave?.cliente ?? "");
  const [dataEntrega, setDataEntrega] = useState(aeronave?.dataEntrega ?? "");
  const [erro, setErro] = useState("");

  function handleSalvar() {
    if (!codigo || !modelo || !cliente || !dataEntrega || !capacidade || !alcance) {
      setErro("Preencha todos os campos.");
      return;
    }

    const codigoJaExiste = aeronaves.some(
      (a) => a.codigo === codigo && a.codigo !== aeronave?.codigo
    );
    if (codigoJaExiste) {
      setErro("Código de aeronave já cadastrado.");
      return;
    }

    const a: Aeronave = {
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade),
      alcance: Number(alcance),
      cliente,
      dataEntrega,
    };

    if (aeronave) {
      editarAeronave(a);
    } else {
      adicionarAeronave(a);
    }

    onFechar();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>
          {aeronave ? "Editar Aeronave" : "Nova Aeronave"}
        </h3>

        <div className={styles.campo}>
          <label>Código</label>
          <input value={codigo} disabled />
        </div>
        <div className={styles.campo}>
          <label>Modelo</label>
          <input value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoAeronave)}>
            <option value={TipoAeronave.COMERCIAL}>Comercial</option>
            <option value={TipoAeronave.MILITAR}>Militar</option>
          </select>
        </div>
        <div className={styles.campo}>
          <label>Capacidade</label>
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="Número de passageiros"
          />
        </div>
        <div className={styles.campo}>
          <label>Alcance (km)</label>
          <input
            type="number"
            value={alcance}
            onChange={(e) => setAlcance(e.target.value)}
            placeholder="Alcance em km"
          />
        </div>
        <div className={styles.campo}>
          <label>Cliente</label>
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Data de Entrega</label>
          <input
            type="date"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
          />
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