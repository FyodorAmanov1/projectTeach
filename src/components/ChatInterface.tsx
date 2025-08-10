import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Chat, Message } from '../types';
import { generateId } from '../utils/helpers';
import MessageRenderer from './MessageRenderer';
import { generateChatResponse } from '../services/huggingfaceApi';

interface ChatInterfaceProps {
  chat: Chat | undefined;
  onUpdateChat: (chat: Chat) => void;
  onNewChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chat, onUpdateChat, onNewChat }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    let currentChat = chat;
    if (!currentChat) {
      const newChat: Chat = {
        id: generateId(),
        title: message.slice(0, 50),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      currentChat = newChat;
    }

    const userMessage: Message = {
      id: generateId(),
      content: message.trim(),
      role: 'user',
      timestamp: new Date()
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      updatedAt: new Date(),
      title: currentChat.messages.length === 0 ? message.slice(0, 50) : currentChat.title
    };

    onUpdateChat(updatedChat);
    setMessage('');
    setIsLoading(true);

    try {
      const apiMessages = updatedChat.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await generateChatResponse(apiMessages);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response.content || "I'm sorry, I couldn't generate a response.",
        role: 'assistant',
        timestamp: new Date()
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
        updatedAt: new Date()
      };

      onUpdateChat(finalChat);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: generateId(),
        content: "I'm sorry, I encountered an error. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      const errorChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, errorMessage],
        updatedAt: new Date()
      };
      
      onUpdateChat(errorChat);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-center">
        <div className="max-w-md mx-auto">
          <Sparkles className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to Algorithm Learning Assistant</h2>
          <p className="text-gray-400 mb-8">
            Start a conversation to learn algorithms, get coding help, or discuss problem-solving strategies.
          </p>
          <button
            onClick={onNewChat}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {chat.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-4xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${msg.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div className={`px-4 py-3 rounded-xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <div className="whitespace-pre-wrap break-words prose prose-invert max-w-none prose-sm">
                  {msg.role === 'assistant' && msg === chat.messages[chat.messages.length - 1] && currentResponse ? (
                    <MessageRenderer
                      content={msg.content}
                      codeExamples={currentResponse.codeExamples}
                      relatedTopics={currentResponse.relatedTopics}
                    />
                  ) : (
                    <MessageRenderer content={msg.content} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-4xl">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about algorithms, data structures, or coding problems..."
              className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
              style={{ minHeight: '52px' }}
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;