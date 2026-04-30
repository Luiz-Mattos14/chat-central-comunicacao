import { ref } from 'vue';

// ============================================
// HOOK PARA CONTROLAR VISIBILIDADE DA SIDEBAR NO MOBILE
// ============================================

/**
 * Controla a visibilidade da sidebar em dispositivos móveis
 * const { isMobile } = useMobile();
 * const { isSidebarVisible, hideSidebarOnMobile, showSidebar } = useSidebarVisibility(isMobile);
 *
 * // Esconder ao clicar no contato
 * hideSidebarOnMobile();
 *
 * // Mostrar ao clicar no botão voltar
 * showSidebar();
 */
export function useSidebarVisibility(isMobile: { value: boolean }) {
  const isSidebarVisible = ref(true);

  function hideSidebarOnMobile(): void {
    if (isMobile.value) {
      isSidebarVisible.value = false;
    }
  }

  function showSidebar(): void {
    isSidebarVisible.value = true;
  }

  return {
    isSidebarVisible,
    hideSidebarOnMobile,
    showSidebar,
  };
}
