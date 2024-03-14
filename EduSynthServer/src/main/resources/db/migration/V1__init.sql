-- Создание таблицы пользователей
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       role VARCHAR(20) NOT NULL
);

-- Создание таблицы тестов (quizzes)
CREATE TABLE quizzes (
                         id SERIAL PRIMARY KEY,
                         title VARCHAR(100) NOT NULL,
                         description TEXT,
                         is_public BOOLEAN NOT NULL,
                         creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы вопросов
CREATE TABLE questions (
                           id SERIAL PRIMARY KEY,
                           text TEXT NOT NULL,
                           media_url VARCHAR(255), -- Ссылка на медиа, если есть
                           type VARCHAR(20) NOT NULL, -- Тип вопроса (например, "multiple_choice", "true_false")
                           time_limit_seconds INTEGER -- Ограничение во времени на вопрос, если есть
    -- Дополнительные поля вопроса, если необходимо
);

-- Создание таблицы ответов
CREATE TABLE answers (
                         id SERIAL PRIMARY KEY,
                         question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
                         text TEXT NOT NULL,
                         is_correct BOOLEAN NOT NULL,
                         media_url VARCHAR(255) -- Ссылка на медиа, если есть
    -- Дополнительные поля ответа, если необходи
);

-- Создание таблицы сессий
CREATE TABLE sessions (
                          id SERIAL PRIMARY KEY,
                          quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
                          start_time TIMESTAMP NOT NULL,
                          end_time TIMESTAMP
    -- Дополнительные поля сессии, если необходимо
);

-- Создание таблицы участников
CREATE TABLE participants (
                              id SERIAL PRIMARY KEY,
                              session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
                              user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                              is_leader BOOLEAN NOT NULL
    -- Дополнительные поля участника, если необходимо
);

-- Создание таблицы связи между участниками и ответами (многие ко многим)
CREATE TABLE participant_answers (
                                     participant_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
                                     answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
                                     PRIMARY KEY (participant_id, answer_id)
);