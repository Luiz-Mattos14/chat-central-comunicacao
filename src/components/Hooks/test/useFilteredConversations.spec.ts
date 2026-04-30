import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useFilteredConversations } from '../useFilteredConversations';

describe('useFilteredConversations', () => {
  const mockConversations = ref([
    { id: '1', user: { name: 'Carlos' }, isArchived: false },
    { id: '2', user: { name: 'Ana' }, isArchived: true },
    { id: '3', user: { name: 'Bruno' }, isArchived: false },
  ] as any);

  it('deve filtrar apenas não arquivadas', () => {
    const filtered = useFilteredConversations(mockConversations, ref(false), ref(''));
    expect(filtered.value).toHaveLength(2);
  });

  it('deve filtrar apenas arquivadas', () => {
    const filtered = useFilteredConversations(mockConversations, ref(true), ref(''));
    expect(filtered.value).toHaveLength(1);
  });

  it('deve filtrar por nome', () => {
    const filtered = useFilteredConversations(mockConversations, ref(false), ref('carlos'));
    expect(filtered.value).toHaveLength(1);
    expect(filtered.value[0].user.name).toBe('Carlos');
  });

  it('deve combinar filtros', () => {
    const filtered = useFilteredConversations(mockConversations, ref(true), ref('ana'));
    expect(filtered.value).toHaveLength(1);
    expect(filtered.value[0].user.name).toBe('Ana');
  });
});
