CREATE TABLE answers
(
    id          INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    question_id INTEGER                                  NOT NULL,
    text        VARCHAR(255)                             NOT NULL,
    is_correct  BOOLEAN                                  NOT NULL,
    media_url   VARCHAR(255),
    CONSTRAINT pk_answers PRIMARY KEY (id)
);

CREATE TABLE chrono_events
(
    id          INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    question_id INTEGER                                  NOT NULL,
    text        VARCHAR(255)                             NOT NULL,
    order_index INTEGER                                  NOT NULL,
    CONSTRAINT pk_chrono_events PRIMARY KEY (id)
);

CREATE TABLE crossword_cells
(
    id           INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    question_id  INTEGER                                  NOT NULL,
    correct_text VARCHAR(255)                             NOT NULL,
    position_x   INTEGER                                  NOT NULL,
    position_y   INTEGER                                  NOT NULL,
    CONSTRAINT pk_crossword_cells PRIMARY KEY (id)
);

CREATE TABLE participant_answers
(
    id             INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    answer_id      INTEGER                                  NOT NULL,
    order_index    INTEGER,
    answer_text    VARCHAR(255),
    participant_id BIGINT                                   NOT NULL,
    question_id    INTEGER                                  NOT NULL,
    created_at     TIMESTAMP WITHOUT TIME ZONE              NOT NULL,
    CONSTRAINT pk_participant_answers PRIMARY KEY (id)
);

CREATE TABLE participants
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    session_id VARCHAR(255),
    user_id    INTEGER,
    is_leader  BOOLEAN,
    score      INTEGER                                 NOT NULL,
    CONSTRAINT pk_participants PRIMARY KEY (id)
);

CREATE TABLE question
(
    id                 INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    question_type      VARCHAR(31),
    text               VARCHAR(255)                             NOT NULL,
    media_url          VARCHAR(255),
    time_limit_seconds INTEGER,
    quiz_id            INTEGER,
    correct_answer     VARCHAR(255)                             NOT NULL,
    CONSTRAINT pk_question PRIMARY KEY (id)
);

CREATE TABLE quizzes
(
    id              INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    title           VARCHAR(255)                             NOT NULL,
    description     VARCHAR(255),
    is_public       BOOLEAN                                  NOT NULL,
    creator_id      INTEGER                                  NOT NULL,
    title_media_url VARCHAR(255),
    CONSTRAINT pk_quizzes PRIMARY KEY (id)
);

CREATE TABLE sessions
(
    id                     VARCHAR(255) NOT NULL,
    quiz_id                INTEGER,
    status                 VARCHAR(255),
    start_time             TIMESTAMP WITHOUT TIME ZONE,
    current_question_index INTEGER,
    CONSTRAINT pk_sessions PRIMARY KEY (id)
);

CREATE TABLE users
(
    id                  INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    username            VARCHAR(255),
    password_hash       VARCHAR(255),
    salt                VARCHAR(255),
    email               VARCHAR(255),
    balance             INTEGER                                  NOT NULL,
    profile_picture_url VARCHAR(255)                             NOT NULL,
    role                VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE answers
    ADD CONSTRAINT FK_ANSWERS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES question (id);

ALTER TABLE chrono_events
    ADD CONSTRAINT FK_CHRONO_EVENTS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES question (id);

ALTER TABLE crossword_cells
    ADD CONSTRAINT FK_CROSSWORD_CELLS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES question (id);

ALTER TABLE participants
    ADD CONSTRAINT FK_PARTICIPANTS_ON_SESSION FOREIGN KEY (session_id) REFERENCES sessions (id);

ALTER TABLE participants
    ADD CONSTRAINT FK_PARTICIPANTS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE participant_answers
    ADD CONSTRAINT FK_PARTICIPANT_ANSWERS_ON_PARTICIPANT FOREIGN KEY (participant_id) REFERENCES participants (id);

ALTER TABLE participant_answers
    ADD CONSTRAINT FK_PARTICIPANT_ANSWERS_ON_QUESTION FOREIGN KEY (question_id) REFERENCES question (id);

ALTER TABLE question
    ADD CONSTRAINT FK_QUESTION_ON_QUIZ FOREIGN KEY (quiz_id) REFERENCES quizzes (id);

ALTER TABLE quizzes
    ADD CONSTRAINT FK_QUIZZES_ON_CREATOR FOREIGN KEY (creator_id) REFERENCES users (id);

ALTER TABLE sessions
    ADD CONSTRAINT FK_SESSIONS_ON_QUIZ FOREIGN KEY (quiz_id) REFERENCES quizzes (id);