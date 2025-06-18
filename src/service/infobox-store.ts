// stores/useInfoBoxStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export type InfoBoxType = 'info' | 'success' | 'error' | 'loading'

export interface InfoMessage {
  id: string
  message: string
  type: InfoBoxType
}

interface InfoBoxState {
  messages: InfoMessage[]
  add: (message: string, type?: InfoBoxType) => void
  remove: (id: string) => void
  clear: () => void
}

export const useInfoBoxStore = create<InfoBoxState>()(
  persist(
    (set) => ({
      messages: [],
      add: (message, type = 'info') =>
        set((state) => ({
          messages: [...state.messages, { id: nanoid(), message, type }],
        })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),
      clear: () => set({ messages: [] }),
    }),
    {
      name: 'info-box-store', // Speichername im localStorage
    }
  )
)
