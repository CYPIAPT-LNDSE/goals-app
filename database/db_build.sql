BEGIN;

DROP TABLE IF EXISTS users, goals, ratings cascade;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(256)
);

CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  rating INTEGER,
  icon VARCHAR(100),
  deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  goal_id INTEGER,
  rating INTEGER,
  comment TEXT
);

COMMIT;
