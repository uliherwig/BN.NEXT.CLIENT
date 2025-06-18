// components/InfoBoxStack.tsx
'use client'

import { useInfoBoxStore } from '@/service/infobox-store'

export function InfoBoxStack() {
  const { messages, remove } = useInfoBoxStore()

  if (messages.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50 w-full max-w-md px-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-4 rounded shadow-lg text-white flex justify-between items-center
            ${msg.type === 'info' && 'bg-blue-500'}
            ${msg.type === 'success' && 'bg-green-500'}
            ${msg.type === 'error' && 'bg-red-500'}
            ${msg.type === 'loading' && 'bg-yellow-400 text-black'}`}
        >
          <span>{msg.message}</span>
          <button
            className="ml-4 text-sm font-bold"
            onClick={() => remove(msg.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
