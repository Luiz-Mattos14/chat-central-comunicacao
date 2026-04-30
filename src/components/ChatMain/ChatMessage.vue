<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'; // 👈 Adicione watch e nextTick
import type { Message } from '../../mock/conversations';
import ChatMessageBubble from './ChatMessageBubble.vue';
import Avatar from '../Commons/Avatar.vue';

// ============================================
// PROPS
// ============================================
const props = defineProps<{
  messages: Message[];
  isTyping?: boolean;
  contactName: string;
  contactAvatar: string;
}>();

// ============================================
// ESTADOS
// ============================================
const listRef = ref<HTMLElement | null>(null);

// ============================================
// COMPUTADOS
// ============================================
const groupedMessages = computed(() => {
  const groups: { date: string; messages: Message[] }[] = [];

  props.messages.forEach((message) => {
    let dateKey = message.timestamp;

    if (message.timestamp.match(/^\d{2}:\d{2}$/)) {
      dateKey = 'Hoje';
    } else if (message.timestamp.toLowerCase() === 'ontem') {
      dateKey = 'Ontem';
    }

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === dateKey) {
      lastGroup.messages.push(message);
    } else {
      groups.push({ date: dateKey, messages: [message] });
    }
  });

  return groups;
});

// ============================================
// MÉTODOS
// ============================================

/**
 * Rola automaticamente para o final da lista de mensagens
 */
function scrollToBottom(): void {
  nextTick(() => {
    if (listRef.value) {
      listRef.value.scrollTop = listRef.value.scrollHeight;
    }
  });
}

// ============================================
// WATCHERS
// ============================================

// Quando novas mensagens chegam, rola para o final
watch(
  () => props.messages.length,
  () => {
    scrollToBottom();
  }
);

// Quando o indicador de digitação aparece, rola para o final
watch(
  () => props.isTyping,
  () => {
    scrollToBottom();
  }
);

// Scroll inicial ao carregar o componente
scrollToBottom();
</script>

<template>
  <div class="message-list" ref="listRef">
    <div class="messages">
      <!-- LOOP: Renderiza grupos de mensagens por data -->
      <div v-for="group in groupedMessages" :key="group.date">
        <div class="date-separator">
          <span>{{ group.date }}</span>
        </div>

        <div class="flag">
          <p>Todas as conversas podem ser visualizadas pelo gestor do sistema para fins de auditoria institucional.</p>
        </div>

        <ChatMessageBubble
          v-for="message in group.messages"
          :key="message.id"
          :message="message"
          :contact-name="contactName"
          :contact-avatar="contactAvatar"
        />
      </div>

      <!-- Indicador de digitação com avatar -->
      <div v-if="isTyping" class="typing-wrapper">
        <Avatar :name="contactName" :image-url="contactAvatar" size="sm" />
        <div class="typing-indicator">
          <span>Digitando</span>
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.message-list {
  flex: 1;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox - esconde scroll */
  -ms-overflow-style: none; /* IE/Edge - esconde scroll */

  @include media('xs') {
    overflow-x: hidden;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    min-height: 100%;
    padding: 0.8rem 0;
  }

  .date-separator {
    text-align: center;
    margin: 1.6rem 0;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 0.1rem;
      position: absolute;
      left: 0;
      top: 50%;
      background-color: var(--gray-1);
      transform: translateY(50%);
      z-index: 1;
    }

    span {
      position: relative;
      background-color: var(--white);
      color: var(--color-base);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-bold);
      padding: 0.4rem 1.2rem;
      border-radius: var(--border-radius-lg);
      display: inline-block;
      z-index: 2;
    }
  }

  .flag {
    background-color: var(--color-flag-bg);
    color: var(--color-flag-text);
    width: max-content;
    padding: 1.2rem;
    margin: 2.8rem auto;
    font-size: var(--font-size-small);
    border-radius: var(--border-radius-sm);
    text-align: center;
    line-height: 1.5;

    @include media('xs') {
      max-width: 34rem;
    }
  }

  .typing-wrapper {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem 1.2rem;
    border: 0.1rem solid var(--gray-1);
    background-color: var(--gray-2);
    border-radius: var(--border-radius-sm);
    color: var(--color-base);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-small);
    font-style: italic;
    width: fit-content;
    box-shadow: var(--shadow-sm);

    span:first-child {
      margin-right: 0.4rem;
    }

    span:not(:first-child) {
      width: 0.4rem;
      height: 0.4rem;
      background-color: var(--color-base);
      border-radius: 50%;
      animation: blink var(--animation-duration) infinite;

      &:nth-child(2) {
        animation-delay: 0s;
      }
      &:nth-child(3) {
        animation-delay: var(--animation-delay-1);
      }
      &:nth-child(4) {
        animation-delay: var(--animation-delay-2);
      }
    }
  }
}

@keyframes blink {
  0%,
  60%,
  100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}
</style>
