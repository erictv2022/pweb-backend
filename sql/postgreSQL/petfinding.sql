-- public.petfindings definition

-- Drop table

-- DROP TABLE public.petfindings;

CREATE TABLE public.petfindings
(
    id           serial4       NOT NULL,
    breed        varchar(32)   NOT NULL,
    subbreed     varchar(32)   NULL,
    shelter      varchar(256)  NOT NULL,
    summary      text          NULL,
    datecreated  timestamp     NOT NULL DEFAULT now(),
    datemodified timestamp     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    imageurl     varchar(2048) NULL,
    published    bool          NULL,
    userid       int4          NULL,
    CONSTRAINT petfindings_pkey PRIMARY KEY (id)
);