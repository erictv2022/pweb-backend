-- public.shelters definition

-- Drop table

-- DROP TABLE public.shelters;

CREATE TABLE public.shelters
(
    id      serial4 NOT NULL,
    "name"  varchar NOT NULL,
    address varchar NOT NULL,
    CONSTRAINT shelters_pk PRIMARY KEY (id)
);