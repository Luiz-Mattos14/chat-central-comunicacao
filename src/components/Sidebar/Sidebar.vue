<script setup lang="ts">
import SidebarHeader from './SidebarHeader.vue';
import SidebarSearch from './SidebarSearch.vue';
import SidebarArchived from './SidebarArchived.vue';
import SidebarConversation from './SidebarConversation.vue';
import type { ConversationWithUser } from '../../mock/combined';
import { useMobile } from '../Hooks/useMobile';
import { useSidebarVisibility } from '../Hooks/useSidebarVisibility';
import { useConversations } from '../Hooks/useConversations';
import { useFilteredConversations } from '../Hooks/useFilteredConversations';

// ============================================
// HOOKS
// ============================================
const { isMobile } = useMobile();
const { isSidebarVisible, hideSidebarOnMobile, showSidebar } = useSidebarVisibility(isMobile);
const {
  conversationsWithUsers,
  selectedId,
  searchQuery,
  showArchived,
  loadConversations,
  toggleArchived,
  selectConversation: selectConversationRaw,
} = useConversations();

// ============================================
// EVENTOS
// ============================================
const emit = defineEmits<{
  (e: 'select-conversation', conversation: ConversationWithUser): void;
  (e: 'conversations-loaded', conversations: ConversationWithUser[]): void;
}>();

// ============================================
// COMPUTADOS
// ============================================
const filteredConversations = useFilteredConversations(conversationsWithUsers, showArchived, searchQuery);

// ============================================
// MÉTODOS
// ============================================
function selectConversation(id: string) {
  const conversation = selectConversationRaw(id);
  if (conversation) {
    emit('select-conversation', conversation);
  }
  hideSidebarOnMobile();
}

function handleLoadConversations() {
  const data = loadConversations();
  emit('conversations-loaded', data);
  if (data.length > 0) {
    emit('select-conversation', data[0]);
  }
}

// ============================================
// EXPOSIÇÃO
// ============================================
defineExpose({ showSidebar });

// ============================================
// CICLO DE VIDA
// ============================================
handleLoadConversations();
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar-hidden': isMobile && !isSidebarVisible }"">
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
@use '@/styles/mixins.scss' as *;

.sidebar {
  width: 320px;
  height: 100vh;
  background: var(--white);
  border-right: 1px solid var(--gray-1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @include media('xs') {
    position: absolute;
    z-index: 9;
    width: 100%;
  }

  &.sidebar-hidden {
    @include media('xs') {
      transform: translateX(-100%);
    }
  }
}
</style>
