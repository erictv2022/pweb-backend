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

INSERT INTO public.petfindings
    (breed, subbreed, shelter, summary, imageurl, published, userid)
VALUES ('affenpinscher', null, 'Downtown London Center 1', '1 years-old',
        'https://images.dog.ceo/breeds/affenpinscher/n02110627_7404.jpg', true, 1),
       ('african', null, 'Downtown London Center 2', '2 years-old',
        'https://images.dog.ceo/breeds/african/n02116738_9748.jpg', true, 1),
       ('australian', 'shepherd', 'Downtown London Center 2', '3 years-old', null, true, 1),
       ('basenji', null, 'Downtown Manchester Center 1', 'brown, 1 years-old',
        'https://images.dog.ceo/breeds/basenji/n02110806_759.jpg', true, 1),
       ('buhund', 'norwegian', 'Downtown Manchester Center 2', 'recently found', null, true, 1),
       ('african', null, 'Downtown London Center 2', '2 years-old',
        'https://images.dog.ceo/breeds/african/n02116738_9748.jpg', true, 1),
       ('bulldog', 'boston', 'Center 1, Coventry', 'small size, around 6 months', null, true, 1),
       ('bulldog', 'english', 'Center 1, Coventry', 'senior age, short hair', null, true, 1),
       ('bulldog', 'french', 'Center 1, Coventry', 'active, around 3 years-old', null, true, 1),
       ('poodle', 'toy', 'Center 2, Birmingham', 'white in color',
        'https://images.dog.ceo/breeds/poodle-toy/n02113624_2905.jpg', true, 1),
       ('poodle', 'miniature', 'Center 4, Birmingham', 'brown hair, 30cm height',
        'https://images.dog.ceo/breeds/poodle-miniature/n02113712_212.jpg', true, 1),
       ('terrier', 'fox', 'Downtown London Center 2', 'mix color white and brown',
        'https://images.dog.ceo/breeds/terrier-fox/n02095314_3372.jpg', true, 1)