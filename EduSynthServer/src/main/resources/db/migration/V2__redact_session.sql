-- Добавление колонки session_code в таблицу sessions
ALTER TABLE sessions
ADD COLUMN session_code VARCHAR(255) NOT NULL UNIQUE;
