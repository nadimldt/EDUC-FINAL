"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { CartoonBoy } from "./cartoon-boy"
import { CartoonMom } from "./cartoon-mom"

interface Message {
  sender: string
  content: string
}

interface MessageThreadProps {
  messages: Message[]
}

export function MessageThread({ messages }: MessageThreadProps) {
  const threadRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0 && threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
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
    <div ref={threadRef} className="flex flex-col space-y-6 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`flex items-start ${message.sender === "timothee" ? "justify-start" : "justify-end"}`}
        >
          {message.sender === "timothee" && (
            <div className="mr-3 flex-shrink-0 h-12 w-12 overflow-hidden rounded-full">
              <div className="chat-avatar-boy scale-[0.6] transform-gpu origin-center">
                <CartoonBoy isAvatar={true} />
              </div>
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
              message.sender === "timothee"
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
              <div className="chat-avatar-mom scale-[0.6] transform-gpu origin-center">
                <CartoonMom isAvatar={true} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

