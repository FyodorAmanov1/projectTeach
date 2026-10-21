# projectTeach · Algorithm Learning Assistant

**Move between asking about an algorithm and exploring a coding exercise in the same interface.**

projectTeach is a React and TypeScript prototype for learning algorithms and data structures. It combines a conversational view, code-formatted explanations, persistent local chat history and a practice workspace built with Vite and Tailwind CSS.

## What you can explore

- Create, switch between and delete algorithm-learning conversations.
- Keep conversation history in browser local storage.
- Read explanations and formatted code examples.
- Browse practice problems by topic, search term and difficulty.
- Load starter code and inspect the example-result interface.
- Use the responsive sidebar and separate chat/practice views.

The practice runner currently **simulates pass/fail outcomes**; it does not execute or grade the submitted code. Its results demonstrate the interface interaction, not the correctness of a solution.

## Chat integration

The active chat component calls the Hugging Face router through [src/services/huggingfaceApi.ts](src/services/huggingfaceApi.ts). A separate [teacherApi.ts](src/services/teacherApi.ts) contains a topic-oriented knowledge base and response logic. These are distinct paths; the existence of the local knowledge base does not mean it handles the active chat requests.

## Run locally

Use Node.js/npm, then run from the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The UI and practice demonstration can be inspected independently of a successful remote chat response. Chat needs compatible provider access and the configuration expected by its service module.

The current adapter reads `VITE_HF_TOKEN` in the browser. Vite client variables are exposed to users of the built application; a public deployment should move authenticated model requests behind a server endpoint rather than ship a private provider token.

## Code map

| File | Responsibility |
|---|---|
| [src/App.tsx](src/App.tsx) | View switching and conversation state |
| [ChatInterface](src/components/ChatInterface.tsx) | Conversation interaction |
| [PracticeInterface](src/components/PracticeInterface.tsx) | Problem selection and simulated results |
| [huggingfaceApi](src/services/huggingfaceApi.ts) | External chat adapter |
| [API.md](API.md) | Additional design and integration notes |

## Scope

This repository demonstrates an educational frontend and a model-service adapter. It does not yet include an isolated code-execution backend, account synchronization or evidence that the tutoring improves learning outcomes. Saved history belongs to the current browser, not a shared account.
