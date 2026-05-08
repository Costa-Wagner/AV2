// =========================== Aeronaves.tsx ============================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import type { Aeronave } from "../../types";
import { TipoAeronave } from "../../types";
import Navbar from "../../components/Navbar/Navbar";
import AeronaveForm from "./AeronaveForm";
import styles from "./Aeronaves.module.css";

interface AeronavesProps {
  navegar: (rota: Rota, params?: Record<string, string>) => void;
}

export default function Aeronaves({ navegar }: AeronavesProps) {
  const { aeronaves, excluirAeronave, isAdmin } = useApp();

  const [formAberto, setFormAberto] = useState(false);
  const [aeronaveEditando, setAeronaveEditando] = useState<Aeronave | null>(null);
  const [filtro, setFiltro] = useState("");

  // ─── Métricas ───────────────────────────────────────────
  const total = aeronaves.length;
  const comerciais = aeronaves.filter((a) => a.tipo === TipoAeronave.COMERCIAL).length;
  const militares = aeronaves.filter((a) => a.tipo === TipoAeronave.MILITAR).length;

  // ─── Filtro ─────────────────────────────────────────────
  const aeronavesFiltradas = aeronaves.filter((a) =>
    a.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
    a.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
    a.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    a.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  function abrirCadastro() {
    setAeronaveEditando(null);
    setFormAberto(true);
  }

  function abrirEdicao(a: Aeronave) {
    setAeronaveEditando(a);
    setFormAberto(true);
  }

  function fecharForm() {
    setFormAberto(false);
    setAeronaveEditando(null);
  }

  function handleExcluir(codigo: string) {
    if (confirm("Deseja excluir esta aeronave?")) {
      excluirAeronave(codigo);
    }
  }

  return (
    <div>
      <Navbar navegar={navegar} />

      <div className={styles.pagina}>

        {/* ─── Header ─────────────────────────────────────── */}
        <div className={styles.header}>
          <h2 className={styles.titulo}>Aeronaves</h2>
          <div className={styles.metricas}>
            <div className={styles.card}>
              <span className={styles.valor}>{total}</span>
              <span className={styles.rotulo}>total</span>
            </div>
            <div className={styles.card}>
              <span className={styles.valor}>{comerciais}</span>
              <span className={styles.rotulo}>comercial</span>
            </div>
            <div className={styles.card}>
              <span className={styles.valor}>{militares}</span>
              <span className={styles.rotulo}>militar</span>
            </div>
          </div>
          <div className={styles.acoesTopo}>
            <input
              className={styles.filtro}
              placeholder="Buscar por código, modelo, cliente ou tipo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            {isAdmin() && (
              <button className={styles.btnNovo} onClick={abrirCadastro}>
                + Nova Aeronave
              </button>
            )}
          </div>
        </div>

        {formAberto && (
          <AeronaveForm
            aeronave={aeronaveEditando}
            onFechar={fecharForm}
          />
        )}

        {/* ─── Tabela ──────────────────────────────────────── */}
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Entrega</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aeronavesFiltradas.map((a) => (
              <tr key={a.codigo}>
                <td>{a.codigo}</td>
                <td>{a.modelo}</td>
                <td>
                  <span className={`${styles.tipo} ${styles[`tipo${a.tipo}`]}`}>
                    {a.tipo}
                  </span>
                </td>
                <td>{a.cliente}</td>
                <td>{a.dataEntrega}</td>
                <td>
                  <div className={styles.acoes}>
                    <button
                      className={styles.btnDetalhar}
                      onClick={() => navegar("aeronaves-detalhar", { codigo: a.codigo })}
                    >
                      Detalhar
                    </button>
                    {isAdmin() && (
                      <>
                        <button className={styles.btnEditar} onClick={() => abrirEdicao(a)}>
                          Editar
                        </button>
                        <button className={styles.btnExcluir} onClick={() => handleExcluir(a.codigo)}>
                          Excluir
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}