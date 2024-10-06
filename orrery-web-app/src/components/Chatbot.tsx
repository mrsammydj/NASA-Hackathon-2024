"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { user: true, text: input };
    setMessages([...messages, newMessage]);

    // Placeholder for AI response. Replace with API call if needed.
    setTimeout(() => {
      const botResponse = generateBotResponse();
      setMessages(prevMessages => [...prevMessages, { user: false, text: botResponse }]);
    }, 1000);

    setInput('');
  };

  const generateBotResponse = (userInput: string): string => {
    return "I'm here to help you explore the wonders of space! 🌌 What else would you like to know?";
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 rounded-full p-4 cursor-pointer shadow-lg transition-all duration-300 hover:bg-blue-500"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
        )}
      </div>

      {/* Chatbot Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 h-[500px] rounded-lg bg-gray-900 text-white shadow-lg flex flex-col overflow-hidden"
          >
            <div className="bg-gray-800 py-4 px-4 text-center font-semibold text-yellow-400">
              <h2>Space Exploration Assistant 🌠</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.user
                      ? 'bg-blue-600 text-white self-end'
                      : 'bg-gray-700 text-yellow-300 self-start'
                  } p-3 rounded-lg max-w-xs w-fit`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 p-4 flex items-center bg-gray-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about space..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
