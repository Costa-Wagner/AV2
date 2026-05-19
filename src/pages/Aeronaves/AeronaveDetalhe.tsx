// ========================= AeronaveDetalhe.tsx ===========================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { Rota } from "../../App";
import Navbar from "../../components/Navbar/Navbar";
import PecaForm from "./PecaForm";
import EtapaForm from "./EtapaForm";
import TesteForm from "./TesteForm";
import styles from "./AeronaveDetalhe.module.css";
import type { Peca, Etapa } from "../../types";

interface AeronaveDetalheProps {
  navegar: (rota: Rota, params?: Record<string, string>) => void;
  codigo: string;
}

type Aba = "pecas" | "etapas" | "testes" | "relatorio";

export default function AeronaveDetalhe({ navegar, codigo }: AeronaveDetalheProps) {
  const { aeronaves, pecas, etapas, testes, funcionarios, isEngenheiro } = useApp();

  const aeronave = aeronaves.find((a) => a.codigo === codigo);
  const pecasAeronave = pecas.filter((p) => p.codigoAeronave === codigo);
  const etapasAeronave = etapas.filter((e) => e.codigoAeronave === codigo);
  const testesAeronave = testes
    .filter((t) => t.codigoAeronave === codigo)
    .sort((a, b) => a.data.localeCompare(b.data));
  const [abaAtiva, setAbaAtiva] = useState<Aba>("pecas");
  const [pecaFormAberto, setPecaFormAberto] = useState(false);
  const [etapaFormAberto, setEtapaFormAberto] = useState(false);
  const [testeFormAberto, setTesteFormAberto] = useState(false);
  const [pecaEditando, setPecaEditando] = useState<Peca | null>(null);
  const [etapaEditando, setEtapaEditando] = useState<Etapa | null>(null);

  if (!aeronave) {
    return (
      <div>
        <Navbar navegar={navegar} />
        <div className={styles.pagina}>
          <p className={styles.vazio}>Aeronave não encontrada.</p>
        </div>
      </div>
    );
  }

  function nomeFuncionario(id: string) {
    return funcionarios.find((f) => f.id === id)?.nome ?? id;
  }

  return (
    <div>
      <Navbar navegar={navegar} />

      <div className={styles.pagina}>

        {/* ─── Header ─────────────────────────────────────── */}
        <div className={styles.header}>
          <button className={styles.btnVoltar} onClick={() => navegar("aeronaves")}>
            ← Voltar
          </button>
          <div>
            <h2 className={styles.titulo}>{aeronave.modelo}</h2>
            <span className={styles.subtitulo}>{aeronave.codigo} — {aeronave.tipo}</span>
          </div>
        </div>

        {/* ─── Info geral ──────────────────────────────────── */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Cliente</span>
            <span className={styles.infoValor}>{aeronave.cliente}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Capacidade</span>
            <span className={styles.infoValor}>{aeronave.capacidade} pax</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Alcance</span>
            <span className={styles.infoValor}>{aeronave.alcance} km</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Entrega</span>
            <span className={styles.infoValor}>{aeronave.dataEntrega}</span>
          </div>
        </div>

        {/* ─── Abas ────────────────────────────────────────── */}
        <div className={styles.abas}>
          {(["pecas", "etapas", "testes", "relatorio"] as Aba[]).map((aba) => (
            <button
              key={aba}
              className={`${styles.aba} ${abaAtiva === aba ? styles.abaAtiva : ""}`}
              onClick={() => setAbaAtiva(aba)}
            >
              {aba.charAt(0).toUpperCase() + aba.slice(1)}
            </button>
          ))}
        </div>

        {/* ─── Conteúdo das abas ───────────────────────────── */}
        <div className={styles.conteudo}>

          {/* PEÇAS */}
          {abaAtiva === "pecas" && (
            <>
              <div className={styles.abaHeader}>
                <h3>Peças</h3>
                <button className={styles.btnAdicionar} onClick={() => { setPecaEditando(null); setPecaFormAberto(true) }}>
                  + Adicionar Peça
                </button>
              </div>
              {pecaFormAberto && (
                <PecaForm codigoAeronave={codigo} peca={pecaEditando} onFechar={() => { setPecaFormAberto(false); setPecaEditando(null); }} />              )}
              {pecasAeronave.length === 0 ? (
                <p className={styles.vazio}>Nenhuma peça cadastrada.</p>
              ) : (
                <table className={styles.tabela}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Fornecedor</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pecasAeronave.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>{p.tipo}</td>
                        <td>{p.fornecedor}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[`badge${p.status}`]}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <button className={styles.btnAdicionar} style={{ fontSize: 12, padding: "4px 10px" }}
                            onClick={() => { setPecaEditando(p); setPecaFormAberto(true); }}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ETAPAS */}
          {abaAtiva === "etapas" && (
            <>
              <div className={styles.abaHeader}>
                <h3>Etapas</h3>
                {isEngenheiro() && (
                  <button className={styles.btnAdicionar} onClick={() => { setEtapaEditando(null); setEtapaFormAberto(true); }}>
                    + Adicionar Etapa
                  </button>
                )}
              </div>
              {etapaFormAberto && (
                <EtapaForm codigoAeronave={codigo} etapa={etapaEditando} onFechar={() => { setEtapaFormAberto(false); setEtapaEditando(null); }} />
              )}
              {etapasAeronave.length === 0 ? (
                <p className={styles.vazio}>Nenhuma etapa cadastrada.</p>
              ) : (
                <table className={styles.tabela}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Prazo</th>
                      <th>Status</th>
                      <th>Funcionários</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etapasAeronave.map((e) => (
                      <tr key={e.id}>
                        <td>{e.nome}</td>
                        <td>{e.prazo}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[`badge${e.status}`]}`}>
                            {e.status}
                          </span>
                        </td>
                        <td>{e.funcionariosAssociados.map(nomeFuncionario).join(", ") || "—"}</td>
                        <td>
                          <button className={styles.btnAdicionar} style={{ fontSize: 12, padding: "4px 10px" }}
                            onClick={() => { setEtapaEditando(e); setEtapaFormAberto(true); }}>
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* TESTES */}
          {abaAtiva === "testes" && (
            <>
              <div className={styles.abaHeader}>
                <h3>Testes</h3>
                {isEngenheiro() && (
                  <button className={styles.btnAdicionar} onClick={() => setTesteFormAberto(true)}>
                    + Adicionar Teste
                  </button>
                )}
              </div>
              {testeFormAberto && (
                <TesteForm codigoAeronave={codigo} testes={testesAeronave} onFechar={() => setTesteFormAberto(false)} />
              )}
              {testesAeronave.length === 0 ? (
                <p className={styles.vazio}>Nenhum teste cadastrado.</p>
              ) : (
                <table className={styles.tabela}>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Data</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testesAeronave.map((t) => {
                      const mesmotipo = testesAeronave.filter((x) => x.tipo === t.tipo);
                      const numero = mesmotipo.findIndex((x) => x.id === t.id) + 1;
                      const label = mesmotipo.length > 1 ? `Teste ${numero} — ${t.tipo}` : t.tipo;
                      return (
                        <tr key={t.id}>
                          <td>{label}</td>
                          <td>{t.data}</td>
                          <td>
                          <span className={`${styles.badge} ${styles[`badge${t.resultado}`]}`}>
                            {t.resultado}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* RELATÓRIO */}
          {abaAtiva === "relatorio" && (
            <div className={styles.relatorio}>
              <div className={styles.relatorioSecao}>
                <h4>Aeronave</h4>
                <div className={styles.relatorioLinha}><span className={styles.relatorioLabel}>Código:</span>{aeronave.codigo}</div>
                <div className={styles.relatorioLinha}><span className={styles.relatorioLabel}>Modelo:</span>{aeronave.modelo}</div>
                <div className={styles.relatorioLinha}><span className={styles.relatorioLabel}>Tipo:</span>{aeronave.tipo}</div>
                <div className={styles.relatorioLinha}><span className={styles.relatorioLabel}>Cliente:</span>{aeronave.cliente}</div>
                <div className={styles.relatorioLinha}><span className={styles.relatorioLabel}>Entrega:</span>{aeronave.dataEntrega}</div>
              </div>
              <div className={styles.relatorioSecao}>
                <h4>Peças ({pecasAeronave.length})</h4>
                {pecasAeronave.map((p) => (
                  <div key={p.id} className={styles.relatorioLinha}>
                    <span className={styles.relatorioLabel}>{p.nome}</span>{p.tipo} — {p.fornecedor} — {p.status}
                  </div>
                ))}
              </div>
              <div className={styles.relatorioSecao}>
                <h4>Etapas ({etapasAeronave.length})</h4>
                {etapasAeronave.map((e) => (
                  <div key={e.id} className={styles.relatorioLinha}>
                    <span className={styles.relatorioLabel}>{e.nome}</span>{e.status} — Prazo: {e.prazo} — Funcionários: {e.funcionariosAssociados.map(nomeFuncionario).join(", ") || "—"}
                  </div>
                ))}
              </div>
              <div className={styles.relatorioSecao}>
                <h4>Testes ({testesAeronave.length})</h4>
                {testesAeronave.map((t) => (
                  <div key={t.id} className={styles.relatorioLinha}>
                    <span className={styles.relatorioLabel}>{t.tipo}</span>{t.resultado}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}