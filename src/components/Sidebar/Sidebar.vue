<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarHeader from './SidebarHeader.vue';
import SidebarSearch from './SidebarSearch.vue';
import SidebarArchived from './SidebarArchived.vue';
import SidebarConversation from './SidebarConversation.vue';
import { getConversationsWithUsers, type ConversationWithUser } from '../../mock/combined';

// ============================================
// EVENTOS
// ============================================
const emit = defineEmits<{
  (e: 'select-conversation', conversation: ConversationWithUser): void;
  (e: 'conversations-loaded', conversations: ConversationWithUser[]): void;
}>();

// ============================================
// ESTADOS
// ============================================

// Lista completa de conversas (combinada com dados do usuário)
const conversationsWithUsers = ref<ConversationWithUser[]>([]);

// ID da conversa atualmente selecionada
const selectedId = ref<string | null>(null);

// Texto digitado no campo de busca
const searchQuery = ref('');

// Controla se mostra conversas arquivadas ou não
const showArchived = ref(false);

// ============================================
// COMPUTADOS
// ============================================

/*
Filtra as conversas baseado em:
- Mostrar arquivadas ou não arquivadas
- Texto da busca (filtra pelo nome do usuário)
*/
const filteredConversations = computed(() => {
  if (!conversationsWithUsers.value.length) return [];

  // Primeiro filtra por arquivado/não arquivado
  let result = conversationsWithUsers.value.filter((item) => (showArchived.value ? item.isArchived : !item.isArchived));

  // Depois filtra pela busca (se houver)
  if (searchQuery.value) {
    result = result.filter((item) => item.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return result;
});

// ============================================
// MÉTODOS
// ============================================

// Carrega as conversas do mock e emite para o App
function loadConversations() {
  const data = getConversationsWithUsers();
  conversationsWithUsers.value = data;
  emit('conversations-loaded', data);

  // Seleciona a primeira conversa automaticamente
  if (data.length > 0) {
    selectedId.value = data[0].id;
    emit('select-conversation', data[0]);
  }
}

// Alterna entre mostrar conversas normais e arquivadas
function toggleArchived() {
  showArchived.value = !showArchived.value;
  selectedId.value = null; // Reseta seleção ao mudar de lista
}

// Seleciona uma conversa e remove a notificação de não lidas
function selectConversation(id: string) {
  selectedId.value = id;
  const conversation = conversationsWithUsers.value.find((item) => item.id === id);

  if (conversation) {
    conversation.unreadCount = 0; // Remove o bullet de notificação
    emit('select-conversation', conversation);
  }

  console.log('Conversa selecionada:', id);
}

// Carrega as conversas quando o componente é montado
onMounted(loadConversations);
</script>

<template>
  <aside class="sidebar">
    <!-- Cabeçalho com logo -->
    <SidebarHeader />

    <!-- Campo de busca -->
    <SidebarSearch v-model="searchQuery" />

    <!-- Botão para mostrar conversas arquivadas -->
    <SidebarArchived :is-active="showArchived" @toggle-archived="toggleArchived" />

    <!-- Lista de conversas -->
    <SidebarConversation
      :conversations="filteredConversations"
      :selected-id="selectedId"
      @select-conversation="selectConversation"
    />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 320px;
  height: 100vh;
  border-right: 1px solid var(--gray-1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
