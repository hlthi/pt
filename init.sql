--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Debian 11.5-3.pgdg90+1)
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fish; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.fish (
    id integer NOT NULL,
    name text NOT NULL,
    image_url text NOT NULL
);


ALTER TABLE public.fish OWNER TO "user";

--
-- Name: fishes_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.fishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fishes_id_seq OWNER TO "user";

--
-- Name: fishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.fishes_id_seq OWNED BY public.fish.id;


--
-- Name: stock; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.stock (
    id integer NOT NULL,
    fish_id integer,
    stock_amount integer,
    price double precision
);


ALTER TABLE public.stock OWNER TO "user";

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_id_seq OWNER TO "user";

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    pass text
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: fish id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fish ALTER COLUMN id SET DEFAULT nextval('public.fishes_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: fish; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.fish (id, name, image_url) FROM stdin;
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.stock (id, fish_id, stock_amount, price) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, pass) FROM stdin;
1	test_user	test_pass
\.


--
-- Name: fishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.fishes_id_seq', 1, false);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.stock_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: fish fishes_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.fish
    ADD CONSTRAINT fishes_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: stock_fish_id_idx; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX stock_fish_id_idx ON public.stock USING btree (fish_id);


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX users_username_idx ON public.users USING btree (username);


--
-- PostgreSQL database dump complete
--

