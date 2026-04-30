<script setup lang="ts">
import Avatar from '../Commons/Avatar.vue';
import type { ConversationWithUser } from '../../mock/combined';
import Icons from '../Commons/Icons.vue';
import { useMobile } from '../Hooks/useMobile';

// ============================================
// PROPS
// ============================================
const props = defineProps<{
  conversation: ConversationWithUser | null; // Conversa atual
}>();

// ============================================
// EVENTOS
// ============================================
defineEmits<{
  (e: 'archive'): void; // Quando clica no botão arquivar
  (e: 'back'): void; // Quando clica no botão voltar (mobile)
}>();

// ============================================
// HOOKS
// ============================================
const { isMobile } = useMobile();

// ============================================
// COMPUTADOS
// ============================================

/*
Retorna o texto correto para o botão baseado no estado da conversa
- Se arquivada: mostra "Desarquivar"
- Se não arquivada: mostra "Arquivar"
*/
function getArchiveButtonText(): string {
  if (!props.conversation) return 'Arquivar';
  return props.conversation.isArchived ? 'Desarquivar' : 'Arquivar';
}

// Retorna o título/tooltip correto para o botão
function getArchiveButtonTitle(): string {
  if (!props.conversation) return 'Arquivar';
  return props.conversation.isArchived ? 'Desarquivar conversa' : 'Arquivar conversa';
}
</script>

<template>
  <header class="chat-header">
    <!-- Botão voltar (aparece apenas no mobile) -->
    <button
      v-if="isMobile"
      class="btn-back"
      @click="
        () => {
          console.log('🔄 Botão voltar clicado');
          $emit('back');
        }
      "
    >
      <Icons name="arrow-left" :size="24" />
    </button>

    <!-- Avatar + Nome do contato -->
    <div class="contact-info">
      <Avatar :name="conversation?.user.name || ''" :image-url="conversation?.user.avatar" size="md" />
      <div class="info">
        <h3>{{ conversation?.user.name || 'Selecione uma conversa' }}</h3>
      </div>
    </div>

    <!-- Botão arquivar/desarquivar -->
    <button class="btn-archive" @click="$emit('archive')" :title="getArchiveButtonTitle()">
      <Icons name="icon-box" :size="14" class="icon-box" />
      <span>{{ getArchiveButtonText() }}</span>
    </button>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  background-color: var(--white);
  border-bottom: 0.1rem solid var(--gray-1);
  position: sticky;
  top: 0;
  z-index: 10;

  .btn-back {
    background: none;
    border: none;
    font-size: 2.4rem;
    cursor: pointer;
    padding: 0.8rem;
    margin-right: 0.8rem;
    display: none;

    @include media('xs') {
      display: flex;
    }

    svg {
      color: var(--slate-blue);
    }
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex: 1;

    .info h3 {
      font-size: 1.6rem;
      font-weight: var(--font-weight-base);
      color: var(--color-base);
      margin: 0 0 0.4rem 0;
    }
  }

  .btn-archive {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: none;
    border: 0.1rem solid var(--gray-1);
    font-size: 1.4rem;
    cursor: pointer;
    height: 3.8rem;
    padding: 0.8rem 1.2rem;
    border-radius: var(--border-radius-sm);
    transition: background 0.2s;

    &:hover {
      background-color: var(--gray-2);
    }

    .icon-box {
      color: var(--slate-blue);
    }

    span {
      color: var(--slate-blue);
      font-weight: 500;
    }
  }
}
</style>
