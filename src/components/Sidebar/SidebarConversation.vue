<script setup lang="ts">
import type { ConversationWithUser } from '../../mock/combined';
import Avatar from '../Commons/Avatar.vue';

// ============================================
// PROPS
// ============================================
defineProps<{
  conversations: ConversationWithUser[]; // Lista de conversas a ser exibida
  selectedId: string | null; // ID da conversa atualmente selecionada
}>();

// ============================================
// EVENTOS
// ============================================
defineEmits<{
  (e: 'select-conversation', id: string): void; // Emite o ID quando clica em uma conversa
}>();
</script>

<template>
  <div class="sidebar-conversations-list">
    <!-- LOOP: Renderiza cada conversa da lista -->
    <div
      v-for="item in conversations"
      :key="item.id"
      class="conversation-item"
      :class="{
        active: selectedId === item.id, // Destaque para conversa selecionada
        archived: item.isArchived, // Estilo diferente para arquivadas
      }"
      @click="$emit('select-conversation', item.id)"
    >
      <!-- Avatar do contato -->
      <Avatar :name="item.user.name" :image-url="item.user.avatar" size="lg" />

      <!-- Informações da conversa -->
      <div class="conversation-info">
        <div class="conversation-header">
          <!-- Nome do contato -->
          <div class="conversation-name">
            {{ item.user.name }}
            <!-- Badge de arquivada (se aplicável) -->
            <span v-if="item.isArchived" class="archived-badge">Arquivada</span>
          </div>
          <!-- Horário da última mensagem -->
          <span v-if="item.lastMessageTime" class="time">
            {{ item.lastMessageTime }}
          </span>
        </div>

        <!-- Prévia da última mensagem -->
        <div class="message-preview">
          <span class="last-message">{{ item.lastMessage || 'Nenhuma mensagem' }}</span>
          <!-- Bolinha de notificação de mensagens não lidas -->
          <div v-if="item.unreadCount && !item.isArchived" class="notification">
            {{ item.unreadCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há conversas -->
    <div v-if="conversations.length === 0" class="empty-state">Nenhuma conversa encontrada</div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-conversations-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.8rem;

  .conversation-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #e3f2fd;
    }

    &.archived {
      opacity: 0.7;
    }

    .conversation-info {
      flex: 1;
      min-width: 0;

      .conversation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.4rem;

        .conversation-name {
          font-weight: 500;
          font-size: var(--font-size-base);
          color: var(--color-base);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;

          .archived-badge {
            font-size: 1rem;
            font-weight: normal;
            background-color: #e0e0e0;
            color: #666;
            padding: 0.2rem 0.6rem;
            border-radius: 0.5rem;
          }
        }

        .time {
          font-size: var(--font-size-base);
          color: var(--color-base);
        }
      }

      .message-preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;

        .last-message {
          font-size: var(--font-size-small);
          color: var(--slate-blue);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80%;
        }

        .notification {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1976d2;
          color: var(--white);
          font-size: 1rem;
          font-weight: 500;
          border-radius: 50%;
          width: 2.2rem;
          height: 2.2rem;
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 3.2rem;
    color: #999;
    font-size: var(--font-size-base);
  }
}
</style>
