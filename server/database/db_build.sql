BEGIN;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE goals (
  goal_id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  icon TEXT,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY NOT NULL,
  user_id TEXT,
  goal_id TEXT,
  rating INTEGER,
  comment TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

COMMIT;
