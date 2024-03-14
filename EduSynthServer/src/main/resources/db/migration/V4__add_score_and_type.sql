ALTER TABLE participants
    ADD COLUMN score INTEGER NOT NULL default 0;

ALTER TABLE sessions
    ADD COLUMN session_state VARCHAR(255);