import React from 'react';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { Chat } from '../types';
import { formatDate, truncateText } from '../utils/helpers';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClose
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Chat History</h2>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {chats.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No chats yet</p>
            <p className="text-sm">Start a conversation to see your chat history</p>
          </div>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                  currentChatId === chat.id
                    ? 'bg-blue-600/20 border border-blue-600/30'
                    : 'hover:bg-gray-700/50'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(chat.updatedAt)} • {chat.messages.length} messages
                    </p>
                    {chat.messages.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {truncateText(chat.messages[chat.messages.length - 1].content, 50)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;