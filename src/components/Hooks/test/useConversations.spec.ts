import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useConversations } from '../useConversations';
import { getConversationsWithUsers } from '../../../mock';

// Mock do getConversationsWithUsers
vi.mock('../../../mock', () => ({
  getConversationsWithUsers: vi.fn(),
}));

describe('useConversations', () => {
  const mockConversations = [
    { id: 'conv1', name: 'Conversa 1', unreadCount: 3, messages: [] },
    { id: 'conv2', name: 'Conversa 2', unreadCount: 0, messages: [] },
    { id: 'conv3', name: 'Conversa 3', unreadCount: 1, messages: [] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Retorna uma CÓPIA dos dados para evitar mutação entre testes
    (getConversationsWithUsers as any).mockReturnValue(JSON.parse(JSON.stringify(mockConversations)));
  });

  it('deve carregar conversas', () => {
    const { loadConversations, conversationsWithUsers } = useConversations();

    const result = loadConversations();

    expect(getConversationsWithUsers).toHaveBeenCalled();
    expect(result).toEqual(mockConversations);
    expect(conversationsWithUsers.value).toEqual(mockConversations);
  });

  it('deve iniciar com valores padrão', () => {
    const { selectedId, searchQuery, showArchived } = useConversations();

    expect(selectedId.value).toBe(null);
    expect(searchQuery.value).toBe('');
    expect(showArchived.value).toBe(false);
  });

  it('deve alternar showArchived e resetar selectedId', () => {
    const { showArchived, selectedId, toggleArchived } = useConversations();

    toggleArchived();
    expect(showArchived.value).toBe(true);
    expect(selectedId.value).toBe(null);

    toggleArchived();
    expect(showArchived.value).toBe(false);
    expect(selectedId.value).toBe(null);
  });

  it('deve selecionar conversa e zerar unreadCount', () => {
    const { selectConversation, conversationsWithUsers, selectedId, loadConversations } = useConversations();
    loadConversations(); // Carrega os dados primeiro

    const conversation = selectConversation('conv1');

    expect(selectedId.value).toBe('conv1');
    expect(conversation).toBeDefined();
    expect(conversationsWithUsers.value[0].unreadCount).toBe(0);
  });

  it('deve retornar undefined quando conversa não existe', () => {
    const { selectConversation, selectedId } = useConversations();

    const conversation = selectConversation('id-inexistente');

    expect(selectedId.value).toBe('id-inexistente');
    expect(conversation).toBeUndefined();
  });

  it('deve manter outras conversas inalteradas ao selecionar', () => {
    const { selectConversation, conversationsWithUsers, loadConversations } = useConversations();
    loadConversations(); // Carrega os dados primeiro

    // Seleciona conv2 (unreadCount = 0)
    selectConversation('conv2');

    // Verifica que conv1 permanece com unreadCount = 3
    expect(conversationsWithUsers.value[0].unreadCount).toBe(3);
    // Verifica que conv2 permanece com unreadCount = 0
    expect(conversationsWithUsers.value[1].unreadCount).toBe(0);
  });
});
