<script setup lang="ts">
import { ref } from 'vue';
import ChatMain from './components/ChatMain/ChatMain.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import type { ConversationWithUser } from './mock/combined';

// ============================================
// ESTADOS GLOBAIS
// ============================================

// Conversa atualmente selecionada no chat
const selectedConversation = ref<ConversationWithUser | null>(null);

// Lista completa de todas as conversas (para arquivar/desarquivar)
const conversations = ref<ConversationWithUser[]>([]);

// Referência para o componente Sidebar
const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null);

// ============================================
// MÉTODOS
// ============================================

// Seleciona uma conversa quando clicada na sidebar
function handleSelectConversation(conversation: ConversationWithUser) {
  selectedConversation.value = conversation;
}

// Recebe a lista de conversas carregadas pela sidebar
function handleConversationsLoaded(loadedConversations: ConversationWithUser[]) {
  conversations.value = loadedConversations;
}

// Remove a notificação (bullet) quando o usuário foca no input do chat
function handleChatFocus() {
  if (selectedConversation.value) {
    selectedConversation.value.unreadCount = 0;
  }
}

// Arquiva ou desarquiva uma conversa
function handleArchive(id: string) {
  const conversation = conversations.value.find((c) => c.id === id);

  if (conversation) {
    // Alterna entre arquivado e desarquivado
    conversation.isArchived = !conversation.isArchived;

    // Se a conversa aberta foi arquivada, limpa a seleção
    if (selectedConversation.value?.id === id) {
      selectedConversation.value = null;
    }
  }
}

// Mostra a sidebar novamente (quando clica em voltar)
function handleBack() {
  // Chama o método do Sidebar para mostrar a sidebar novamente
  if (sidebarRef.value) {
    sidebarRef.value.showSidebar();
  }
}
</script>

<template>
  <section class="chat-app">
    <!-- Sidebar: lista de conversas e navegação -->
    <Sidebar
      ref="sidebarRef"
      @select-conversation="handleSelectConversation"
      @conversations-loaded="handleConversationsLoaded"
    />

    <!-- ChatMain: área principal do chat -->
    <ChatMain
      :selected-conversation="selectedConversation"
      @archive="handleArchive"
      @back="handleBack"
      @focus="handleChatFocus"
    />
  </section>
</template>

<style lang="scss" scoped>
.chat-app {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
