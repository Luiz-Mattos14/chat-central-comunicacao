// mock/combined.ts

import { mockConversations, type Conversation } from './conversations';
import { mockUsers, type User } from './users';

export type ConversationWithUser = Conversation & {
  user: User;
};

export const getConversationsWithUsers = (): ConversationWithUser[] => {
  //   console.log('mockConversations:', mockConversations);
  //   console.log('mockUsers:', mockUsers);

  const result = mockConversations
    .map((conversation) => {
      const user = mockUsers.find((u) => u.id === conversation.userId);

      if (!user) {
        console.error(`User not found for userId: ${conversation.userId}`);
        return null;
      }

      return {
        ...conversation,
        user,
      };
    })
    .filter(Boolean) as ConversationWithUser[];

  //   console.log('Resultado combinado:', result);
  return result;
};
