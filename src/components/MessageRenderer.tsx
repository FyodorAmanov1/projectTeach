import React from 'react';
import CodeBlock from './CodeBlock';
import { CodeExample } from '../services/teacherApi';

interface MessageRendererProps {
  content: string;
  codeExamples?: CodeExample[];
  relatedTopics?: string[];
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ 
  content, 
  codeExamples = [], 
  relatedTopics = [] 
}) => {
  const renderContent = (text: string) => {
    // Split content by code blocks (```language...```)
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const lines = part.slice(3, -3).split('\n');
        const language = lines[0] || 'text';
        const code = lines.slice(1).join('\n');
        
        return (
          <CodeBlock
            key={index}
            code={code}
            language={language}
            explanation=""
          />
        );
      }
      
      // Regular text content with markdown-like formatting
      return (
        <div key={index} className="whitespace-pre-wrap">
          {formatText(part)}
        </div>
      );
    });
  };

  const formatText = (text: string) => {
    // Simple markdown-like formatting
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-bold text-blue-400 mt-6 mb-3">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-2xl font-bold text-blue-400 mt-6 mb-4">
              {line.slice(2)}
            </h1>
          );
        }
        
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
        
        // Code spans
        line = line.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-700 rounded text-blue-300 font-mono text-sm">$1</code>');
        
        // List items
        if (line.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start space-x-2 my-1">
              <span className="text-blue-400 mt-1">•</span>
              <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
            </div>
          );
        }
        
        // Regular paragraphs
        if (line.trim()) {
          return (
            <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: line }} />
          );
        }
        
        return <br key={index} />;
      });
  };

  return (
    <div className="space-y-2">
      {renderContent(content)}
      
      {/* Code Examples */}
      {codeExamples.length > 0 && (
        <div className="mt-6">
          {codeExamples.map((example, index) => (
            <CodeBlock
              key={index}
              code={example.code}
              language={example.language}
              explanation={example.explanation}
            />
          ))}
        </div>
      )}
      
      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-400 mb-2">Related Topics:</h4>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded border border-blue-600/30"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRenderer;