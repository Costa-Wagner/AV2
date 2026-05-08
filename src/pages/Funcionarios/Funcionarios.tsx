// =========================== Funcionarios.tsx ============================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import type { Funcionario } from "../../types";
import { NivelPermissao } from "../../types";
import Navbar from "../../components/Navbar/Navbar";
import FuncionarioForm from "./FuncionarioForm";
import styles from "./Funcionarios.module.css";

interface FuncionariosProps {
  navegar: (rota: Rota) => void;
}

export default function Funcionarios({ navegar }: FuncionariosProps) {
  const { funcionarios, excluirFuncionario } = useApp();

  const [formAberto, setFormAberto] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState<Funcionario | null>(null);
  const [filtro, setFiltro] = useState("");

  // ─── Métricas ───────────────────────────────────────────
  const total = funcionarios.length;
  const operadores = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.OPERADOR).length;
  const engenheiros = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.ENGENHEIRO).length;
  const administradores = funcionarios.filter((f) => f.nivelPermissao === NivelPermissao.ADMINISTRADOR).length;

  // ─── Filtro ─────────────────────────────────────────────
  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    f.username.toLowerCase().includes(filtro.toLowerCase()) ||
    f.nivelPermissao.toLowerCase().includes(filtro.toLowerCase())
  );

  function abrirCadastro() {
    setFuncionarioEditando(null);
    setFormAberto(true);
  }

  function abrirEdicao(f: Funcionario) {
    setFuncionarioEditando(f);
    setFormAberto(true);
  }

  function fecharForm() {
    setFormAberto(false);
    setFuncionarioEditando(null);
  }

  function handleExcluir(id: string) {
    if (confirm("Deseja excluir este funcionário?")) {
      excluirFuncionario(id);
    }
  }

  return (
    <div>
      <Navbar navegar={navegar} />

      <div className={styles.pagina}>

        {/* ─── Header ─────────────────────────────────────── */}
        <div className={styles.header}>
            <h2 className={styles.titulo}>Funcionários</h2>
            <div className={styles.metricas}>
                <div className={styles.card}>
                    <span className={styles.valor}>{total}</span>
                    <span className={styles.rotulo}>total</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.valor}>{operadores}</span>
                    <span className={styles.rotulo}>operador</span>
                </div>
                    <div className={styles.card}>
                    <span className={styles.valor}>{engenheiros}</span>
                    <span className={styles.rotulo}>engenheiro</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.valor}>{administradores}</span>
                    <span className={styles.rotulo}>administrador</span>
                </div>
            </div>
            <div className={styles.acoesTopo}>
                <input
                    className={styles.filtro}
                    placeholder="Buscar por nome, usuário ou nível..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <button className={styles.btnNovo} onClick={abrirCadastro}>
                    + Novo Funcionário
                </button>
            </div>
        </div>

        {formAberto && (
        <FuncionarioForm
            funcionario={funcionarioEditando}
            onFechar={fecharForm}
        />
        )}

        {/* ─── Tabela ──────────────────────────────────── */}
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Nível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.map((f) => (
              <tr key={f.id}>
                <td>{f.nome}</td>
                <td>{f.username}</td>
                <td>{f.telefone || "—"}</td>
                <td>
                  <span className={`${styles.nivel} ${styles[`nivel${f.nivelPermissao}`]}`}>
                    {f.nivelPermissao}
                  </span>
                </td>
                <td>
                  <div className={styles.acoes}>
                    <button className={styles.btnEditar} onClick={() => abrirEdicao(f)}>
                      Editar
                    </button>
                    <button className={styles.btnExcluir} onClick={() => handleExcluir(f.id)}>
                      Excluir
                    </button>
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