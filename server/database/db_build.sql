BEGIN;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY NOT NULL,
  username TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  rating INTEGER,
  icon TEXT,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  goal_id INTEGER,
  rating INTEGER,
  comment TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

COMMIT;
