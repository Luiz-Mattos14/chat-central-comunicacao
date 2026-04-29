// mock/conversations.ts

export type Conversation = {
  id: string;
  userId: string;
  lastMessage?: string;
  unreadCount?: number;
  isArchived: boolean;
  lastMessageTime?: string;
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    userId: '1', // Carlos Mendes
    lastMessage: 'Olá, tudo bem?',
    unreadCount: 2,
    isArchived: false,
    lastMessageTime: '14:50',
  },
  {
    id: 'conv2',
    userId: '2', // Luiz Ferreira
    lastMessage: 'Concordo com a proposta, vamos em frente com o projeto.',
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '09:30',
  },
  {
    id: 'conv3',
    userId: '3', // Maria Silva
    lastMessage: 'Claro! Estou disponível para a reunião na terça-feira às 10h.',
    unreadCount: 1,
    isArchived: false,
    lastMessageTime: '13:10',
  },
  {
    id: 'conv4',
    userId: '4', // Ana Costa
    lastMessage: 'A reunião foi muito produtiva, precisamos integrar essas ideias.',
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '15:20',
  },
  {
    id: 'conv5',
    userId: '5', // João Pereira
    lastMessage: 'Podemos rever o cronograma na próxima reunião.',
    unreadCount: 3,
    isArchived: false,
    lastMessageTime: '15:05',
  },
  {
    id: 'conv6',
    userId: '6', // Fernanda Alves
    lastMessage: 'Estou ansiosa para os resultados, ótimo trabalho equipe!',
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '11:45',
  },
  {
    id: 'conv7',
    userId: '7', // Ricardo Lima
    lastMessage: 'Precisamos de mais dados antes de seguir com a decisão.',
    unreadCount: 1,
    isArchived: false, // Arquivada
    lastMessageTime: 'Ontem',
  },
  {
    id: 'conv8',
    userId: '8', // Beatriz Souza
    lastMessage: 'Claro! É o juridico@empresa.com você também pode ligar no ramal 3045.',
    unreadCount: 0,
    isArchived: false,
    lastMessageTime: '10:00',
  },
];
