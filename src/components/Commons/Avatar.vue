<script setup lang="ts">
import { computed, ref } from 'vue';

// ============================================
// PROPS
// ============================================
const props = defineProps<{
  name: string; // Nome da pessoa (para gerar iniciais)
  imageUrl?: string; // URL da imagem do avatar
  size?: 'sm' | 'md' | 'lg'; // Tamanho do avatar (small, medium, large)
}>();

// ============================================
// ESTADOS
// ============================================

// Controla se houve erro ao carregar a imagem
const imageError = ref(false);

// ============================================
// COMPUTADOS
// ============================================

// Verifica se tem imagem válida para exibir
const hasImage = computed(() => {
  return props.imageUrl && props.imageUrl.trim() !== '';
});

// Define a classe CSS do tamanho baseado na prop size
const sizeClass = computed(() => {
  const sizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  };
  return sizes[props.size || 'md'];
});

// Estilo CSS para imagem de fundo (quando tem imagem)
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

// Gera as iniciais do nome (máximo 2 letras)
const initials = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// ============================================
// MÉTODOS
// ============================================

/*
Trata erro de carregamento da imagem
Mostra as iniciais como fallback
 */
function handleImageError(): void {
  imageError.value = true;
  console.warn(`Failed to load image: ${props.imageUrl}`);
}
</script>

<template>
  <div class="avatar" :class="[size]" :style="avatarStyle">
    <!-- Imagem do avatar (se existir e não tiver erro) -->
    <img v-if="hasImage && !imageError" :src="imageUrl" :alt="name" @error="handleImageError" />
    <!-- Iniciais do nome (fallback quando não tem imagem) -->
    <span v-else class="initials">
      {{ initials }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  background-color: var(--dark-blue);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
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
    width: 3.2rem;
    height: 3.2rem;
    font-size: 1.2rem;
  }

  &.md {
    width: 4rem;
    height: 4rem;
    font-size: 1.4rem;
  }

  &.lg {
    width: 4.8rem;
    height: 4.8rem;
    font-size: 1.6rem;
  }

  // Indicador de online (bolinha verde)
  &.online::after {
    content: '';
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #4caf50;
    border-radius: 50%;
    border: 0.2rem solid var(--white);
    z-index: 2;
  }
}
</style>
