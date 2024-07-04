--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-07-04 10:22:08

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4859 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 230 (class 1255 OID 16398)
-- Name: addoperaciones(integer, integer, integer, integer, integer, timestamp without time zone, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.addoperaciones(idperfil integer, monto integer, idtipos integer, idsubtipo integer, importe integer, fecha timestamp without time zone, observaciones character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO Gestor (IdPerfil_FK, IdTipos_FK, IdSubTipo_FK, Importe, Fecha, Observaciones)
    VALUES (IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones);
END;
$$;


ALTER FUNCTION public.addoperaciones(idperfil integer, monto integer, idtipos integer, idsubtipo integer, importe integer, fecha timestamp without time zone, observaciones character varying) OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 16399)
-- Name: buscardefiniciones(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buscardefiniciones(terminobuscado character varying) RETURNS TABLE(idtermino integer, titulo character varying, imagen character varying, contenido character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT IdTermino, Titulo, img AS Imagen, Contenido
    FROM DefinicionTerminos
    WHERE Titulo LIKE '%' || terminoBuscado || '%'
    ORDER BY Titulo;
END;
$$;


ALTER FUNCTION public.buscardefiniciones(terminobuscado character varying) OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 16400)
-- Name: deloperacion(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.deloperacion(idgestor integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM Gestor WHERE IdGestor = idGestor;
END;
$$;


ALTER FUNCTION public.deloperacion(idgestor integer) OWNER TO postgres;

--
-- TOC entry 233 (class 1255 OID 16401)
-- Name: showdefiniciones(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.showdefiniciones() RETURNS TABLE(idtermino integer, titulo character varying, contenido character varying, img character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT IdTermino, Titulo, Contenido, img FROM DefinicionTerminos LIMIT 5;
END;
$$;


ALTER FUNCTION public.showdefiniciones() OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 16402)
-- Name: showoperaciones(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.showoperaciones(idperfil integer) RETURNS TABLE(idgestor integer, idperfil_fk integer, idtipos_fk integer, idsubtipo_fk integer, importe integer, fecha timestamp without time zone, observaciones character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM Gestor WHERE IdPerfil_FK = idPerfil;
END;
$$;


ALTER FUNCTION public.showoperaciones(idperfil integer) OWNER TO postgres;

--
-- TOC entry 235 (class 1255 OID 16403)
-- Name: showvideos(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.showvideos(categoriax character varying) RETURNS TABLE(idvideo integer, titulo character varying, videolink character varying, img character varying, descripcion character varying, categoria character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM ContenidoAudiovisual WHERE CategoriaX = Categoria LIMIT 6;
END;
$$;


ALTER FUNCTION public.showvideos(categoriax character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16404)
-- Name: asesor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asesor (
    idasesor integer NOT NULL,
    idperfil_fk integer NOT NULL,
    mensaje character varying(500) NOT NULL,
    fecha timestamp without time zone NOT NULL
);


ALTER TABLE public.asesor OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16409)
-- Name: asesor_idasesor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asesor_idasesor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asesor_idasesor_seq OWNER TO postgres;

--
-- TOC entry 4860 (class 0 OID 0)
-- Dependencies: 217
-- Name: asesor_idasesor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asesor_idasesor_seq OWNED BY public.asesor.idasesor;


--
-- TOC entry 218 (class 1259 OID 16410)
-- Name: contenidoaudiovisual; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenidoaudiovisual (
    idvideo integer NOT NULL,
    titulo character varying(50) NOT NULL,
    videolink character varying(150) NOT NULL,
    img character varying(50) NOT NULL,
    descripcion character varying(250),
    categoria character varying(50) NOT NULL
);


ALTER TABLE public.contenidoaudiovisual OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16415)
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenidoaudiovisual_idvideo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenidoaudiovisual_idvideo_seq OWNER TO postgres;

--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 219
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenidoaudiovisual_idvideo_seq OWNED BY public.contenidoaudiovisual.idvideo;


--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: definicionterminos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.definicionterminos (
    idtermino integer NOT NULL,
    titulo character varying(50) NOT NULL,
    contenido character varying(450) NOT NULL,
    img character varying(150)
);


ALTER TABLE public.definicionterminos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16421)
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.definicionterminos_idtermino_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.definicionterminos_idtermino_seq OWNER TO postgres;

--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 221
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.definicionterminos_idtermino_seq OWNED BY public.definicionterminos.idtermino;


--
-- TOC entry 222 (class 1259 OID 16422)
-- Name: gestor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gestor (
    idgestor integer NOT NULL,
    idperfil_fk integer NOT NULL,
    idtipos_fk integer NOT NULL,
    idsubtipo_fk integer NOT NULL,
    importe integer NOT NULL,
    fecha timestamp without time zone NOT NULL,
    observaciones character varying(250)
);


ALTER TABLE public.gestor OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16425)
-- Name: gestor_idgestor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gestor_idgestor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gestor_idgestor_seq OWNER TO postgres;

--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 223
-- Name: gestor_idgestor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gestor_idgestor_seq OWNED BY public.gestor.idgestor;


--
-- TOC entry 224 (class 1259 OID 16426)
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil (
    idperfil integer NOT NULL,
    admin boolean NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50),
    foto character varying(250),
    mail character varying(50) NOT NULL,
    "contraseña" character varying(50) NOT NULL,
    pasatiempo character varying(50),
    conocimiento character varying(50),
    ultactividad character varying(50)
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16431)
-- Name: perfil_idperfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_idperfil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_idperfil_seq OWNER TO postgres;

--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_idperfil_seq OWNED BY public.perfil.idperfil;


--
-- TOC entry 226 (class 1259 OID 16432)
-- Name: subtipomovimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtipomovimiento (
    idsubtipo integer NOT NULL,
    idtipos_fk integer NOT NULL,
    descripcion character varying(250)
);


ALTER TABLE public.subtipomovimiento OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16435)
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtipomovimiento_idsubtipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subtipomovimiento_idsubtipo_seq OWNER TO postgres;

--
-- TOC entry 4865 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtipomovimiento_idsubtipo_seq OWNED BY public.subtipomovimiento.idsubtipo;


--
-- TOC entry 228 (class 1259 OID 16436)
-- Name: tipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos (
    idtipos integer NOT NULL,
    descripcion character varying(250) NOT NULL
);


ALTER TABLE public.tipos OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16439)
-- Name: tipos_idtipos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_idtipos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_idtipos_seq OWNER TO postgres;

--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_idtipos_seq OWNED BY public.tipos.idtipos;


--
-- TOC entry 4671 (class 2604 OID 16440)
-- Name: asesor idasesor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor ALTER COLUMN idasesor SET DEFAULT nextval('public.asesor_idasesor_seq'::regclass);


--
-- TOC entry 4672 (class 2604 OID 16441)
-- Name: contenidoaudiovisual idvideo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual ALTER COLUMN idvideo SET DEFAULT nextval('public.contenidoaudiovisual_idvideo_seq'::regclass);


--
-- TOC entry 4673 (class 2604 OID 16442)
-- Name: definicionterminos idtermino; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos ALTER COLUMN idtermino SET DEFAULT nextval('public.definicionterminos_idtermino_seq'::regclass);


--
-- TOC entry 4674 (class 2604 OID 16487)
-- Name: gestor idgestor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor ALTER COLUMN idgestor SET DEFAULT nextval('public.gestor_idgestor_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 16444)
-- Name: perfil idperfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN idperfil SET DEFAULT nextval('public.perfil_idperfil_seq'::regclass);


--
-- TOC entry 4676 (class 2604 OID 16445)
-- Name: subtipomovimiento idsubtipo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento ALTER COLUMN idsubtipo SET DEFAULT nextval('public.subtipomovimiento_idsubtipo_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 16446)
-- Name: tipos idtipos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos ALTER COLUMN idtipos SET DEFAULT nextval('public.tipos_idtipos_seq'::regclass);


--
-- TOC entry 4840 (class 0 OID 16404)
-- Dependencies: 216
-- Data for Name: asesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.asesor VALUES (1, 1, 'Consulta sobre el uso de SQL en bases de datos.', '2024-07-01 10:00:00');
INSERT INTO public.asesor VALUES (2, 2, 'Necesito ayuda con un script en Python.', '2024-07-02 11:00:00');
INSERT INTO public.asesor VALUES (3, 3, '¿Cómo puedo optimizar consultas SQL?', '2024-07-03 12:00:00');
INSERT INTO public.asesor VALUES (4, 4, 'Recomendaciones para aprender Machine Learning.', '2024-07-04 13:00:00');
INSERT INTO public.asesor VALUES (5, 5, 'Problemas al conectar a la base de datos.', '2024-07-05 14:00:00');


--
-- TOC entry 4842 (class 0 OID 16410)
-- Dependencies: 218
-- Data for Name: contenidoaudiovisual; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contenidoaudiovisual VALUES (1, 'Introducción a SQL', 'https://example.com/videos/intro_sql', 'img1.jpg', 'Un video introductorio sobre SQL', 'Educativo');
INSERT INTO public.contenidoaudiovisual VALUES (2, 'Avanzando en Python', 'https://example.com/videos/adv_python', 'img2.jpg', 'Tutorial avanzado de Python', 'Programación');
INSERT INTO public.contenidoaudiovisual VALUES (3, 'Historia del Arte', 'https://example.com/videos/arte_historia', 'img3.jpg', 'Documental sobre la historia del arte', 'Documental');
INSERT INTO public.contenidoaudiovisual VALUES (4, 'Fundamentos de Machine Learning', 'https://example.com/videos/ml_basics', 'img4.jpg', 'Conceptos básicos de Machine Learning', 'Tecnología');
INSERT INTO public.contenidoaudiovisual VALUES (5, 'Cocina Italiana', 'https://example.com/videos/italian_cuisine', 'img5.jpg', 'Recetas de cocina italiana', 'Cocina');
INSERT INTO public.contenidoaudiovisual VALUES (6, 'Yoga para principiantes', 'https://example.com/videos/yoga_basics', 'img6.jpg', 'Sesión de yoga para principiantes', 'Salud');
INSERT INTO public.contenidoaudiovisual VALUES (7, 'Astronomía para niños', 'https://example.com/videos/astro_kids', 'img7.jpg', 'Introducción a la astronomía para niños', 'Educativo');
INSERT INTO public.contenidoaudiovisual VALUES (8, 'Fotografía profesional', 'https://example.com/videos/pro_photography', 'img8.jpg', 'Consejos para fotografía profesional', 'Hobby');
INSERT INTO public.contenidoaudiovisual VALUES (9, 'Aprende a tocar la guitarra', 'https://example.com/videos/learn_guitar', 'img9.jpg', 'Clases para aprender a tocar la guitarra', 'Música');
INSERT INTO public.contenidoaudiovisual VALUES (10, 'Introducción a la programación en Java', 'https://example.com/videos/java_intro', 'img10.jpg', 'Curso introductorio de programación en Java', 'Programación');


--
-- TOC entry 4844 (class 0 OID 16416)
-- Dependencies: 220
-- Data for Name: definicionterminos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.definicionterminos VALUES (1, 'SQL', 'Structured Query Language, es un lenguaje de programación utilizado para gestionar bases de datos relacionales.', 'img_sql.jpg');
INSERT INTO public.definicionterminos VALUES (2, 'Python', 'Python es un lenguaje de programación interpretado de alto nivel, diseñado para ser fácil de leer y simple de implementar.', 'img_python.jpg');
INSERT INTO public.definicionterminos VALUES (3, 'Machine Learning', 'Machine Learning es una rama de la inteligencia artificial que se centra en el desarrollo de algoritmos que permiten a las computadoras aprender de los datos.', 'img_ml.jpg');
INSERT INTO public.definicionterminos VALUES (4, 'Historia del Arte', 'La historia del arte estudia el desarrollo del arte a través del tiempo, considerando factores sociales, políticos y culturales.', 'img_arte.jpg');
INSERT INTO public.definicionterminos VALUES (5, 'Yoga', 'El yoga es una disciplina física y mental que se originó en la India, enfocada en la meditación y posturas físicas.', 'img_yoga.jpg');
INSERT INTO public.definicionterminos VALUES (6, 'Astronomía', 'La astronomía es la ciencia que estudia los cuerpos celestes, sus movimientos y fenómenos relacionados.', 'img_astronomy.jpg');
INSERT INTO public.definicionterminos VALUES (7, 'Fotografía', 'La fotografía es el arte y la técnica de obtener imágenes duraderas debido a la acción de la luz.', 'img_photography.jpg');
INSERT INTO public.definicionterminos VALUES (8, 'Programación en Java', 'Java es un lenguaje de programación de propósito general, concurrente y basado en clases, diseñado para tener las menos dependencias posibles.', 'img_java.jpg');
INSERT INTO public.definicionterminos VALUES (9, 'Guitarra', 'La guitarra es un instrumento musical de cuerdas pulsadas, compuesto por una caja de resonancia, un mástil sobre el que va adosado el diapasón o trastero, generalmente con un agujero acústico en el centro de la tapa (boca).', 'img_guitar.jpg');
INSERT INTO public.definicionterminos VALUES (10, 'Cocina Italiana', 'La cocina italiana es una expresión de las artes culinarias desarrolladas en Italia, rica en sabor y variada en ingredientes.', 'img_italian_cuisine.jpg');


--
-- TOC entry 4846 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: gestor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gestor VALUES (1, 1, 1, 1, 1000, '2024-07-01 10:00:00', 'Primera observación');
INSERT INTO public.gestor VALUES (2, 2, 2, 2, 2000, '2024-07-02 11:00:00', 'Segunda observación');
INSERT INTO public.gestor VALUES (3, 3, 3, 3, 3000, '2024-07-03 12:00:00', 'Tercera observación');
INSERT INTO public.gestor VALUES (4, 2, 1, 4, -4000, '2024-07-07 00:00:00', 'Mcdonals');
INSERT INTO public.gestor VALUES (5, 2, 2, 2, 10000, '2024-02-02 00:00:00', 'cobre el aguinaldo');
INSERT INTO public.gestor VALUES (6, 2, 2, 2, 10000, '2024-02-02 00:00:00', 'cobre el aguinaldo');
INSERT INTO public.gestor VALUES (7, 2, 2, 2, 10000, '2024-02-02 00:00:00', 'cobre el aguinaldo v3');


--
-- TOC entry 4848 (class 0 OID 16426)
-- Dependencies: 224
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.perfil VALUES (2, false, 'Maria', 'Garcia', 'foto2.jpg', 'maria.garcia@example.com', 'password2', 'Cocinar', 'Python', 'Script Python');
INSERT INTO public.perfil VALUES (4, false, 'Ana', 'Martinez', 'foto4.jpg', 'ana.martinez@example.com', 'password4', 'Deporte', 'Bases de Datos', 'Conexión BD');
INSERT INTO public.perfil VALUES (1, true, 'Juan', 'Perez', 'foto1.jpg', 'juan.perez@example.com', 'password1', NULL, NULL, NULL);
INSERT INTO public.perfil VALUES (3, true, 'Carlos', 'Lopez', 'foto3.jpg', 'carlos.lopez@example.com', 'password3', NULL, NULL, NULL);
INSERT INTO public.perfil VALUES (5, true, 'Luis', 'Hernandez', 'foto5.jpg', 'luis.hernandez@example.com', 'password5', NULL, NULL, NULL);


--
-- TOC entry 4850 (class 0 OID 16432)
-- Dependencies: 226
-- Data for Name: subtipomovimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subtipomovimiento VALUES (1, 1, 'Impuestos');
INSERT INTO public.subtipomovimiento VALUES (2, 2, 'Sueldo');
INSERT INTO public.subtipomovimiento VALUES (3, 3, 'Sueldo');
INSERT INTO public.subtipomovimiento VALUES (4, 1, 'Comida');


--
-- TOC entry 4852 (class 0 OID 16436)
-- Dependencies: 228
-- Data for Name: tipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipos VALUES (1, 'Gastos');
INSERT INTO public.tipos VALUES (2, 'Ingreso');
INSERT INTO public.tipos VALUES (3, 'Ahorro');


--
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 217
-- Name: asesor_idasesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asesor_idasesor_seq', 1, false);


--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 219
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidoaudiovisual_idvideo_seq', 10, true);


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 221
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.definicionterminos_idtermino_seq', 10, true);


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 223
-- Name: gestor_idgestor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gestor_idgestor_seq', 7, true);


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_idperfil_seq', 1, false);


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtipomovimiento_idsubtipo_seq', 2, true);


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_idtipos_seq', 1, false);


--
-- TOC entry 4679 (class 2606 OID 16448)
-- Name: asesor asesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT asesor_pkey PRIMARY KEY (idasesor);


--
-- TOC entry 4681 (class 2606 OID 16450)
-- Name: contenidoaudiovisual contenidoaudiovisual_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual
    ADD CONSTRAINT contenidoaudiovisual_pkey PRIMARY KEY (idvideo);


--
-- TOC entry 4683 (class 2606 OID 16452)
-- Name: definicionterminos definicionterminos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos
    ADD CONSTRAINT definicionterminos_pkey PRIMARY KEY (idtermino);


--
-- TOC entry 4685 (class 2606 OID 16454)
-- Name: gestor gestor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT gestor_pkey PRIMARY KEY (idgestor);


--
-- TOC entry 4687 (class 2606 OID 16456)
-- Name: perfil perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (idperfil);


--
-- TOC entry 4689 (class 2606 OID 16458)
-- Name: subtipomovimiento subtipomovimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT subtipomovimiento_pkey PRIMARY KEY (idsubtipo);


--
-- TOC entry 4691 (class 2606 OID 16460)
-- Name: tipos tipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_pkey PRIMARY KEY (idtipos);


--
-- TOC entry 4692 (class 2606 OID 16461)
-- Name: asesor fk_asesor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT fk_asesor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4693 (class 2606 OID 16466)
-- Name: gestor fk_gestor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4694 (class 2606 OID 16471)
-- Name: gestor fk_gestor_subtipomovimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_subtipomovimiento FOREIGN KEY (idsubtipo_fk) REFERENCES public.subtipomovimiento(idsubtipo);


--
-- TOC entry 4695 (class 2606 OID 16476)
-- Name: gestor fk_gestor_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


--
-- TOC entry 4696 (class 2606 OID 16481)
-- Name: subtipomovimiento fk_subtipomovimiento_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT fk_subtipomovimiento_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


-- Completed on 2024-07-04 10:22:08

--
-- PostgreSQL database dump complete
--

