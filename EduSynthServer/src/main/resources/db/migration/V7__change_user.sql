ALTER TABLE users
    ADD COLUMN balance INTEGER NOT NULL default 0,
    ADD COLUMN profile_picture_url VARCHAR(255) default '';