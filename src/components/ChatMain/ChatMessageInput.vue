<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Icons from '../Commons/Icons.vue';

// ============================================
// EVENTOS
// ============================================
const emit = defineEmits<{
  (e: 'send', text: string): void; // Quando envia mensagem
  (e: 'send-file', file: File): void; // Quando envia arquivo
  (e: 'focus'): void; // Quando clica/foca no input
}>();

// ============================================
// ESTADOS
// ============================================

const text = ref(''); // Texto digitado
const textareaRef = ref<HTMLTextAreaElement | null>(null); // Referência ao textarea
const fileInputRef = ref<HTMLInputElement | null>(null); // Referência ao input de arquivo

// ============================================
// MÉTODOS
// ============================================

// Dispara o evento de foco quando o usuário clica no input
function handleFocus(): void {
  emit('focus');
}

// Envia a mensagem digitada
function sendMessage(): void {
  const content = text.value.trim();
  if (!content) return;

  emit('send', content);
  text.value = '';

  // Reseta a altura do textarea após enviar
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto';
    }
  });
}

// Abre o seletor de arquivos
function triggerFileInput(): void {
  fileInputRef.value?.click();
}

// Processa o arquivo selecionado
function handleFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // Verifica se é imagem (png, jpg, jpeg)
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedTypes.includes(file.type)) {
    emit('send-file', file);
  } else {
    alert('Apenas arquivos PNG, JPG ou JPEG são permitidos');
  }

  // Limpa o input para permitir selecionar o mesmo arquivo novamente
  input.value = '';
}

/**
Gerencia as teclas pressionadas:
- Enter: envia a mensagem
- Shift + Enter: quebra a linha (comportamento natural)
*/
function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Ajusta automaticamente a altura do textarea conforme o texto cresce
function autoResize(): void {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
}
</script>

<template>
  <div class="message-wrapper">
    <div class="message-input">
      <textarea
        ref="textareaRef"
        v-model="text"
        @keydown="handleKeyDown"
        @input="autoResize"
        @focus="handleFocus"
        placeholder="Escreva uma mensagem"
        rows="1"
      />

      <div class="file-message" @click="triggerFileInput">
        <Icons name="clip" :size="18" />
        <input
          ref="fileInputRef"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          @change="handleFileSelect"
          style="display: none"
        />
      </div>

      <button @click="sendMessage" :disabled="!text.trim()" class="send-btn">
        Enviar
        <Icons name="clip" :size="15" />
      </button>
    </div>

    <div class="info-message">
      <p class="description">
        0/2000 caracteres | Shift + Enter para adicionar uma nova linha | Envie imagens PNG, JPG
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-wrapper {
  display: flex;
  flex-direction: column;
}

.message-input {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  align-items: center;

  textarea {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 0.6rem;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    max-height: 120px;
    line-height: 1.4;
    overflow: hidden;

    &:focus {
      border-color: var(--color-base);
    }
  }

  .file-message {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  .file-message svg {
    color: var(--dark-blue);
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    width: max-content;
    height: 3.8rem;
    background-color: var(--dark-blue);
    border-radius: 0.6rem;
    color: white;
    font-size: 1.4rem;
    border: none;
    cursor: pointer;
    padding: 0.8rem 1.2rem;
    transition: background 0.2s;

    &:hover {
      opacity: 0.8;
    }

    svg {
      height: 1.4rem;
      width: 1.4rem;
    }
  }
}

.info-message {
  padding: 12px 16px;

  p {
    color: var(--color-base);
    font-size: var(--font-size-small);
  }
}
</style>
