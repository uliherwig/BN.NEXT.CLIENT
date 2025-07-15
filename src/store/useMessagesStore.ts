// store/useMessagesStore.ts
import { DisplayMessage } from '@/models/common/display-message';
import { create } from 'zustand';



type MessagesState = {
  messages: DisplayMessage[];
  addMessage: (msg: DisplayMessage) => void;
  removeMessage: (id: string) => void;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg].sort((a, b) => b.Id - a.Id),
    })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages
        .filter((m) => m.Id !== id)
        .sort((a, b) => b.Id - a.Id),
    })),
}));