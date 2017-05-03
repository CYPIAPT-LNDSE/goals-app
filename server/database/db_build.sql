BEGIN;

CREATE TABLE users (
  user_id TEXT NOT NULL PRIMARY KEY,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE goals (
  goal_id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id),
  title TEXT NOT NULL,
  icon TEXT,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TEXT
);

CREATE TABLE ratings (
  rating_id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id),
  goal_id TEXT REFERENCES goals(goal_id),
  rating INTEGER,
  comment TEXT,
  date_created TEXT
);

COMMIT;
