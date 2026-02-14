import { create } from 'zustand';
import type { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  toggleChat: () => void;
  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      text: 'Welcome to NexusTradr Support! How can I help you today?',
      sender: 'support',
      timestamp: new Date().toISOString(),
    },
  ],
  isOpen: false,
  isTyping: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  sendMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          text,
          sender: 'user',
          timestamp: new Date().toISOString(),
        },
      ],
    })),
}));
