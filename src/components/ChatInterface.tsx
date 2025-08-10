import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Chat, Message } from '../types';
import { generateId } from '../utils/helpers';

interface ChatInterfaceProps {
  chat: Chat | undefined;
  onUpdateChat: (chat: Chat) => void;
  onNewChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chat, onUpdateChat, onNewChat }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    // Simulate AI response (replace with actual API call)
    try {
      const aiResponse = await simulateAIResponse(message);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: aiResponse,
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

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Algorithm-specific responses
    if (lowerMessage.includes('sorting') || lowerMessage.includes('sort')) {
      return `Great question about sorting algorithms! Here are the main sorting algorithms you should know:

**Bubble Sort** - O(n²) time complexity
- Simple but inefficient for large datasets
- Good for educational purposes

**Quick Sort** - O(n log n) average, O(n²) worst case
- Divide and conquer approach
- Very efficient in practice

**Merge Sort** - O(n log n) guaranteed
- Stable sorting algorithm
- Good for large datasets

**Heap Sort** - O(n log n) time complexity
- In-place sorting algorithm
- Uses binary heap data structure

Would you like me to explain any of these in detail or show you implementation examples?`;
    }
    
    if (lowerMessage.includes('binary search') || lowerMessage.includes('search')) {
      return `Binary search is a fundamental algorithm! Here's what you need to know:

**Time Complexity:** O(log n)
**Space Complexity:** O(1) iterative, O(log n) recursive

**Key Requirements:**
- Array must be sorted
- Uses divide and conquer strategy

**Basic Algorithm:**
1. Find the middle element
2. Compare with target
3. Eliminate half the search space
4. Repeat until found or exhausted

**Implementation tip:** Always be careful with the boundary conditions to avoid infinite loops.

Would you like to see a code example or practice some binary search problems?`;
    }
    
    if (lowerMessage.includes('dynamic programming') || lowerMessage.includes('dp')) {
      return `Dynamic Programming is a powerful problem-solving technique! Here's a structured approach:

**Core Principles:**
1. **Optimal Substructure** - Solution can be constructed from optimal solutions of subproblems
2. **Overlapping Subproblems** - Same subproblems are solved multiple times

**Common Patterns:**
- **Fibonacci Sequence** - Classic example
- **Knapsack Problems** - Resource optimization
- **Longest Common Subsequence** - String problems
- **Coin Change** - Counting problems

**Approaches:**
- **Top-down (Memoization)** - Recursive with caching
- **Bottom-up (Tabulation)** - Iterative approach

**Tip:** Start by identifying the recurrence relation, then optimize with memoization.

Which DP pattern would you like to explore further?`;
    }
    
    if (lowerMessage.includes('graph') || lowerMessage.includes('tree')) {
      return `Graph and Tree algorithms are essential for many problems! Here's an overview:

**Tree Traversals:**
- **Preorder** - Root, Left, Right
- **Inorder** - Left, Root, Right (gives sorted order for BST)
- **Postorder** - Left, Right, Root
- **Level Order** - Breadth-first traversal

**Graph Algorithms:**
- **DFS (Depth-First Search)** - Explore as far as possible
- **BFS (Breadth-First Search)** - Explore neighbors first
- **Dijkstra's Algorithm** - Shortest path (weighted)
- **Union-Find** - Detect cycles, connected components

**Common Applications:**
- Finding connected components
- Detecting cycles
- Shortest path problems
- Topological sorting

What specific graph or tree problem would you like to discuss?`;
    }

    if (lowerMessage.includes('time complexity') || lowerMessage.includes('big o')) {
      return `Understanding time complexity is crucial for algorithm analysis! Here's a comprehensive guide:

**Common Time Complexities (from best to worst):**
- **O(1)** - Constant time (hash table lookup)
- **O(log n)** - Logarithmic (binary search)
- **O(n)** - Linear (array traversal)
- **O(n log n)** - Linearithmic (efficient sorting)
- **O(n²)** - Quadratic (nested loops)
- **O(2^n)** - Exponential (recursive Fibonacci)
- **O(n!)** - Factorial (traveling salesman)

**Analysis Tips:**
- Drop constants and lower-order terms
- Focus on the worst-case scenario
- Consider input size growth
- Analyze loops and recursive calls

**Space Complexity:** Don't forget to consider memory usage!

Would you like me to analyze the complexity of a specific algorithm?`;
    }
    
    // General responses
    const responses = [
      `That's an interesting algorithm question! Let me help you understand this concept better. 

Algorithm design often involves trade-offs between time complexity, space complexity, and implementation simplicity. When approaching any problem, I recommend:

1. **Understand the problem** - What are the inputs and expected outputs?
2. **Consider constraints** - What are the limits on input size?
3. **Think of approaches** - Brute force first, then optimize
4. **Analyze complexity** - Time and space requirements
5. **Code and test** - Implementation with edge cases

What specific aspect would you like to dive deeper into?`,
      
      `Great question! Algorithm learning is all about practice and understanding patterns. Here are some key strategies:

**Problem-Solving Approach:**
- Start with simple examples
- Identify patterns and common techniques
- Practice similar problems to reinforce concepts
- Don't just memorize - understand the 'why'

**Common Algorithm Categories:**
- Array/String manipulation
- Two pointers technique
- Sliding window
- Hash maps for optimization
- Recursion and backtracking
- Dynamic programming

Would you like to practice problems in any of these categories?`,

      `Excellent! That's exactly the kind of thinking that leads to algorithmic mastery. Let me break this down:

When solving algorithm problems, always consider:
- **Input validation** - Handle edge cases
- **Algorithm choice** - Best approach for the constraints
- **Optimization opportunities** - Can we do better?
- **Code clarity** - Readable and maintainable

The key is to build your problem-solving toolkit gradually. Each algorithm you learn becomes a tool you can use for future problems.

What would you like to explore next?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
                <div className="whitespace-pre-wrap break-words">
                  {msg.content}
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