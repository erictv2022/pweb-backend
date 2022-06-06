CREATE TABLE public.users (
	id serial4 NOT NULL,
    username varchar(16) NOT NULL,
    "password" varchar(32) NOT NULL,
    passwordsalt varchar(16) NOT NULL,
    email varchar(64) NOT NULL,
	firstname varchar(32) NULL,
	lastname varchar(32) NULL,
	about text NULL,
	dateregistered timestamp NOT NULL DEFAULT now(),
	avatarurl varchar(256) NULL,
	regcode varchar(16) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_username_key UNIQUE (username)
);
