# Grace Community Church Chatbot

A friendly chatbot for Grace Community Church that answers common visitor questions about service times, location, children's programs, prayer requests, and more. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Conversational Q&A** — 30+ knowledge entries covering services, visits, family programs, pastoral care, sacraments, outreach, and more.
- **Chat persistence** — every conversation is saved to Supabase and reloads on page refresh.
- **Quick questions** — clickable suggestions for common queries.
- **Responsive design** — works on mobile and desktop with a warm, church-themed UI.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons
- **Backend:** Supabase (Postgres database with Row Level Security)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works fine)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/church-chatbot.git
   cd church-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```
   Then fill in your Supabase project URL and anon key:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the database migration. In your Supabase SQL editor, run the contents of `supabase/migrations/20260701003543_create_chat_messages_table.sql`. This creates the `chat_messages` table with Row Level Security enabled.

5. Start the dev server:
   ```bash
   npm run dev
   ```

## Customizing the Knowledge Base

The chatbot's answers are defined in `src/lib/knowledge.ts`. Each entry has keywords, a question, an answer, and a category. To add or modify answers, edit the `knowledgeBase` array in that file. The church's contact info and tagline are in the `CHURCH_INFO` object at the top of the same file.

## How It Works

1. When a user sends a message, the chat engine (`src/lib/chatEngine.ts`) tokenizes the input, removes stop words, and scores each knowledge entry by keyword and question overlap.
2. The best-scoring entry's answer is returned. If confidence is low, the bot offers the closest matches as suggestions instead of guessing.
3. Both user and bot messages are persisted to the `chat_messages` table in Supabase, and prior history loads on page refresh.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## License

This project is provided as-is for demonstration purposes.
