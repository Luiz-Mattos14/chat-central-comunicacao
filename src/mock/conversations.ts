// mock/conversations.ts

// ============================================
// TIPOS
// ============================================

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  status?: 'sending' | 'sent' | 'read';
};

export type Conversation = {
  id: string;
  userId: string;
  messages: Message[];
  startPositionMessage: number;
  lastMessage?: string;
  unreadCount?: number;
  isArchived: boolean;
  lastMessageTime?: string;
};

// ============================================
// DADOS MOCK DAS CONVERSAS
// ============================================

/**
Lista de conversas mock
 
Regras:
- sender: 'contact' = mensagem enviada pelo contato
- sender: 'user' = mensagem enviada pelo usuário logado
- startPositionMessage: define quantas mensagens já aparecem ao abrir a conversa
- unreadCount: mostra o bullet de notificação na sidebar
*/
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    userId: '1', // Carlos Mendes
    messages: [
      { id: '1', text: 'Olá! Como você está?', sender: 'contact', timestamp: '14:30' },
      { id: '2', text: 'Olá! Estou bem sim, e você?', sender: 'user', timestamp: '14:35' },
      { id: '3', text: 'Estou ótimo! Precisava falar sobre o projeto.', sender: 'contact', timestamp: '14:40' },
      { id: '4', text: 'Claro! Pode falar, estou ouvindo.', sender: 'user', timestamp: '14:42' },
      { id: '5', text: 'A reunião foi remarcada para sexta, tudo bem?', sender: 'contact', timestamp: '14:50' },
    ],
    startPositionMessage: 2,
    unreadCount: 2,
    isArchived: false,
    lastMessageTime: '14:50',
  },
  {
    id: 'conv2',
    userId: '2', // Luiz Ferreira
    messages: [
      { id: '1', text: 'Bom dia! Analisei a proposta.', sender: 'contact', timestamp: '09:00' },
      { id: '2', text: 'Bom dia! O que achou?', sender: 'user', timestamp: '09:05' },
      {
        id: '3',
        text: 'Concordo com a proposta, vamos em frente com o projeto.',
        sender: 'contact',
        timestamp: '09:30',
      },
    ],
    startPositionMessage: 2,
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '09:30',
  },
  {
    id: 'conv3',
    userId: '3', // Maria Silva
    messages: [
      { id: '1', text: 'Podemos marcar uma reunião essa semana?', sender: 'contact', timestamp: '12:00' },
      { id: '2', text: 'Claro! Quando você estaria disponível?', sender: 'user', timestamp: '12:15' },
      { id: '3', text: 'Estou disponível na terça-feira às 10h.', sender: 'contact', timestamp: '13:10' },
    ],
    startPositionMessage: 2,
    unreadCount: 1,
    isArchived: false,
    lastMessageTime: '13:10',
  },
  {
    id: 'conv4',
    userId: '4', // Ana Costa
    messages: [
      { id: '1', text: 'Participei da reunião hoje mais cedo.', sender: 'contact', timestamp: '14:00' },
      { id: '2', text: 'Legal! Como foi?', sender: 'user', timestamp: '14:10' },
      {
        id: '3',
        text: 'Foi muito produtiva, precisamos integrar essas ideias.',
        sender: 'contact',
        timestamp: '15:20',
      },
    ],
    startPositionMessage: 2,
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '15:20',
  },
  {
    id: 'conv5',
    userId: '5', // João Pereira
    messages: [
      { id: '1', text: 'Precisamos revisar o cronograma.', sender: 'contact', timestamp: '14:00' },
      { id: '2', text: 'Concordo. O que você sugere?', sender: 'user', timestamp: '14:20' },
      { id: '3', text: 'Atrasamos em algumas entregas.', sender: 'contact', timestamp: '14:45' },
      { id: '4', text: 'Vou verificar com o time.', sender: 'user', timestamp: '14:55' },
      { id: '5', text: 'Podemos rever o cronograma na próxima reunião.', sender: 'contact', timestamp: '15:05' },
    ],
    startPositionMessage: 3,
    unreadCount: 3,
    isArchived: false,
    lastMessageTime: '15:05',
  },
  {
    id: 'conv6',
    userId: '6', // Fernanda Alves
    messages: [
      { id: '1', text: 'Os resultados preliminares chegaram!', sender: 'contact', timestamp: '10:30' },
      { id: '2', text: 'Que ótimo! Vou dar uma olhada.', sender: 'user', timestamp: '10:45' },
      { id: '3', text: 'Estou ansiosa para os resultados, ótimo trabalho!', sender: 'contact', timestamp: '11:45' },
    ],
    startPositionMessage: 2,
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '11:45',
  },
  {
    id: 'conv7',
    userId: '7', // Ricardo Lima
    messages: [
      { id: '1', text: 'Recebi os dados do setor financeiro.', sender: 'contact', timestamp: '09:00' },
      { id: '2', text: 'Ótimo! Vamos analisar.', sender: 'user', timestamp: '10:00' },
      { id: '3', text: 'Precisamos de mais dados antes de seguir.', sender: 'contact', timestamp: '14:00' },
    ],
    startPositionMessage: 2,
    unreadCount: 1,
    isArchived: false,
    lastMessageTime: 'Ontem',
  },
  {
    id: 'conv8',
    userId: '8', // Beatriz Souza
    messages: [
      { id: '1', text: 'Você tem o contato do jurídico?', sender: 'contact', timestamp: '09:30' },
      { id: '2', text: 'Tenho sim! Vou te passar agora.', sender: 'user', timestamp: '09:45' },
      { id: '3', text: 'É juridico@empresa.com, ramal 3045.', sender: 'contact', timestamp: '10:00' },
    ],
    startPositionMessage: 2,
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '10:00',
  },
];
