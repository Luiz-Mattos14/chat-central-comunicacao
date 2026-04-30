<script setup lang="ts">
import { ref, watch } from 'vue';
import ChatHeader from './ChatHeader.vue';
import type { ConversationWithUser } from '../../mock/combined';
import ChatMessage from './ChatMessage.vue';
import ChatMessageInput from './ChatMessageInput.vue';
import { useChatMessages } from '../Hooks/useChatMessages';
import { useChatEvents } from '../Hooks/useChatEvents';

// ============================================
// PROPS
// ============================================
const props = defineProps<{
  selectedConversation: ConversationWithUser | null;
}>();

// ============================================
// EVENTOS
// ============================================
const emit = defineEmits<{
  (e: 'archive', id: string): void;
  (e: 'back'): void;
  (e: 'focus'): void;
  (e: 'send-message', text: string): void;
}>();

// ============================================
// REF PARA O HOOK
// ============================================
const selectedConversationRef = ref<ConversationWithUser | null>(null);

watch(
  () => props.selectedConversation,
  (newVal) => {
    selectedConversationRef.value = newVal;
  },
  { immediate: true }
);

// ============================================
// HOOKS
// ============================================
const { isTyping, currentMessages, sendMessage, sendImage } = useChatMessages(selectedConversationRef);
const { handleInputFocus, handleArchive, handleBack } = useChatEvents(emit, selectedConversationRef);

// ============================================
// MÉTODOS
// ============================================
function handleSendMessage(text: string): void {
  sendMessage(text, (msg) => {
    emit('send-message', msg);
  });
}

function handleSendFile(file: File): void {
  sendImage(file, (msg) => {
    emit('send-message', msg);
  });
}
</script>

<template>
  <main class="chat-main">
    <ChatHeader :conversation="selectedConversation" @archive="handleArchive" @back="handleBack" />

    <div class="chat-messages-container">
      <ChatMessage
        :messages="currentMessages"
        :is-typing="isTyping"
        :contact-name="selectedConversation?.user.name || ''"
        :contact-avatar="selectedConversation?.user.avatar || ''"
      />
    </div>

    <ChatMessageInput @send="handleSendMessage" @focus="handleInputFocus" @send-file="handleSendFile" />
  </main>
</template>

<style lang="scss" scoped>
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 1;
}

.chat-messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
</style>
