/*
# Create chat_messages table for church chatbot

1. Purpose
- Stores conversation history between visitors and the church chatbot.
- Each message records the role (user or bot), the text content, and a timestamp.
- This is a single-tenant, no-auth app: anyone visiting the site can chat and the
  history is shared/public (no per-user isolation).

2. New Tables
- `chat_messages`
  - `id` (uuid, primary key, auto-generated)
  - `role` (text, not null) — either 'user' or 'bot'
  - `content` (text, not null) — the message text
  - `created_at` (timestamptz, defaults to now()) — when the message was sent

3. Security
- Enable Row Level Security on `chat_messages`.
- Because this is a no-auth public chatbot, all four CRUD policies use
  `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`.
  The data is intentionally public/shared — there is no owner to check against.
- Anyone can read the conversation history and append new messages.

4. Notes
- No `user_id` column and no foreign key to `auth.users` — the app has no sign-in.
- An index on `created_at` is included so the message history can be loaded
  in chronological order efficiently.
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'bot')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_chat_messages" ON chat_messages;
CREATE POLICY "anon_update_chat_messages" ON chat_messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chat_messages" ON chat_messages;
CREATE POLICY "anon_delete_chat_messages" ON chat_messages FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at
  ON chat_messages (created_at ASC);
