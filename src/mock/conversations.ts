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
  imageUrl?: string;
  isImage?: boolean;
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
      { id: '1', text: 'Olá Carlos, tudo bem com você?', sender: 'user', timestamp: '14:30' },
      { id: '2', text: 'Bom dia Roberto, por aqui tudo certo! E com você?', sender: 'contact', timestamp: '14:35' },
      { id: '3', text: 'Show! Precisava falar sobre o projeto.', sender: 'contact', timestamp: '14:40' },
      { id: '4', text: 'Chegou a ver o que te mandei no e-mail', sender: 'contact', timestamp: '14:42' },
      { id: '5', text: 'A reunião foi remarcada para sexta, tudo bem?', sender: 'contact', timestamp: '14:50' },
    ],
    startPositionMessage: 2,
    unreadCount: 1,
    isArchived: false,
    lastMessageTime: '14:50',
  },
  {
    id: 'conv2',
    userId: '2', // Luiz Ferreira
    messages: [
      { id: '1', text: 'Oi Luiz, conseguiu analisar a proposta?', sender: 'user', timestamp: '09:00' },
      { id: '2', text: 'Oi Roberto, sim! Analisei e gostei bastante.', sender: 'contact', timestamp: '09:05' },
      {
        id: '3',
        text: 'Podemos marcar uma reunião para alinhar os próximos passos.',
        sender: 'contact',
        timestamp: '09:30',
      },
      { id: '4', text: 'Que tal quinta-feira às 14h?', sender: 'contact', timestamp: '09:35' },
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
      { id: '1', text: 'Maria, você recebeu os documentos?', sender: 'user', timestamp: '12:00' },
      { id: '2', text: 'Recebi sim Roberto! Já estou analisando.', sender: 'contact', timestamp: '12:15' },
      { id: '3', text: 'Podemos nos reunir na terça para discutirmos?', sender: 'contact', timestamp: '13:10' },
      { id: '4', text: 'Tenho disponível às 10h ou às 15h.', sender: 'contact', timestamp: '13:15' },
      { id: '5', text: 'Me confirma o horário por favor.', sender: 'contact', timestamp: '13:20' },
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
      { id: '1', text: 'Ana, como foi a reunião de hoje?', sender: 'user', timestamp: '14:00' },
      { id: '2', text: 'Oi Roberto! Foi muito produtiva.', sender: 'contact', timestamp: '14:10' },
      { id: '3', text: 'Precisamos integrar as ideias que surgiram.', sender: 'contact', timestamp: '15:20' },
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
      { id: '1', text: 'João, como está o andamento do cronograma?', sender: 'user', timestamp: '14:00' },
      { id: '2', text: 'Roberto, estamos um pouco atrasados.', sender: 'contact', timestamp: '14:20' },
      { id: '3', text: 'Atrasamos por causa do feriado.', sender: 'contact', timestamp: '14:45' },
    ],
    startPositionMessage: 3,
    unreadCount: 2,
    isArchived: false,
    lastMessageTime: '15:05',
  },
  {
    id: 'conv6',
    userId: '6', // Fernanda Alves
    messages: [
      { id: '1', text: 'Fernanda, os resultados chegaram?', sender: 'user', timestamp: '10:30' },
      { id: '2', text: 'Oi Roberto! Sim, chegaram agora há pouco.', sender: 'contact', timestamp: '10:45' },
      { id: '3', text: 'Superaram as expectativas!', sender: 'contact', timestamp: '11:45' },
      { id: '4', text: 'Vou te enviar o relatório completo.', sender: 'contact', timestamp: '11:50' },
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
      { id: '1', text: 'Ricardo, como estão os dados financeiros?', sender: 'user', timestamp: '09:00' },
      { id: '2', text: 'Roberto, recebi os dados do setor.', sender: 'contact', timestamp: '10:00' },
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
      { id: '1', text: 'Beatriz, você tem o contato do jurídico?', sender: 'user', timestamp: '09:30' },
      { id: '2', text: 'Oi Roberto! Tenho sim, vou te passar.', sender: 'contact', timestamp: '09:45' },
      { id: '3', text: 'juridico@empresa.com, ramal 3045.', sender: 'contact', timestamp: '10:00' },
      { id: '4', text: 'Qualquer coisa pode me chamar.', sender: 'contact', timestamp: '10:05' },
    ],
    startPositionMessage: 2,
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '10:00',
  },
];
