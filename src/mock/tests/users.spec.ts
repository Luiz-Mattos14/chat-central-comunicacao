import { describe, it, expect } from 'vitest';
import { getAvatarPath, mockUsers } from '../users';

describe('Users Mock', () => {
  it('deve gerar caminho do avatar corretamente', () => {
    expect(getAvatarPath('carlos-mendes')).toBe('/src/assets/images/avatar/carlos-mendes.png');
    expect(getAvatarPath('maria-silva')).toBe('/src/assets/images/avatar/maria-silva.png');
  });

  it('deve ter 8 usuários', () => {
    expect(mockUsers).toHaveLength(8);
  });

  it('deve ter usuários com id, nome e avatar', () => {
    mockUsers.forEach((user) => {
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.avatar).toBeDefined();
    });
  });

  it('deve ter Carlos Mendes como primeiro usuário', () => {
    expect(mockUsers[0].name).toBe('Carlos Mendes');
    expect(mockUsers[0].id).toBe('1');
  });
});
