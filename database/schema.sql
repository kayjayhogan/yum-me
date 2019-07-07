CREATE TABLE IF NOT EXISTS users (
	id          SERIAL PRIMARY KEY,
	firstName   TEXT NOT NULL,
	lastName    TEXT NOT NULL,
	username    TEXT NOT NULL UNIQUE,
	pass        TEXT NOT NULL,
	loc         TEXT NOT NULL,
	avatar      TEXT NOT NULL,
	email       TEXT NOT NULL,
	created_at  TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS followers (
	id                  SERIAL PRIMARY KEY,
	followed_user_id    INTEGER REFERENCES users(id),
	user_id             INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS is_following (
	id                  SERIAL PRIMARY KEY,
	following_user_id   INTEGER REFERENCES users(id),
	user_id             INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS posts (
	id          SERIAL PRIMARY KEY,
	title       TEXT NOT NULL,
	img_url     TEXT NOT NULL,
	author_id   INTEGER REFERENCES users(id),
	restaurant  TEXT NOT NULL,
	descript    TEXT NOT NULL,
	recommended BOOLEAN NOT NULL,
	created_at  TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
	id         SERIAL PRIMARY KEY,
	author_id  INTEGER REFERENCES users(id),
	post_id    INTEGER REFERENCES posts(id),
	content    TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS likes (
	id         SERIAL PRIMARY KEY,
	post_id    INTEGER REFERENCES posts(id),
	user_id    INTEGER REFERENCES users(id)
);
