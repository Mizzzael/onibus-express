## OniBus Express — Desafio Técnico (Frontend) | Mizael Silva Lemos

> Sistema de venda de passagens rodoviárias — interface desenvolvida como resposta ao desafio técnico da OniBus Express.

### 🚀 Tecnologias utilizadas
- React 18 com TypeScript — componentes tipados e fluxo previsível
- Zustand — gerenciamento de estado global leve e sem boilerplate
- Zod — validação de formulários com schema declarativo
- Axios — cliente HTTP com interceptors para tratamento centralizado de erros
- Docker + Node — container para servir a aplicação em produção

### 📋 Funcionalidades implementadas

- Busca de passagens — formulário de origem, destino e data; listagem de viagens com preço, horário e vagas; estados de loading e resultado vazio
- Seleção de assento — mapa visual com assentos livres, ocupados e selecionado; resumo da viagem
- Dados do passageiro e confirmação — formulário com validação de nome, CPF e e-mail; resumo da compra; tela de sucesso com código de reserva

### O que ficou de fora

- Integração real com backend (utiliza mock/MSW nos testes e dados simulados no ambiente de desenvolvimento)
- Consulta de reserva (bônus) — busca por código, exibição de detalhes e opção de cancelamento

### ▶️ Como rodar localmente

#### Sem Docker
> Precisa instalar o json-server: [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)
```shell
pnpm run install

json-server --host 0.0.0.0 --port 3001 ./json-server/db.json

pnpm run dev
```

#### Com Docker

```shell
docker compose up --build
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### 🧪 Como rodar os testes

> **Nota:** O projeto conta com testes unitários de componentes e helpers. Testes E2E não foram implementados, pois o projeto depende de uma API real para os fluxos de ponta a ponta. Componentes puramente composicionais do HeroUI também foram omitidos, já que a biblioteca possui sua própria cobertura de testes.

```shell
pnpm run test
```