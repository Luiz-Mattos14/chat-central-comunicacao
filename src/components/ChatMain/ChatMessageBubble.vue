<script setup lang="ts">
import type { Message } from '../../mock/conversations';
import Avatar from '../Commons/Avatar.vue';

// ============================================
// PROPS
// ============================================
const props = defineProps<{
  message: Message; // Dados da mensagem individual
  contactName: string; // Nome do contato
  contactAvatar: string; // Avatar do contato
}>();

// ============================================
// DADOS FIXOS DO USUÁRIO LOGADO
// ============================================
const userName = 'Roberto Silva';
const userAvatar = '/src/assets/images/avatar/roberto-silva.png';
</script>

<template>
  <div class="message-wrapper" :class="message.sender">
    <!-- Avatar do CONTATO -->
    <Avatar
      v-if="message.sender === 'contact'"
      :name="contactName"
      :image-url="contactAvatar"
      size="sm"
      class="message-avatar"
    />

    <div class="message-bubble">
      <div v-if="message.sender === 'contact'" class="sender-name">
        {{ contactName }}
      </div>

      <div v-if="message.sender === 'user'" class="sender-name user-name">
        {{ userName }}
      </div>

      <div class="bubble">
        <p class="text">{{ message.text }}</p>
        <span class="time">{{ message.timestamp }}</span>
      </div>
    </div>

    <!-- Avatar do USUÁRIO -->
    <Avatar
      v-if="message.sender === 'user'"
      :name="userName"
      :image-url="userAvatar"
      size="sm"
      class="message-avatar"
    />
  </div>
</template>

<style lang="scss" scoped>
.message-wrapper {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  margin-bottom: 3.4rem;

  &.user {
    display: flex;
    justify-content: flex-end;

    .message-bubble {
      align-items: flex-start;
      order: 1;
    }

    .message-avatar {
      order: 2;
    }

    .sender-name.user-name {
      text-align: left;
      margin-left: auto;
      margin-right: 0;
    }

    .text {
      background-color: #0f172a;
      color: var(--white);
    }

    .time {
      text-align: right;
      margin-left: auto;
    }
  }

  &.contact {
    flex-direction: row;

    .text {
      background-color: var(--gray-2);
      border: 0.1rem solid var(--gray-1);
      color: var(--color-base);
    }
  }

  .message-avatar {
    flex-shrink: 0;
  }

  .message-bubble {
    display: flex;
    flex-direction: column;
    max-width: 70%;

    .sender-name {
      font-size: 1.6rem;
      font-weight: var(--font-weight-base);
      margin-bottom: 0.4rem;
      margin-left: 0.4rem;
      color: var(--color-base);
    }
  }

  .bubble {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1rem 1.4rem;

    .text {
      margin: 0 0 0.4rem 0;
      font-size: 1.4rem;
      line-height: 1.4;
      word-wrap: break-word;
      white-space: pre-wrap;
      padding: 0.8rem 1.2rem;
      border-radius: var(--border-radius-sm);
      box-shadow: var(--shadow-sm);
    }

    .time {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-small);
      color: var(--slate-blue);
      opacity: 0.7;
      display: block;
      text-align: left;
    }
  }
}
</style>
