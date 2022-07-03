-- public.favourites definition

-- Drop table

-- DROP TABLE public.favourites;

CREATE TABLE public.favourites
(
    id          serial4     NOT NULL,
    user_id     int4        NOT NULL,
    finding_id  int4        NOT NULL,
    create_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT favourites_pk PRIMARY KEY (id),
    CONSTRAINT favourites_un UNIQUE (user_id, finding_id)
);