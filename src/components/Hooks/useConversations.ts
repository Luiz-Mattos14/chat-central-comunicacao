import { ref } from 'vue';
import { getConversationsWithUsers, type ConversationWithUser } from '../../mock';

// ============================================
// HOOK PARA GERENCIAR CONVERSAS
// ============================================

//  * Gerencia o estado e operações das conversas
export function useConversations() {
  const conversationsWithUsers = ref<ConversationWithUser[]>([]);
  const selectedId = ref<string | null>(null);
  const searchQuery = ref('');
  const showArchived = ref(false);

  function loadConversations() {
    const data = getConversationsWithUsers();
    conversationsWithUsers.value = data;
    return data;
  }

  function toggleArchived() {
    showArchived.value = !showArchived.value;
    selectedId.value = null; // Reseta seleção ao mudar de lista
  }

  function selectConversation(id: string) {
    selectedId.value = id;
    const conversation = conversationsWithUsers.value.find((item) => item.id === id);
    if (conversation) {
      conversation.unreadCount = 0; // Remove o bullet de notificação
    }
    return conversation;
  }

  return {
    conversationsWithUsers,
    selectedId,
    searchQuery,
    showArchived,
    loadConversations,
    toggleArchived,
    selectConversation,
  };
}
