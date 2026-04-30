# 💬 Central de Comunicação - Chat App

Aplicação de chat moderna desenvolvida com **Vue 3 + TypeScript + Vite**, simulando uma central de comunicação com funcionalidades completas de conversação, arquivamento, busca. e interação com as mensagens;

&nbsp;

## Tecnologias

| Tecnologia | Versão | Finalidade              |
| ---------- | ------ | ----------------------- |
| Vue.js     | 3.x    | Framework principal     |
| TypeScript | 6.x    | Tipagem estática        |
| Vite       | 8.x    | Build tool e dev server |
| Vitest     | 4.x    | Testes unitários        |
| Sass       | 1.x    | Estilização             |

&nbsp;

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/chat-central-comunicacao.git

# Entre na pasta
cd chat-central-comunicacao

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

&nbsp;

## Scripts de Execução

| Comando            | Descrição                          |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Inicia servidor de desenvolvimento |
| `npm run build`    | Gera build de produção             |
| `npm run preview`  | Visualiza build localmente         |
| `npm run test`     | Executa testes em modo watch       |
| `npm run test:run` | Executa testes uma única vez       |
| `npm run test:ui`  | Abre interface gráfica dos testes  |

&nbsp;

## Estrutura do Projeto

```bash
src/
├── components/
│   ├── common/          # Componentes reutilizáveis (Avatar, Icons)
│   ├── Sidebar/         # Barra lateral (lista de conversas)
│   ├── ChatMain/            # Área principal do chat
│   └── Hooks/           # Composables (lógica reutilizável)
│       └── tests/       # Testes dos hooks
├── mock/                # Dados mockados
│   ├── users.ts         # Usuários fictícios
│   ├── conversations.ts # Conversas e mensagens
│   ├── combined.ts      # Junção de usuários + conversas
│   └── tests/           # Testes dos mocks
├── styles/              # Global SCSS (variáveis, mixins)
└── App.vue              # Componente raiz
```

&nbsp;

## Hooks

Os hooks são funções reutilizáveis que encapsulam lógica de estado e comportamento. Seguem o padrão Composition API do Vue 3.

### Lista de Hooks

| Hook                       | Responsabilidade                                               |
| -------------------------- | -------------------------------------------------------------- |
| `useMobile`                | Detecta se o dispositivo é mobile (largura ≤ 768px)            |
| `useConversations`         | Gerencia estado das conversas (carregar, selecionar, arquivar) |
| `useFilteredConversations` | Filtra conversas por busca e status de arquivamento            |
| `useSidebarVisibility`     | Controla visibilidade da sidebar no mobile                     |
| `useChatMessages`          | Gerencia mensagens do chat (envio, "Digitando...", imagens)    |
| `useChatEvents`            | Centraliza eventos emitidos pelo chat                          |

&nbsp;

## Testes Unitários

### O que é testado

| Arquivo                            | O que testa                                     |
| ---------------------------------- | ----------------------------------------------- |
| `combined.spec.ts`                 | Integração entre conversas e usuários           |
| `users.spec.ts`                    | Função `getAvatarPath` e estrutura dos usuários |
| `useConversations.spec.ts`         | Estado e operações das conversas                |
| `useFilteredConversations.spec.ts` | Lógica de filtro (busca + arquivadas)           |

### Executar todos os testes

```bash
# Modo watch (re-executa ao salvar)
npm run test

# Executa uma única vez
npm run test:run

# Interface gráfica
npm run test:ui
```

### Executar todos os testes

```bash
# Teste do mock combinado
npm run test -- combined.spec.ts

# Teste dos usuários
npm run test -- users.spec.ts

# Teste do hook useConversations
npm run test -- useConversations.spec.ts

# Teste do hook useFilteredConversations
npm run test -- useFilteredConversations.spec.ts

# Ou usando npx
npx vitest combined.spec.ts
npx vitest users.spec.ts
```

&nbsp;

## Mock de Dados

### Estrutura de Retorno - `getConversationsWithUsers()`

A função principal do mock combina dados de usuários e conversas em um único objeto enriquecido.

<table style="width: 100%; border-collapse: collapse;"><thead><tr><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Campo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tipo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Descrição</th></tr></thead><tbody><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>id</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Identificador único da conversa</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>userId</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">ID do usuário (referência)</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>messages</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>Message[]</code></td><td style="border: 1px solid #ddd; padding: 8px;">Array de mensagens da conversa</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>startPositionMessage</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>number</code></td><td style="border: 1px solid #ddd; padding: 8px;">Quantidade de mensagens exibidas ao abrir (2 a 3)</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>unreadCount</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>number</code></td><td style="border: 1px solid #ddd; padding: 8px;">Número de mensagens não lidas (bullet)</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>isArchived</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>boolean</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>true</code> = conversa arquivada</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>lastMessageTime</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Horário da última mensagem</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>user</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>User</code></td><td style="border: 1px solid #ddd; padding: 8px;">Objeto com dados do contato</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>lastMessage</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Texto da última mensagem exibida na prévia</td></tr></tbody></table>

&nbsp;

### Objeto `User`

<table style="width: 100%; border-collapse: collapse;"><thead><tr><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Campo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tipo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Descrição</th></tr></thead><tbody><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>id</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Identificador único do usuário (1 a 8)</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>name</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Nome completo do contato</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>avatar</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Caminho da imagem do avatar</td></tr></tbody></table>

&nbsp;

### Objeto `Message`

<table style="width: 100%; border-collapse: collapse;"><thead><tr><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Campo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tipo</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Descrição</th></tr></thead><tbody><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>id</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Identificador único da mensagem</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>text</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Conteúdo da mensagem</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>sender</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>'user' | 'contact'</code></td><td style="border: 1px solid #ddd; padding: 8px;">Remetente: usuário logado ou contato</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>timestamp</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">Horário da mensagem</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>imageUrl?</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>string</code></td><td style="border: 1px solid #ddd; padding: 8px;">URL da imagem (quando houver)</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;"><code>isImage?</code></td><td style="border: 1px solid #ddd; padding: 8px;"><code>boolean</code></td><td style="border: 1px solid #ddd; padding: 8px;">Indica se a mensagem é uma imagem</td></tr></tbody></table>

&nbsp;

### Exemplo Completo de Retorno

```bash
[
  {
    "id": "conv1",
    "userId": "1",
    "startPositionMessage": 2,
    "unreadCount": 1,
    "isArchived": false,
    "lastMessageTime": "14:50",
    "user": {
      "id": "1",
      "name": "Carlos Mendes",
      "avatar": "/src/assets/images/avatar/carlos-mendes.png"
    },
    "lastMessage": "Bom dia Roberto, por aqui tudo certo! E com você?",
    "messages": [
      {
        "id": "1",
        "text": "Olá Carlos, tudo bem com você?",
        "sender": "user",
        "timestamp": "14:30"
      },
      {
        "id": "2",
        "text": "Bom dia Roberto, por aqui tudo certo! E com você?",
        "sender": "contact",
        "timestamp": "14:35"
      }
    ]
  }
]
```
