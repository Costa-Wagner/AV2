// ========================= FuncionarioForm.tsx ===========================
// Formulário de cadastro e edição de funcionário
// =========================================================================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Funcionario } from "../../types";
import { NivelPermissao } from "../../types";
import styles from "./FuncionarioForm.module.css";

interface FuncionarioFormProps {
  funcionario: Funcionario | null;
  onFechar: () => void;
}

export default function FuncionarioForm({ funcionario, onFechar }: FuncionarioFormProps) {
  const { adicionarFuncionario, editarFuncionario, funcionarios } = useApp();

  const [nome, setNome] = useState(funcionario?.nome ?? "");
  const [username, setUsername] = useState(funcionario?.username ?? "");
  const [senha, setSenha] = useState(funcionario?.senha ?? "");
  const [telefone, setTelefone] = useState(funcionario?.telefone ?? "");
  const [endereco, setEndereco] = useState(funcionario?.endereco ?? "");
  const [nivel, setNivel] = useState<NivelPermissao>(funcionario?.nivelPermissao ?? NivelPermissao.OPERADOR);
  const [erro, setErro] = useState("");

  function handleSalvar() {
    if (!nome || !username || !senha) {
      setErro("Nome, usuário e senha são obrigatórios.");
      return;
    }

    const usernameJaExiste = funcionarios.some(
      (f) => f.username === username && f.id !== funcionario?.id
    );
    if (usernameJaExiste) {
      setErro("Nome de usuário já cadastrado.");
      return;
    }

    const f: Funcionario = {
      id: funcionario?.id ?? `F${Date.now()}`,
      nome, username, senha, telefone, endereco,
      nivelPermissao: nivel,
    };

    if (funcionario) {
      editarFuncionario(f);
    } else {
      adicionarFuncionario(f);
    }

    onFechar();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>
          {funcionario ? "Editar Funcionário" : "Novo Funcionário"}
        </h3>

        <div className={styles.campo}>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Usuário</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Telefone</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Endereço</label>
          <input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label>Nível de Permissão</label>
          <select value={nivel} onChange={(e) => setNivel(e.target.value as NivelPermissao)}>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
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