<script setup lang="ts">
import Icons from '../Commons/Icons.vue';

// ============================================
// PROPS
// ============================================

/*
Valor do campo de busca (two-way binding com v-model)
O valor vem do componente pai (Sidebar) via prop modelValue
*/
defineProps<{
  modelValue: string;
}>();

// ============================================
// EVENTOS
// ============================================

/**
Emite evento para atualizar o valor no componente pai
Isso permite o two-way binding com v-model
*/
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <!-- Componente de busca de conversas -->
  <div class="sidebar-search-box">
    <div class="field">
      <!-- Ícone de lupa -->
      <Icons name="icon-search" :size="16" class="icon-search" />

      <!-- Campo de input: -->
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Buscar conversas"
        class="search-input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-search-box {
  padding: 0.8rem 1.6rem;

  > .field {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: var(--gray-2);
    border-radius: 8px;
    padding: 1.2rem;
    height: 3.6rem;
  }

  > .field .icon-search {
    color: var(--color-base);
    flex-shrink: 0;
  }

  > .field .search-input {
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    font-size: var(--font-size-base);
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #475569;
    }
  }
}
</style>
