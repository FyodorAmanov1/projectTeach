# Algorithm Learning Assistant

A modern, interactive platform for learning algorithms and data structures. This application combines an AI-powered chatbot with a practical coding interface to help users learn and practice algorithmic problem-solving.

## Features

### 1. Interactive Chat Interface
- Real-time AI-powered responses using Hugging Face's API
- Markdown support for rich text formatting
- Syntax-highlighted code examples
- Chat history persistence
- Related topics suggestions

### 2. Practice Environment
- Collection of curated algorithm problems
- Different difficulty levels (Easy, Medium, Hard)
- Interactive code editor
- Real-time test execution
- Problem categorization and filtering
- Problem descriptions with examples and constraints

### 3. User Interface
- Modern, responsive design
- Dark theme optimized for coding
- Split-pane layout for efficient workspace usage
- Mobile-friendly interface
- Persistent chat history

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Typography plugin
- **Icons**: Lucide React
- **AI Integration**: Hugging Face API
- **Code Formatting**: ESLint
- **State Management**: React Hooks and Context
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── CodeBlock.tsx       # Code display component
│   ├── MessageRenderer.tsx # Message formatting
│   ├── PracticeInterface.tsx # Practice environment
│   └── Sidebar.tsx        # Navigation sidebar
├── services/           # API and service integrations
│   ├── huggingfaceApi.ts  # AI API integration
│   └── teacherApi.ts      # Algorithm teaching logic
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
└── App.tsx           # Main application component
```

## Setup Instructions

1. **Prerequisites**
   - Node.js (version 16 or higher)
   - npm (Node Package Manager)

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Navigate to project directory
   cd project

   # Install dependencies
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   VITE_HF_TOKEN=your_huggingface_token
   ```

4. **Development**
   ```bash
   # Start development server
   npm run dev
   ```

5. **Build**
   ```bash
   # Create production build
   npm run build
   ```

## Features in Detail

### Chat Interface
- **Message Types**: Supports user and AI assistant messages
- **Code Highlighting**: Automatic syntax highlighting for code snippets
- **Markdown Support**: Rich text formatting for better readability
- **Responsive Design**: Adapts to different screen sizes
- **Local Storage**: Persists chat history between sessions

### Practice Environment
- **Problem Categories**: Various algorithmic topics
- **Difficulty Levels**: Easy, Medium, Hard
- **Test Cases**: Interactive test execution
- **Code Editor**: Syntax highlighting and auto-formatting
- **Filter & Search**: Easy problem discovery

### Teacher API
- **Algorithm Knowledge Base**: Comprehensive algorithm information
- **Dynamic Responses**: Context-aware AI responses
- **Code Examples**: Practical implementation examples
- **Related Topics**: Suggests related learning paths
- **Multiple Programming Paradigms**: Covers various approaches to problems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.