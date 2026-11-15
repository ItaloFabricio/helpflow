# HelpFlow — Central de Atendimento

Aplicação front-end para registro, acompanhamento e organização de chamados técnicos. O projeto foi desenvolvido como exercício prático de jQuery e Bootstrap, com foco em arquitetura modular, manipulação do DOM, eventos, formulários, responsividade e experiência do usuário.

## Funcionalidades

- Dashboard com indicadores de chamados.
- Cadastro de chamados com validação contextual.
- Listagem com busca, filtros, ordenação e paginação.
- Visualização de detalhes e histórico de atividades.
- Atualização de status e prioridade.
- Registro de observações.
- Persistência local com LocalStorage.
- Interface responsiva e navegação mobile.

## Tecnologias

- HTML5 e SCSS
- Bootstrap 5.3
- jQuery 3.7
- JavaScript ES Modules
- Vite
- LocalStorage e JSON

## Como executar

Requisitos: Node.js e npm.

```bash
git clone https://github.com/SEU_USUARIO/helpflow.git
cd helpflow
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Organização

```text
src/
├── data/                 # Dados iniciais em JSON
├── js/
│   ├── components/       # Componentes de interface reutilizáveis
│   ├── core/             # Persistência e infraestrutura
│   ├── modules/          # Funcionalidades por domínio
│   ├── services/         # Operações e regras dos chamados
│   └── utils/            # Funções auxiliares
├── scss/                 # Estilos e identidade visual
└── index.html
```

## Conceitos de jQuery praticados

Seletores, manipulação do DOM, eventos, delegação de eventos, `.on()`, `.val()`, `.text()`, `.append()`, `.empty()`, `.each()`, classes CSS, integração com componentes Bootstrap e atualização dinâmica da interface.

## Decisões de UX

A interface considera hierarquia visual, consistência, feedback de ações, prevenção e recuperação de erros, estados vazios, labels de formulário, foco visível e navegação adaptada a telas menores.

## Escopo e limitações

Este é um projeto demonstrativo de front-end. Os dados são simulados e persistidos no navegador. Não há backend, autenticação real, sincronização entre usuários ou API de produção. O histórico de atividades é local ao navegador.

## Autor

**Italo Fabrício** · [GitHub](https://github.com/ItaloFabricio)
