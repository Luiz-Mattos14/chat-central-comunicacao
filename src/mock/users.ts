// mock/users.ts

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

// Função para gerar o caminho da imagem baseado no nome
export const getAvatarPath = (formattedName: string): string => {
  return `/src/assets/images/avatar/${formattedName}.png`;
};

// Única lista de usuários (com avatar)
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
