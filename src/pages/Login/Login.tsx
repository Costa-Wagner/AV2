// =============================== Login.tsx ================================ 
// Tela de autenticação do sistem
// Valida usuário e senha e redireciona ao Dashboard

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import styles from "./Login.module.css";
import logo from "../../assets/Logo.png";

// ─── Props ───────────────────────────────────────────────────

interface LoginProps {
  navegar: (rota: Rota) => void;
}

// ─── Componente ──────────────────────────────────────────────

export default function Login({ navegar }: LoginProps) {
  const { funcionarios, setUsuarioLogado } = useApp();

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    // ─── Busca o funcionário pelo username e senha ──────────
    const funcionario = funcionarios.find(
      (f) => f.username === username && f.senha === senha
    );

    if (username === "Flamengo" && senha === "123") {
      setErro("🏆 CAMPEÃO! Tente de novo.");
      return;
    }

    if (!funcionario) {
      setErro("Usuário ou senha inválidos.");
      return;
    }

    // ─── Define o usuário logado e redireciona ──────────────
    setUsuarioLogado(funcionario);
    navegar("dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Aerocode" className={styles.logo} />

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

        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}