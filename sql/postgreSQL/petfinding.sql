CREATE TABLE public.petfindings (
	id serial4 NOT NULL,
	breed varchar(32) NOT NULL,
	subBreed varchar(32) NULL,
	centerLocation varchar(32) NOT NULL,
	summary text NULL,
	datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	imageurl varchar(2048) NULL,
	published bool NULL,
	userId int4 NULL,
	CONSTRAINT petfindings_pkey PRIMARY KEY (id)
);
