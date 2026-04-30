import { computed, type Ref } from 'vue';
import type { ConversationWithUser } from '../../mock/combined';

// ============================================
// HOOK PARA FILTRAR CONVERSAS
// ============================================

/**
 * Filtra a lista de conversas baseado em:
 * - Conversas arquivadas vs não arquivadas
 * - Texto da busca (filtra pelo nome do usuário)
 */
export function useFilteredConversations(
  conversations: Ref<ConversationWithUser[]>,
  showArchived: Ref<boolean>,
  searchQuery: Ref<string>
) {
  return computed(() => {
    if (!conversations.value.length) return [];

    // Filtra por arquivado/não arquivado
    let result = conversations.value.filter((item) => (showArchived.value ? item.isArchived : !item.isArchived));

    // Filtra por texto da busca (se houver)
    if (searchQuery.value) {
      result = result.filter((item) => item.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }

    return result;
  });
}
