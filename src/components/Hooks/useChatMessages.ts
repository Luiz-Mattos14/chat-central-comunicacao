import { ref, watch } from 'vue';
import type { Message } from '../../mock/conversations';

// ============================================
// HOOK PARA GERENCIAR MENSAGENS DO CHAT
// ============================================

/**
 * Gerencia o estado das mensagens do chat, incluindo:
 * - Mensagens exibidas atualmente
 * - Indicador de "Digitando..."
 * - Envio de novas mensagens
 * - Envio de imagens
 * - Carregamento progressivo das mensagens do mock
 */
export function useChatMessages(selectedConversation: any) {
  // Controla se está mostrando "Digitando..."
  const isTyping = ref(false);

  // Mensagens atualmente exibidas no chat
  const currentMessages = ref<Message[]>([]);

  // Índice atual no array de mensagens do mock
  const currentIndex = ref(0);

  // Retorna o horário atual formatado (HH:MM)
  function getCurrentTimestamp(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Envia uma nova mensagem digitada pelo usuário
  function sendMessage(text: string, emitSendMessage: (text: string) => void): void {
    if (!selectedConversation.value) return;

    emitSendMessage(text); // Notifica o App

    const totalMessages = selectedConversation.value.messages.length;

    // Adiciona a mensagem do usuário
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      timestamp: getCurrentTimestamp(),
    };

    currentMessages.value = [...currentMessages.value, newUserMessage];

    // Carrega a próxima mensagem do mock (se houver)
    if (currentIndex.value < totalMessages) {
      isTyping.value = true; // Mostra "Digitando..."

      setTimeout(() => {
        isTyping.value = false; // Esconde "Digitando..."
        currentIndex.value++; // Avança posição
        const nextMockMessage = selectedConversation.value!.messages[currentIndex.value - 1];
        currentMessages.value = [...currentMessages.value, nextMockMessage];
      }, 1500);
    }
  }

  // Envia uma imagem
  function sendImage(file: File, emitSendMessage: (text: string) => void): void {
    if (!selectedConversation.value) return;

    // Cria URL temporária para a imagem
    const imageUrl = URL.createObjectURL(file);

    // Notifica o App
    emitSendMessage('[Imagem enviada]');

    // Adiciona a mensagem com imagem
    const newImageMessage: Message = {
      id: `image-${Date.now()}`,
      text: '',
      sender: 'user',
      timestamp: getCurrentTimestamp(),
      imageUrl: imageUrl,
      isImage: true,
    };

    currentMessages.value = [...currentMessages.value, newImageMessage];

    // Carrega a próxima mensagem do mock (se houver)
    const totalMessages = selectedConversation.value.messages.length;
    if (currentIndex.value < totalMessages) {
      isTyping.value = true;

      setTimeout(() => {
        isTyping.value = false;
        currentIndex.value++;
        const nextMockMessage = selectedConversation.value!.messages[currentIndex.value - 1];
        currentMessages.value = [...currentMessages.value, nextMockMessage];
      }, 1500);
    }
  }

  // Quando a conversa selecionada muda, reinicia as mensagens
  watch(
    () => selectedConversation.value,
    (newConversation) => {
      if (newConversation) {
        currentIndex.value = newConversation.startPositionMessage;
        currentMessages.value = newConversation.messages.slice(0, currentIndex.value);
      }
    },
    { immediate: true }
  );

  return {
    isTyping,
    currentMessages,
    sendMessage,
    sendImage,
  };
}
