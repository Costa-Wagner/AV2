// ================================ Navbar.tsx ================================ 
// Barra de navegação principal
// Exibe logo, links e usuário logado
// ============================================================================

import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import styles from "./Navbar.module.css";
import logo from "../../assets/Logo.png";

// ─── Props ───────────────────────────────────────────────────

interface NavbarProps {
  navegar: (rota: Rota) => void;
}

// ─── Componente ──────────────────────────────────────────────

export default function Navbar({ navegar }: NavbarProps) {
  const { usuarioLogado, setUsuarioLogado, isAdmin } = useApp();

  function logout() {
    setUsuarioLogado(null);
    navegar("login");
  }

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <img
        src={logo}
        alt="Aerocode"
        className={styles.logo}
        onClick={() => navegar("dashboard")}
      />

      {/* Links de navegação */}
      <div className={styles.links}>
        <button onClick={() => navegar("dashboard")}>Dashboard</button>
        <button onClick={() => navegar("aeronaves")}>Aeronaves</button>
        {isAdmin() && (
          <button onClick={() => navegar("funcionarios")}>Funcionários</button>
        )}
      </div>

      {/* Usuário logado */}
      <div className={styles.usuario}>
        <span>{usuarioLogado?.nome}</span>
        <small>{usuarioLogado?.nivelPermissao}</small>
        <button onClick={logout}>Sair</button>
      </div>
    </nav>
  );
}