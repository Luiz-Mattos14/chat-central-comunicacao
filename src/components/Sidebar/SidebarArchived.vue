<script setup lang="ts">
import Icons from '../Commons/Icons.vue';

// ============================================
// PROPS
// ============================================

// Define se o botão está ativo (quando mostrando conversas arquivadas)
defineProps<{
  isActive?: boolean;
}>();

// ============================================
// EVENTOS
// ============================================

/*
Emite evento quando o botão é clicado
O componente pai (Sidebar) alterna a exibição entre conversas normais e arquivadas
*/
const emit = defineEmits<{
  (e: 'toggle-archived'): void;
}>();
</script>

<template>
  <div class="sidebar-archived-conversation">
    <!-- Botão para alternar visualização de conversas arquivadas -->
    <!-- A classe 'active' aplica estilo diferenciado quando está ativo -->
    <button class="archived-box" :class="{ active: isActive }" @click="$emit('toggle-archived')">
      <!-- Ícone de caixa (arquivo) -->
      <Icons name="icon-box" :size="14" class="icon-box" />

      <!-- Texto descritivo -->
      <p class="description">Conversas arquivadas</p>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-archived-conversation {
  padding: 0.8rem 1.6rem;

  > .archived-box {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    // Estilo quando está ativo (mostrando conversas arquivadas)
    &.active {
      color: var(--primary-color, #1976d2);

      .icon-box {
        color: var(--primary-color, #1976d2);
      }

      .description {
        font-weight: 500;
      }
    }
  }

  > .archived-box .icon-box {
    color: var(--slate-blue);
  }
}
</style>
