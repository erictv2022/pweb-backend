-- public.messages definition

-- Drop table

-- DROP TABLE public.messages;

CREATE TABLE public.messages
(
    id          serial4      NOT NULL,
    firstname   varchar(32)  NULL,
    lastname    varchar(32)  NULL,
    finding_id  int4         NOT NULL,
    create_date timestamp    NOT NULL DEFAULT now(),
    deleted     bool         NOT NULL DEFAULT false,
    email       varchar(256) NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY (id)
);