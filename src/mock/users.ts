// ============================================
// TIPOS
// ============================================

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

// Gera o caminho da imagem do avatar baseado no nome formatado
export function getAvatarPath(formattedName: string): string {
  return `/src/assets/images/avatar/${formattedName}.png`;
}

// ============================================
// DADOS MOCK
// ============================================

/*
Lista de usuários mock para o chat

Cada usuário possui:
- id: identificador único (1 a 8)
- name: nome completo do usuário
- avatar: caminho gerado automaticamente baseado no nome
*/
export const mockUsers: User[] = [
  { id: '1', name: 'Carlos Mendes', avatar: getAvatarPath('carlos-mendes') },
  { id: '2', name: 'Luiz Ferreira', avatar: getAvatarPath('luiz-ferreira') },
  { id: '3', name: 'Maria Silva', avatar: getAvatarPath('maria-silva') },
  { id: '4', name: 'Ana Costa', avatar: getAvatarPath('ana-costa') },
  { id: '5', name: 'João Pereira', avatar: getAvatarPath('joao-pereira') },
  { id: '6', name: 'Fernanda Alves', avatar: getAvatarPath('fernanda-alves') },
  { id: '7', name: 'Ricardo Lima', avatar: getAvatarPath('ricardo-lima') },
  { id: '8', name: 'Beatriz Souza', avatar: getAvatarPath('beatriz-souza') },
];
