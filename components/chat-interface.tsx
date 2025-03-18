"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Message {
  sender: string
  content: string
}

interface ChatInterfaceProps {
  messages: Message[]
}

export function ChatInterface({ messages }: ChatInterfaceProps) {
  const chatRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0 && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }

    // Animate the last message
    if (lastMessageRef.current) {
      gsap.fromTo(
        lastMessageRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [messages])

  return (
    <div ref={chatRef} className="flex flex-col space-y-6 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`flex flex-col ${message.sender === "boy" ? "items-start" : "items-end"}`}
        >
          {/* Sender name */}
          <div className="mb-1 px-2">
            <span
              className={`text-sm font-semibold ${message.sender === "boy" ? "text-blue-600" : "text-teal-600"}`}
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              {message.sender === "boy" ? "Timothee" : "Mum"}
            </span>
          </div>

          {/* Message with avatar */}
          <div className={`flex items-start ${message.sender === "boy" ? "justify-start" : "justify-end"} w-full`}>
            {message.sender === "boy" && (
              <div className="mr-3 flex-shrink-0 h-12 w-12 overflow-hidden rounded-full">
                <img src="https://i.imgur.com/KsYETC4.png" alt="Timothee" className="h-full w-full object-cover" />
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.sender === "boy"
                  ? "bg-blue-100 text-blue-900 rounded-bl-none"
                  : "bg-teal-100 text-teal-900 rounded-br-none"
              }`}
            >
              <p className="text-lg" style={{ fontFamily: '"Patrick Hand", cursive' }}>
                {message.content}
              </p>
            </div>

            {message.sender === "mom" && (
              <div className="ml-3 flex-shrink-0 h-12 w-12 overflow-hidden rounded-full">
                <img src="https://i.imgur.com/XSf9CHN.png" alt="Mom" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

