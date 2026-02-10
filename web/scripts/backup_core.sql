--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Debian 14.6-1.pgdg110+1)
-- Dumped by pg_dump version 15.12 (Homebrew)

-- Started on 2025-06-17 20:41:43 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16385)
-- Name: core; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA core;


ALTER SCHEMA core OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24679)
-- Name: bulk_uploads; Type: TABLE; Schema: core; Owner: admin
--

CREATE TABLE core.bulk_uploads (
    id integer NOT NULL,
    module character varying(50),
    data jsonb,
    user_create integer NOT NULL,
    create_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_valid boolean DEFAULT true NOT NULL
);


ALTER TABLE core.bulk_uploads OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 24678)
-- Name: bulk_uploads_id_seq; Type: SEQUENCE; Schema: core; Owner: admin
--

CREATE SEQUENCE core.bulk_uploads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE core.bulk_uploads_id_seq OWNER TO admin;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 217
-- Name: bulk_uploads_id_seq; Type: SEQUENCE OWNED BY; Schema: core; Owner: admin
--

ALTER SEQUENCE core.bulk_uploads_id_seq OWNED BY core.bulk_uploads.id;


--
-- TOC entry 215 (class 1259 OID 24592)
-- Name: catalog; Type: TABLE; Schema: core; Owner: admin
--

CREATE TABLE core.catalog (
    id integer NOT NULL,
    id_catalog_type integer NOT NULL,
    id_company integer,
    id_parent integer,
    priority integer,
    extra text,
    url character varying(300),
    create_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user_created integer,
    update_at timestamp without time zone,
    id_user_updated integer,
    name character varying(200) NOT NULL,
    description character varying(400),
    enable boolean DEFAULT true NOT NULL
);


ALTER TABLE core.catalog OWNER TO admin;

--
-- TOC entry 214 (class 1259 OID 24591)
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: core; Owner: admin
--

CREATE SEQUENCE core.catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE core.catalog_id_seq OWNER TO admin;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 214
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: core; Owner: admin
--

ALTER SEQUENCE core.catalog_id_seq OWNED BY core.catalog.id;


--
-- TOC entry 213 (class 1259 OID 24581)
-- Name: catalog_type; Type: TABLE; Schema: core; Owner: admin
--

CREATE TABLE core.catalog_type (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description character varying(500),
    date_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    visible boolean DEFAULT true NOT NULL
);


ALTER TABLE core.catalog_type OWNER TO admin;

--
-- TOC entry 212 (class 1259 OID 24580)
-- Name: catalog_type_id_seq; Type: SEQUENCE; Schema: core; Owner: admin
--

CREATE SEQUENCE core.catalog_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE core.catalog_type_id_seq OWNER TO admin;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 212
-- Name: catalog_type_id_seq; Type: SEQUENCE OWNED BY; Schema: core; Owner: admin
--

ALTER SEQUENCE core.catalog_type_id_seq OWNED BY core.catalog_type.id;


--
-- TOC entry 211 (class 1259 OID 24577)
-- Name: users; Type: TABLE; Schema: core; Owner: admin
--

CREATE TABLE core.users (
    id integer NOT NULL,
    id_user_type integer NOT NULL,
    id_company integer NOT NULL,
    uuid text,
    token text,
    name character varying(100) NOT NULL,
    last_name character varying(300) NOT NULL,
    language character varying(10),
    height integer,
    width integer,
    username character varying(30) NOT NULL,
    password text NOT NULL,
    email character varying(200),
    url_img character varying(300),
    timezone character varying(20) NOT NULL,
    verification_code character varying(8),
    monetize boolean,
    country character varying(3),
    phone character varying(20),
    monetize_url character varying(300),
    id_stripe character varying(100),
    create_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notifications boolean,
    custom_data text
);


ALTER TABLE core.users OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 24611)
-- Name: users_id_seq; Type: SEQUENCE; Schema: core; Owner: admin
--

CREATE SEQUENCE core.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE core.users_id_seq OWNER TO admin;

--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: core; Owner: admin
--

ALTER SEQUENCE core.users_id_seq OWNED BY core.users.id;


--
-- TOC entry 3228 (class 2604 OID 24682)
-- Name: bulk_uploads id; Type: DEFAULT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.bulk_uploads ALTER COLUMN id SET DEFAULT nextval('core.bulk_uploads_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 24595)
-- Name: catalog id; Type: DEFAULT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog ALTER COLUMN id SET DEFAULT nextval('core.catalog_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 24584)
-- Name: catalog_type id; Type: DEFAULT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog_type ALTER COLUMN id SET DEFAULT nextval('core.catalog_type_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 24612)
-- Name: users id; Type: DEFAULT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.users ALTER COLUMN id SET DEFAULT nextval('core.users_id_seq'::regclass);


--
-- TOC entry 3391 (class 0 OID 24679)
-- Dependencies: 218
-- Data for Name: bulk_uploads; Type: TABLE DATA; Schema: core; Owner: admin
--

INSERT INTO core.bulk_uploads VALUES (1, 'users', '"[{\"name\":\"Juan\",\"last_name\":\"P\\u00e9rez\",\"username\":\"juanp\",\"email\":\"j@a.com\",\"timezone\":\"MX\",\"password\":\"secret123\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"},{\"name\":\"Ana\",\"last_name\":\"G\\u00f3mez\",\"username\":\"anag\",\"email\":\"a@a.com\",\"timezone\":\"MX\",\"password\":\"secret456\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"}]"', 5, '2025-06-13 04:31:08.140302', false);
INSERT INTO core.bulk_uploads VALUES (2, 'users', NULL, 5, '2025-06-13 04:34:35.430914', true);
INSERT INTO core.bulk_uploads VALUES (3, 'users', '"[{\"name\":\"Juan\",\"last_name\":\"P\\u00e9rez\",\"username\":\"juanp\",\"email\":\"j@a.com\",\"timezone\":\"MX\",\"password\":\"secret123\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"},{\"name\":\"Ana\",\"last_name\":\"G\\u00f3mez\",\"username\":\"anag\",\"email\":\"a@a.com\",\"timezone\":\"MX\",\"password\":\"secret456\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"}]"', 5, '2025-06-13 04:34:38.709392', true);
INSERT INTO core.bulk_uploads VALUES (4, 'users', '"[{\"name\":\"Juan\",\"last_name\":\"P\\u00e9rez\",\"username\":\"juanp\",\"email\":\"j@a.com\",\"timezone\":\"MX\",\"password\":\"secret123\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"},{\"name\":\"Ana\",\"last_name\":\"G\\u00f3mez\",\"username\":\"anag\",\"email\":\"a@a.com\",\"timezone\":\"MX\",\"password\":\"secret456\",\"id_company\":5,\"id_user_type\":6,\"error\":\"Email o username ya registrados en la compa\\u00f1\\u00eda 5\"}]"', 5, '2025-06-13 04:36:05.993353', false);


--
-- TOC entry 3388 (class 0 OID 24592)
-- Dependencies: 215
-- Data for Name: catalog; Type: TABLE DATA; Schema: core; Owner: admin
--

INSERT INTO core.catalog VALUES (1, 1, NULL, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'QUESERIA', 'Quesería de Francisco', true);
INSERT INTO core.catalog VALUES (2, 1, NULL, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'OLAMSYS', 'Empresa matriz', true);
INSERT INTO core.catalog VALUES (3, 1, 2, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'Root', 'Usuario Root del sistema maestro', true);
INSERT INTO core.catalog VALUES (4, 1, NULL, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'SisContable', 'Sistema contable con robot integrado', true);
INSERT INTO core.catalog VALUES (5, 2, 4, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'Root', 'Usuario Root del sistema contable', true);
INSERT INTO core.catalog VALUES (6, 2, 4, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'Admin', 'Usuario Admin del sistema contable', true);
INSERT INTO core.catalog VALUES (7, 2, 4, NULL, NULL, NULL, NULL, '2025-04-15 22:24:21.211288', NULL, NULL, NULL, 'Operador', 'Usuario Operador del sistema contable', true);


--
-- TOC entry 3386 (class 0 OID 24581)
-- Dependencies: 213
-- Data for Name: catalog_type; Type: TABLE DATA; Schema: core; Owner: admin
--

INSERT INTO core.catalog_type VALUES (1, 'EMPRESA', 'Cualquier sistema añadido', '2025-04-15 21:51:53.161156', true);
INSERT INTO core.catalog_type VALUES (2, 'TIPO_USUARIO', 'Tipos de usuario o Roles', '2025-04-15 21:51:53.161156', true);


--
-- TOC entry 3384 (class 0 OID 24577)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: core; Owner: admin
--

INSERT INTO core.users VALUES (4, 3, 2, NULL, NULL, 'Juan', 'López Sarrelangue', NULL, NULL, NULL, 'sarrejuan', '$2a$06$o9eIz9VuRpWLnfcvVBhvf.peMKFVoFuvsaXOEaG03rDR3d8Bg41dC', 'sarrejuan@gmail.com', NULL, 'MX', NULL, NULL, 'MX', NULL, NULL, NULL, '2025-04-15 22:30:45.132349', true, NULL);
INSERT INTO core.users VALUES (5, 5, 4, NULL, NULL, 'ARSA', 'Admin AS', NULL, NULL, NULL, 'admin', '$2a$10$0CSYOG/NAMDklElWqGgL/.HpY33bULEy.SiKZiRY/6YOWoYCL6Goq', 'arsa@gmail.com', NULL, 'MX', NULL, NULL, 'MX', NULL, NULL, NULL, '2025-04-15 22:30:45.132349', true, NULL);
INSERT INTO core.users VALUES (18, 6, 5, NULL, NULL, 'Juan', 'Pérez', NULL, NULL, NULL, 'juanp', '$2y$10$1/oPtKLKJIKb/t7eWoh.5e9tS7.WnWrvLDM8ezn7mRRG1FP0ymgce', 'j@a.com', NULL, 'MX', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-13 04:34:35.796563', NULL, NULL);
INSERT INTO core.users VALUES (19, 6, 5, NULL, NULL, 'Ana', 'Gómez', NULL, NULL, NULL, 'anag', '$2y$10$Y7iXxgHwpDo7fuilqQJv..rgWBp2/op3W99WwPU9gySchi6s3NaHK', 'a@a.com', NULL, 'MX', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-13 04:34:36.161563', NULL, NULL);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 217
-- Name: bulk_uploads_id_seq; Type: SEQUENCE SET; Schema: core; Owner: admin
--

SELECT pg_catalog.setval('core.bulk_uploads_id_seq', 4, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 214
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: core; Owner: admin
--

SELECT pg_catalog.setval('core.catalog_id_seq', 7, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 212
-- Name: catalog_type_id_seq; Type: SEQUENCE SET; Schema: core; Owner: admin
--

SELECT pg_catalog.setval('core.catalog_type_id_seq', 2, true);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: core; Owner: admin
--

SELECT pg_catalog.setval('core.users_id_seq', 19, true);


--
-- TOC entry 3238 (class 2606 OID 24687)
-- Name: bulk_uploads bulk_uploads_pkey; Type: CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.bulk_uploads
    ADD CONSTRAINT bulk_uploads_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 24600)
-- Name: catalog catalog_pk; Type: CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog
    ADD CONSTRAINT catalog_pk PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 24590)
-- Name: catalog_type catalog_type_pk; Type: CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog_type
    ADD CONSTRAINT catalog_type_pk PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 24617)
-- Name: users users_pk; Type: CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 24606)
-- Name: catalog catalog_catalog_fk; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog
    ADD CONSTRAINT catalog_catalog_fk FOREIGN KEY (id_company) REFERENCES core.catalog(id);


--
-- TOC entry 3242 (class 2606 OID 24601)
-- Name: catalog catalog_catalog_type_fk; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog
    ADD CONSTRAINT catalog_catalog_type_fk FOREIGN KEY (id_catalog_type) REFERENCES core.catalog_type(id);


--
-- TOC entry 3243 (class 2606 OID 24631)
-- Name: catalog catalog_users_fk; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog
    ADD CONSTRAINT catalog_users_fk FOREIGN KEY (id_user_created) REFERENCES core.users(id);


--
-- TOC entry 3244 (class 2606 OID 24636)
-- Name: catalog catalog_users_fk_1; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.catalog
    ADD CONSTRAINT catalog_users_fk_1 FOREIGN KEY (id_user_updated) REFERENCES core.users(id);


--
-- TOC entry 3239 (class 2606 OID 24621)
-- Name: users users_catalog_fk; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.users
    ADD CONSTRAINT users_catalog_fk FOREIGN KEY (id_user_type) REFERENCES core.catalog(id);


--
-- TOC entry 3240 (class 2606 OID 24626)
-- Name: users users_catalog_fk_1; Type: FK CONSTRAINT; Schema: core; Owner: admin
--

ALTER TABLE ONLY core.users
    ADD CONSTRAINT users_catalog_fk_1 FOREIGN KEY (id_company) REFERENCES core.catalog(id);


-- Completed on 2025-06-17 20:41:49 CST

--
-- PostgreSQL database dump complete
--

