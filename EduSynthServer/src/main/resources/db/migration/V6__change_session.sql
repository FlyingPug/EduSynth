ALTER TABLE sessions
    DROP COLUMN end_time,
    ADD COLUMN current_question_index INTEGER DEFAULT 0