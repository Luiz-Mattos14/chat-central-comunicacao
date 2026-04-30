// ============================================
// HOOK PARA GERENCIAR EVENTOS DO CHAT
// ============================================

/**
 * Centraliza os eventos emitidos pelo chat
 *
 * Função emit do Vue
 *
 * handleInputFocus - Emite evento de foco no input
 * handleArchive - Emite evento para arquivar/desarquivar conversa
 * handleBack - Emite evento para voltar (mobile)
 */
export function useChatEvents(emit: any, selectedConversation: any) {
  // Dispara quando o usuário clica no input de mensagem
  function handleInputFocus(): void {
    emit('focus');
  }

  // Dispara o evento de arquivar a conversa atual
  function handleArchive(): void {
    if (selectedConversation.value) {
      emit('archive', selectedConversation.value.id);
    }
  }

  // Dispara o evento de voltar (mobile)
  function handleBack(): void {
    console.log('🔄 ChatMain: emitindo back');
    emit('back');
  }

  return {
    handleInputFocus,
    handleArchive,
    handleBack,
  };
}
