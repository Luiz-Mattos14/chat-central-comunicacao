<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarHeader from './SidebarHeader.vue';
import SidebarSearch from './SidebarSearch.vue';
import SidebarArchived from './SidebarArchived.vue';
import SidebarConversation from './SidebarConversation.vue';
import { getConversationsWithUsers, type ConversationWithUser } from '../../mock/combined';

// Dados combinados
const conversationsWithUsers = ref<ConversationWithUser[]>([]);

// Estado
const selectedId = ref<string | null>(null);
const searchQuery = ref('');
const showArchived = ref(false);

// Carregar dados
onMounted(() => {
  const data = getConversationsWithUsers();
  conversationsWithUsers.value = data;

  // Seleciona o primeiro contato automaticamente
  if (data.length > 0) {
    selectedId.value = data[0].id;
    console.log('Primeiro contato selecionado:', data[0].user.name);
  }
});

// Conversas filtradas
const filteredConversations = computed(() => {
  if (!conversationsWithUsers.value.length) return [];

  let result = conversationsWithUsers.value.filter((item) => (showArchived.value ? item.isArchived : !item.isArchived));

  if (searchQuery.value) {
    result = result.filter((item) => item.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return result;
});

const toggleArchived = () => {
  showArchived.value = !showArchived.value;
  selectedId.value = null; // Reseta seleção ao mudar de lista
};

const selectConversation = (id: string) => {
  selectedId.value = id;
  const conversation = conversationsWithUsers.value.find((item) => item.id === id);
  if (conversation) {
    conversation.unreadCount = 0;
  }
  console.log('Conversa selecionada:', id);
};
</script>

<template>
  <aside class="sidebar">
    <SidebarHeader />
    <SidebarSearch v-model="searchQuery" />
    <SidebarArchived :is-active="showArchived" @toggle-archived="toggleArchived" />
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
