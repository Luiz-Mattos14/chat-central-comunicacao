<script setup lang="ts">
import Icons from '../Commons/Icons.vue';
</script>

<!-- Cabeçalho -->
<template>
  <div class="sidebar-header">
    <div class="content-text">
      <h1 class="title">Central de Comunicação</h1>
      <p class="description">Comunicação interna</p>
    </div>

    <div class="new-message">
      <Icons name="icon-message" :size="20" class="icon-message" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Cabeçalho
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid var(--gray-1);

  > .new-message {
    margin-right: 1.2rem;
  }

  > .new-message .icon-message {
    color: var(--dark-blue);
  }
}
</style>
