import { ref, onMounted, onUnmounted } from 'vue';

// ============================================
// HOOK PARA DETECTAR DISPOSITIVO MOBILE
// ============================================

/**
 * Detecta se o dispositivo é mobile (largura <= 768px)
 * Atualiza automaticamente ao redimensionar a tela
 */
export function useMobile() {
  const isMobile = ref(false);

  function checkMobile() {
    isMobile.value = window.innerWidth <= 768;
  }

  onMounted(() => {
    checkMobile(); // Verifica ao carregar o componente
    window.addEventListener('resize', checkMobile); // Escuta mudanças de tamanho da tela
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile); // Remove o listener ao destruir o componente
  });

  return { isMobile };
}
