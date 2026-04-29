<template>
  <div class="avatar" :class="[size, { online: isOnline }]" :style="avatarStyle">
    <img v-if="hasImage && !imageError" :src="imageUrl" :alt="name" @error="handleImageError" />
    <span v-else class="initials">
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
}>();

const imageError = ref(false);

const hasImage = computed(() => {
  return props.imageUrl && props.imageUrl.trim() !== '';
});

const sizeClass = computed(() => {
  const sizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  };
  return sizes[props.size || 'md'];
});

const avatarStyle = computed(() => {
  if (hasImage.value && !imageError.value) {
    return {
      backgroundImage: `url(${props.imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  return {};
});

const initials = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const handleImageError = () => {
  imageError.value = true;
  console.warn(`Failed to load image: ${props.imageUrl}`);
};
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    z-index: 1;
  }

  // Tamanhos
  &.sm {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  &.md {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  &.lg {
    width: 48px;
    height: 48px;
    font-size: 16px;
  }

  // Indicador de online
  &.online::after {
    content: '';
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background-color: #4caf50;
    border-radius: 50%;
    border: 2px solid white;
    z-index: 2;
  }
}
</style>
