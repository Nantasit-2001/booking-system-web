'use client'

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'
import { askQuestionToBot } from '@/services/chat'
import { useAuth } from '@clerk/nextjs';

export type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export type FloatingChatHandle = {
  openChat: () => void
}

const FloatingChat = forwardRef<FloatingChatHandle>((props, ref) => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [token,setToken] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const {getToken} = useAuth();

  useImperativeHandle(ref, () => ({
    openChat() {
      setOpen(true)
    }
  }))

  const handleSend = async () => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
    }

    const typingIndicator: Message = {
      id: Date.now() + 1,
      text: '🤖 Thinking...',
      sender: 'bot',
    }
    setMessages((prev) => [...prev, userMessage, typingIndicator])
    setText('')
    const replyText = await askQuestionToBot(userMessage.text, messages, token)

    setMessages((prev) => [
      ...prev.filter((msg) => msg.id !== typingIndicator.id),
      {
        id: Date.now() + 2,
        text: replyText,
        sender: 'bot',
      },
    ])
  }

  useEffect(() => {
    const fetchToken = async () => {
      const t = await getToken();
      if (t) setToken(t);
    };
    fetchToken();
  }, [getToken]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      {/* ปุ่มเปิดแชท */}
      <button
        onClick={() => setOpen((prev) => !prev)}  // กดเปิดอย่างเดียว ไม่ toggle
        className="cursor-pointer fixed bottom-5 right-5 bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-xl z-100 "
      >
        💬
      </button>

      {/* กล่องแชท */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-18 right-5 w-80 max-h-[500px] flex flex-col bg-white border border-gray-500 rounded-xl shadow-xl z-50"
        >
          {/* หัวแชท */}
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">
            🌟 Chat Assistant
            <button
              onClick={() => setOpen(false)}
              className="text-white font-bold text-lg"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* รายการข้อความ */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] p-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                }`}
              >
                {(msg.sender === 'bot' && msg.text !== '🤖 Thinking...') ? '🤖 respond: ' + msg.text : msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className='text-center text-gray-400 text-[12px] pb-2'>No chat history is kept.</div>
          {/* กล่องป้อนข้อความ */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex p-2 border-t gap-2"
          >
            <input
              type="text"
              className="flex-1 border px-2 py-1 rounded"
              placeholder="พิมพ์ข้อความ..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </>
  )
})

export default FloatingChat
