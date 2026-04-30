import { mockConversations, type Conversation } from './conversations';
import { mockUsers, type User } from './users';

// ============================================
// TIPOS
// ============================================

export type ConversationWithUser = Conversation & {
  user: User; // Dados do contato (nome, avatar, id)
  lastMessage: string; // Última mensagem visível na prévia
};

export function getConversationsWithUsers(): ConversationWithUser[] {
  const result = mockConversations
    .map((conversation) => {
      // Busca o usuário correspondente ao userId da conversa
      const user = mockUsers.find((u) => u.id === conversation.userId);

      // Se não encontrar usuário, loga erro e pula esta conversa
      if (!user) {
        console.error(`User not found for userId: ${conversation.userId}`);
        return null;
      }

      // Calcula qual mensagem deve aparecer como "última mensagem" na prévia
      // Baseado no startPositionMessage (posição inicial ao abrir a conversa)
      const startPosition = conversation.startPositionMessage;
      const lastMessageIndex = startPosition - 1; // Array começa no índice 0
      const lastMessage = conversation.messages[lastMessageIndex]?.text || '';

      // Retorna a conversa enriquecida com os dados do usuário e última mensagem
      return {
        ...conversation, // Mantém todos os campos originais da conversa
        user, // Adiciona os dados do usuário
        lastMessage, // Adiciona a última mensagem (prévia)
      };
    })
    // Remove os registros que deram erro
    .filter(Boolean) as ConversationWithUser[];

  // Log para debug (mostra o resultado final no console)
  console.log('Resultado:', result);

  return result;
}
