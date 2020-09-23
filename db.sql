-- Type: temtem_type

-- DROP TYPE public.temtem_type;

CREATE TYPE public.temtem_type AS ENUM
    ('Neutral', 'Wind', 'Earth', 'Water', 'Fire', 'Electric', 'Mental', 'Digital', 'Melee', 'Crystal', 'Toxic');

ALTER TYPE public.temtem_type
    OWNER TO temtem;

-- Table: public.Admin

-- DROP TABLE public."Admin";

CREATE TABLE public."Admin"
(
    id serial NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    password character(60) COLLATE pg_catalog."default",
    CONSTRAINT admin_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Admin"
    OWNER to temtem;

-- Table: public.User

-- DROP TABLE public."User";

CREATE TABLE public."User"
(
    id serial NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    password character(60) COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."User"
    OWNER to temtem;

-- Table: public.Group

-- DROP TABLE public."Group";

CREATE TABLE public."Group"
(
    id serial NOT NULL,
    nom character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Group_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Group"
    OWNER to temtem;

-- Table: public.Map

-- DROP TABLE public."Map";

CREATE TABLE public."Map"
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    image_path character varying COLLATE pg_catalog."default",
    CONSTRAINT "Map_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Map"
    OWNER to temtem;

-- Table: public.Membrship

-- DROP TABLE public."Membrship";

CREATE TABLE public."Membrship"
(
    id_group integer NOT NULL,
    id_user integer NOT NULL,
    statut character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "Membre_pkey" PRIMARY KEY (id_group, id_user),
    CONSTRAINT "Membre_fkey_user" FOREIGN KEY(id_user) REFERENCES "User"(id),
    CONSTRAINT "Membre_fkey_group" FOREIGN KEY(id_group) REFERENCES "Group"(id)
)

TABLESPACE pg_default;

ALTER TABLE public."Membrship"
    OWNER to temtem;

-- Table: public.Temtem

-- DROP TABLE public."Temtem";

CREATE TABLE public."Temtem"
(
    id serial NOT NULL,
    type1 temtem_type NOT NULL,
    type2 temtem_type,
    "Name" character varying COLLATE pg_catalog."default",
    CONSTRAINT "Temtem_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Temtem"
    OWNER to temtem;

-- Table: public.Eggmove

-- DROP TABLE public."Eggmove";

CREATE TABLE public."Eggmove"
(
    id serial NOT NULL,
    temtem integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    giver integer,
    CONSTRAINT "Eggmove_pkey" PRIMARY KEY (id),
    CONSTRAINT "Eggmove_fkey_temtem" FOREIGN KEY(temtem) REFERENCES public."Temtem"(id)
)

TABLESPACE pg_default;

ALTER TABLE public."Eggmove"
    OWNER to temtem;

-- Table: public.Trait

-- DROP TABLE public."Trait";

CREATE TABLE public."Trait"
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    temtem integer NOT NULL,
    CONSTRAINT "Trait_pkey" PRIMARY KEY (id),
    CONSTRAINT "Trait_fkey_temtem" FOREIGN KEY(temtem) REFERENCES public."Temtem"(id)
)

TABLESPACE pg_default;

ALTER TABLE public."Trait"
    OWNER to temtem;

-- Table: public.Zone

-- DROP TABLE public."Zone";

CREATE TABLE public."Zone"
(
    id serial NOT NULL,
    id_map integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    CONSTRAINT "Zone_pkey" PRIMARY KEY (id),
    CONSTRAINT "Zone_fkey_map" FOREIGN KEY(id_map) REFERENCES public."Map"(id)
)

TABLESPACE pg_default;

ALTER TABLE public."Zone"
    OWNER to temtem;

-- Table: public.Session

-- DROP TABLE public."Session";

CREATE TABLE public."Session"
(
    id serial NOT NULL,
    id_user integer NOT NULL,
    id_zone integer NOT NULL,
    duration daterange,
    CONSTRAINT "Session_pkey" PRIMARY KEY (id),
    CONSTRAINT "Session_fkey_user" FOREIGN KEY(id_user) REFERENCES public."User"(id),
    CONSTRAINT "Session_fkey_zone" FOREIGN KEY(id_zone) REFERENCES public."Zone"(id)
)

TABLESPACE pg_default;

ALTER TABLE public."Session"
    OWNER to temtem;

CREATE TABLE public."Temtem_x_user"
(
    id serial NOT NULL,
    id_temtem integer NOT NULL,
    id_user integer NOT NULL,
    box integer,
    sexe boolean,
    luma boolean,
    hp integer,
    sta integer,
    spd integer,
    atk integer,
    def integer,
    speatk integer,
    spedef integer,
    PRIMARY KEY (id),
    CONSTRAINT "Tem_x_user_fkey_user" FOREIGN KEY(id_user) REFERENCES public."User"(id),
    CONSTRAINT "Tem_x_user_fkey_temtem" FOREIGN KEY(id_temtem) REFERENCES public."Temtem"(id)
);

ALTER TABLE public."Temtem_x_user"
    OWNER to temtem;

CREATE TABLE public."Zone_x_temtem"
(
    id_zone integer NOT NULL,
    id_temtem integer NOT NULL,
    ratio double precision,
    PRIMARY KEY (id_zone, id_temtem),
    CONSTRAINT "Tem_x_user_fkey_user" FOREIGN KEY(id_zone) REFERENCES public."Zone"(id),
    CONSTRAINT "Tem_x_user_fkey_temtem" FOREIGN KEY(id_temtem) REFERENCES public."Temtem"(id)

);

ALTER TABLE public."Zone_x_temtem"
    OWNER to temtem;