# 📚 DSM - Desenvolvimento de Software Multiplataforma – FATEC/SJC

AV2 – Avaliação Individual desenvolvida para fins acadêmicos na disciplina **Técnicas de Programação I – DSM FATEC/SJC**.

# ✈️ Aerocode GUI — Sistema de Gestão de Produção de Aeronaves

Interface gráfica web do sistema Aerocode, desenvolvida como SPA (Single Page Application) em React + TypeScript. Evolução do CLI da AV1, mantendo todas as entidades, regras de negócio e níveis de permissão, agora em interface web navegável.

A **Aerocode GUI** simula o ambiente de uma empresa aeronáutica — inspirada em casos reais como a **Embraer** — permitindo o controle de aeronaves, peças, etapas de produção, testes, funcionários e geração de relatórios através de uma interface visual moderna.

## 📋 Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## ⚙️ Instalação

```bash
cd aerocode-gui
npm install
```

## 🚀 Como executar

```bash
npm run dev
```

Acesse em: `http://localhost:5173`

## 🔑 Primeiro acesso

Na primeira execução, o sistema exibe a tela de **Setup Inicial** para criação do perfil Administrador. Após o cadastro, essa tela não é exibida novamente.

## 🗂 Estrutura do projeto

```bash
aerocode-gui/
├── src/
│   ├── assets/          # logo e imagens
│   ├── components/
│   │   └── Navbar/      # barra de navegação
│   ├── context/
│   │   └── AppContext.tsx  # estado global e CRUD
│   ├── data/
│   │   └── mockData.ts    # dados iniciais (substitui back-end)
│   ├── pages/
│   │   ├── Setup/         # primeiro acesso
│   │   ├── Login/         # autenticação
│   │   ├── Dashboard/     # painel principal
│   │   ├── Aeronaves/     # gestão de aeronaves, peças, etapas, testes e relatório
│   │   └── Funcionarios/  # gestão de funcionários
│   ├── types/
│   │   └── index.ts       # interfaces e enums
│   ├── App.tsx            # roteador interno
│   └── main.tsx           # ponto de entrada
├── doc/                   # relatório PDF da Etapa 1
├── imagens/               # wireframes exportados
├── package.json
├── tsconfig.json
└── README.md
```

## 🖥 Fluxo de navegação

```bash
Setup Inicial (primeiro acesso)
     ↓
Tela de Login
     ↓
Dashboard (métricas gerais)
     ↓
├── Gerenciar AERONAVES
│     ├── LISTAR aeronaves
│     ├── CADASTRAR aeronave        (Admin)
│     ├── EDITAR aeronave           (Admin)
│     ├── EXCLUIR aeronave          (Admin)
│     └── DETALHAR aeronave
│           ├── Aba PEÇAS           → adicionar / editar
│           ├── Aba ETAPAS          → adicionar / editar (Engenheiro+)
│           ├── Aba TESTES          → adicionar (Engenheiro+)
│           └── Aba RELATÓRIO       → visualizar (Engenheiro+)
│
└── Gerenciar FUNCIONÁRIOS          (Admin)
      ├── LISTAR funcionários
      ├── CADASTRAR funcionário
      ├── EDITAR funcionário
      └── EXCLUIR funcionário
```

## 🔐 Níveis de acesso

```bash
| Funcionalidade              | Operador | Engenheiro | Administrador |
|-----------------------------|----------|------------|---------------|
| Listar aeronaves            |    X     |     X      |       X       |
| Detalhar aeronave           |    X     |     X      |       X       |
| Adicionar peça              |    X     |     X      |       X       |
| Editar peça                 |    X     |     X      |       X       |
| Adicionar etapa             |    -     |     X      |       X       |
| Editar etapa                |    -     |     X      |       X       |
| Adicionar teste             |    -     |     X      |       X       |
| Gerar relatório             |    -     |     X      |       X       |
| Cadastrar/Editar aeronave   |    -     |     -      |       X       |
| Excluir aeronave            |    -     |     -      |       X       |
| Gerenciar funcionários      |    -     |     -      |       X       |
```

## 📐 Regras de negócio

- Código de aeronave é único e gerado automaticamente (AE-001, AE-002...)
- Etapas seguem ordem lógica — nova etapa só pode iniciar em ANDAMENTO se a anterior estiver CONCLUÍDA
- Funcionários podem ser associados a etapas, filtrados por nível de permissão
- Testes do mesmo tipo são numerados sequencialmente (Teste 1 — ELÉTRICO, Teste 2 — ELÉTRICO...)
- Relatório consolidado disponível por aeronave (Engenheiro ou Administrador)
- Setup inicial executado apenas uma vez na primeira execução

## 🎯 Conceitos aplicados

- React 18 com Hooks (useState, useContext)
- TypeScript com tipagem estática
- SPA — Single Page Application sem React Router
- CSS Modules para estilização isolada por componente
- Context API para gerenciamento de estado global
- Roteamento interno customizado
- Controle de acesso por nível de permissão
- Enums como const (compatível com erasableSyntaxOnly)

## 🖥 Compatibilidade

- Windows 10 ou superior
- Ubuntu 24.04 ou superior