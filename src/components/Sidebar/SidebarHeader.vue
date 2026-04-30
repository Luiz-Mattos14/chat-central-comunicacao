<script setup lang="ts">
import Icons from '../Commons/Icons.vue';
</script>

<template>
  <div class="sidebar-header">
    <!-- Área de texto com título e descrição -->
    <div class="content-text">
      <h1 class="title">Central de Comunicação</h1>
      <p class="description">Comunicação interna</p>
    </div>

    <!-- Botão/Ícone para nova mensagem (futuramente pode ter funcionalidade) -->
    <div class="new-message">
      <Icons name="icon-message" :size="20" class="icon-message" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid var(--gray-1);

  // Área do texto (título + descrição)
  .content-text {
    .title {
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--color-base);
      margin: 0 0 0.4rem 0;
    }

    .description {
      font-size: 1.2rem;
      color: var(--slate-blue);
      margin: 0;
    }
  }

  // Ícone de nova mensagem
  .new-message {
    margin-right: 1.2rem;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .new-message .icon-message {
    color: var(--dark-blue);
  }
}
</style>
