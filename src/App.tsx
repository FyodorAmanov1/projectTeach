import React, { useState, useEffect } from 'react';
import { MessageSquare, Code, Plus, Menu, X, Bot, User, Send, Play } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import PracticeInterface from './components/PracticeInterface';
import Sidebar from './components/Sidebar';
import { Chat } from './types';
import { generateId } from './utils/helpers';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'practice'>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('algorithm-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('algorithm-chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: generateId(),
      title: 'New Algorithm Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
  };

  const updateChat = (updatedChat: Chat) => {
    setChats(chats.map(chat => 
      chat.id === updatedChat.id ? updatedChat : chat
    ));
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-800 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={selectChat}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Algorithm Learning Assistant</h1>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'chat' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'practice' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Code className="h-4 w-4" />
                <span>Practice</span>
              </button>
            </nav>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {activeTab === 'chat' ? (
            <ChatInterface 
              chat={currentChat} 
              onUpdateChat={updateChat}
              onNewChat={createNewChat}
            />
          ) : (
            <PracticeInterface />
          )}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;