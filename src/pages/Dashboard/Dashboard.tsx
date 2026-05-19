// ============================= Dashboard.tsx ==============================
// Painel principal do sistema
// Exibe métricas de aeronaves e funcionários
// ==========================================================================

import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.css";
import { TipoAeronave, NivelPermissao } from "../../types";

// ─── Props ───────────────────────────────────────────────────

interface DashboardProps {
  navegar: (rota: Rota) => void;
}

// ─── Componente ──────────────────────────────────────────────

export default function Dashboard({ navegar }: DashboardProps) {
  const { aeronaves, funcionarios, isAdmin } = useApp();

  // ─── Métricas de aeronaves ──────────────────────────────
  const totalAeronaves = aeronaves.length;
  const comerciais = aeronaves.filter((a) => a.tipo === TipoAeronave.COMERCIAL).length;
  const militares = aeronaves.filter((a) => a.tipo === TipoAeronave.MILITAR).length;

  // ─── Métricas de funcionários (só Admin) ────────────────
  const totalFuncionarios = funcionarios.length;
  const operadores = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.OPERADOR).length;
  const engenheiros = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.ENGENHEIRO).length;
  const administradores = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.ADMINISTRADOR).length;

  return (
    <div>
      <Navbar navegar={navegar} />

      <div className={styles.pagina}>
        {/* ─── Seção Aeronaves ─────────────────────────── */}
        <section className={styles.secao}>
          <h2 className={styles.tituloSecao}>Aeronaves</h2>
          <div className={styles.cards}>
            <div
              className={styles.card}
              onClick={() => navegar("aeronaves")}
            >
              <span className={styles.valor}>{totalAeronaves}</span>
              <span className={styles.rotulo}>total</span>
            </div>
            <div
              className={styles.card}
              onClick={() => navegar("aeronaves")}
            >
              <span className={styles.valor}>{comerciais}</span>
              <span className={styles.rotulo}>comercial</span>
            </div>
            <div
              className={styles.card}
              onClick={() => navegar("aeronaves")}
            >
              <span className={styles.valor}>{militares}</span>
              <span className={styles.rotulo}>militar</span>
            </div>
          </div>
        </section>

        {/* ─── Seção Funcionários (só Admin) ───────────── */}
        {isAdmin() && (
          <section className={styles.secao}>
            <h2 className={styles.tituloSecao}>Funcionários</h2>
            <div className={styles.cards}>
              <div
                className={styles.card}
                onClick={() => navegar("funcionarios")}
              >
                <span className={styles.valor}>{totalFuncionarios}</span>
                <span className={styles.rotulo}>total</span>
              </div>
              <div
                className={styles.card}
                onClick={() => navegar("funcionarios")}
              >
                <span className={styles.valor}>{operadores}</span>
                <span className={styles.rotulo}>operador</span>
              </div>
              <div
                className={styles.card}
                onClick={() => navegar("funcionarios")}
              >
                <span className={styles.valor}>{engenheiros}</span>
                <span className={styles.rotulo}>engenheiro</span>
              </div>
              <div
                className={styles.card}
                onClick={() => navegar("funcionarios")}
              >
                <span className={styles.valor}>{administradores}</span>
                <span className={styles.rotulo}>administrador</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}