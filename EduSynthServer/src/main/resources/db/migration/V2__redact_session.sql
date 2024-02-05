-- Добавление колонки session_code в таблицу sessions
ALTER TABLE sessions
ADD COLUMN session_code VARCHAR(255) NOT NULL UNIQUE;

-- Добавление колонки title_media_url в таблицу quizzes
ALTER TABLE quizzes
ADD COLUMN title_media_url VARCHAR(255);
