// =============================== Setup.tsx ===============================
// Tela de primeiro acesso ao sistema
// Exibida apenas uma vez para criar o Administrador
// ==========================================================================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Funcionario } from "../../types";
import { NivelPermissao } from "../../types";
import type { Rota } from "../../App";
import styles from "./Setup.module.css";
import logo from "../../assets/Logo.png";

// ─── Props ───────────────────────────────────────────────────

interface SetupProps {
  navegar: (rota: Rota) => void;
}

// ─── Componente ──────────────────────────────────────────────

export default function Setup({ navegar }: SetupProps) {
  const { concluirSetup } = useApp();

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit() {
    // ─── Validação básica ───────────────────────────────────
    if (!nome || !username || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    // ─── Cria o administrador inicial ───────────────────────
    const admin: Funcionario = {
      id: "F001",
      nome,
      username,
      senha,
      telefone: "",
      endereco: "",
      nivelPermissao: NivelPermissao.ADMINISTRADOR,
    };

    concluirSetup(admin);
    navegar("login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Aerocode" className={styles.logo} />
        <h2>Primeiro Acesso ao Sistema</h2>
        <p>Crie o perfil de Administrador para continuar.</p>

        <div className={styles.campo}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
          />
        </div>

        <div className={styles.campo}>
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
          />
        </div>

        <div className={styles.campo}>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        <button onClick={handleSubmit}>Criar Administrador</button>
      </div>
    </div>
  );
}