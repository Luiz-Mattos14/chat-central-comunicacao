import { describe, it, expect } from 'vitest';
import { getConversationsWithUsers } from '../combined';

// ============================================
// TESTES
// ============================================

/*
Comando para executar o teste
npm run test -- combined.spec.ts
*/

/**
 * Suite de testes para o módulo Combined Mock
 *
 * Testa se a função getConversationsWithUsers() está combinando
 * corretamente os dados de conversas e usuários
 */
describe('Combined Mock', () => {
  it('deve retornar conversas com lastMessage baseado no startPositionMessage', () => {
    const result = getConversationsWithUsers();

    // conv1: startPositionMessage = 2, pega a mensagem do índice 1
    const conv1 = result.find((c) => c.id === 'conv1');
    expect(conv1?.lastMessage).toBe('Bom dia Roberto, por aqui tudo certo! E com você?');

    // conv5: startPositionMessage = 3, pega a mensagem do índice 2
    const conv5 = result.find((c) => c.id === 'conv5');
    expect(conv5?.lastMessage).toBe('Atrasamos por causa do feriado.');

    console.log('✅ Teste passou!');
  });
});
