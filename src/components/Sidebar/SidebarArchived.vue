<script setup lang="ts">
import Icons from '../Commons/Icons.vue';

defineProps<{
  isActive?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-archived'): void;
}>();
</script>

<template>
  <div class="sidebar-archived-conversation">
    <button class="archived-box" :class="{ active: isActive }" @click="$emit('toggle-archived')">
      <Icons name="icon-box" :size="14" class="icon-box" />

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

    &:hover {
      opacity: 0.8;
    }

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
