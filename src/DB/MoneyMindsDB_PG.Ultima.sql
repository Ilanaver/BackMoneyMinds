--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-10-07 09:05:47

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
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4860 (class 0 OID 0)
-- Dependencies: 6
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
-- TOC entry 4862 (class 0 OID 0)
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
-- TOC entry 4863 (class 0 OID 0)
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
-- TOC entry 4864 (class 0 OID 0)
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
-- TOC entry 4865 (class 0 OID 0)
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
    admin boolean DEFAULT false NOT NULL,
    usuario character varying(50) NOT NULL,
    foto character varying(1250),
    mail character varying(80) NOT NULL,
    "contraseña" character varying(550) NOT NULL,
    pasatiempo character varying(50),
    conocimiento character varying(50),
    ultactividad character varying(50)
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16432)
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
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_idperfil_seq OWNED BY public.perfil.idperfil;


--
-- TOC entry 226 (class 1259 OID 16433)
-- Name: subtipomovimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtipomovimiento (
    idsubtipo integer NOT NULL,
    idtipos_fk integer NOT NULL,
    descripcion character varying(250)
);


ALTER TABLE public.subtipomovimiento OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16436)
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
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtipomovimiento_idsubtipo_seq OWNED BY public.subtipomovimiento.idsubtipo;


--
-- TOC entry 228 (class 1259 OID 16437)
-- Name: tipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos (
    idtipos integer NOT NULL,
    descripcion character varying(250) NOT NULL
);


ALTER TABLE public.tipos OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16440)
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
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_idtipos_seq OWNED BY public.tipos.idtipos;


--
-- TOC entry 4671 (class 2604 OID 16441)
-- Name: asesor idasesor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor ALTER COLUMN idasesor SET DEFAULT nextval('public.asesor_idasesor_seq'::regclass);


--
-- TOC entry 4672 (class 2604 OID 16442)
-- Name: contenidoaudiovisual idvideo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual ALTER COLUMN idvideo SET DEFAULT nextval('public.contenidoaudiovisual_idvideo_seq'::regclass);


--
-- TOC entry 4673 (class 2604 OID 16443)
-- Name: definicionterminos idtermino; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos ALTER COLUMN idtermino SET DEFAULT nextval('public.definicionterminos_idtermino_seq'::regclass);


--
-- TOC entry 4674 (class 2604 OID 16444)
-- Name: gestor idgestor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor ALTER COLUMN idgestor SET DEFAULT nextval('public.gestor_idgestor_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 16445)
-- Name: perfil idperfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN idperfil SET DEFAULT nextval('public.perfil_idperfil_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 16446)
-- Name: subtipomovimiento idsubtipo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento ALTER COLUMN idsubtipo SET DEFAULT nextval('public.subtipomovimiento_idsubtipo_seq'::regclass);


--
-- TOC entry 4678 (class 2604 OID 16447)
-- Name: tipos idtipos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos ALTER COLUMN idtipos SET DEFAULT nextval('public.tipos_idtipos_seq'::regclass);


--
-- TOC entry 4841 (class 0 OID 16404)
-- Dependencies: 216
-- Data for Name: asesor; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4843 (class 0 OID 16410)
-- Dependencies: 218
-- Data for Name: contenidoaudiovisual; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contenidoaudiovisual VALUES (11, 'Estrategias de Ahorro Personal', 'http://example.com/estrategias-ahorro', 'estrategias-ahorro.jpg', 'Consejos y estrategias para mejorar el ahorro personal.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual VALUES (12, 'Planificación de la Jubilación', 'http://example.com/planificacion-jubilacion', 'planificacion-jubilacion.jpg', 'Cómo planificar tu jubilación mediante el ahorro y la inversión.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual VALUES (13, 'Ahorro para Emergencias', 'http://example.com/ahorro-emergencias', 'ahorro-emergencias.jpg', 'La importancia de tener un fondo de emergencia.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual VALUES (14, 'Fundamentos de Inversiones', 'http://example.com/fundamentos-inversiones', 'fundamentos-inversiones.jpg', 'Introducción a los conceptos básicos de las inversiones.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (15, 'Inversiones en el Mercado de Valores', 'http://example.com/inversiones-mercado-valores', 'inversiones-mercado-valores.jpg', 'Guía sobre cómo invertir en el mercado de valores.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (16, 'Diversificación de Cartera', 'http://example.com/diversificacion-cartera', 'diversificacion-cartera.jpg', 'La importancia de diversificar tu cartera de inversiones.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (17, 'Inversiones Inmobiliarias', 'http://example.com/inversiones-inmobiliarias', 'inversiones-inmobiliarias.jpg', 'Cómo invertir en el mercado inmobiliario.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (18, 'Inversiones a Largo Plazo', 'http://example.com/inversiones-largo-plazo', 'inversiones-largo-plazo.jpg', 'Estrategias para inversiones a largo plazo.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (19, 'Introducción a los Impuestos', 'http://example.com/introduccion-impuestos', 'introduccion-impuestos.jpg', 'Conceptos básicos sobre los impuestos y su impacto en tus finanzas.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual VALUES (20, 'Planificación Fiscal para Individuos', 'http://example.com/planificacion-fiscal', 'planificacion-fiscal.jpg', 'Cómo planificar tus impuestos de manera eficiente.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual VALUES (21, 'Impuestos sobre Inversiones', 'http://example.com/impuestos-inversiones', 'impuestos-inversiones.jpg', 'Entendiendo los impuestos aplicables a las inversiones.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual VALUES (22, 'Reducción de Impuestos Legales', 'http://example.com/reduccion-impuestos', 'reduccion-impuestos.jpg', 'Métodos legales para reducir tus impuestos.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual VALUES (23, 'Impuestos y Ahorro', 'http://example.com/impuestos-ahorro', 'impuestos-ahorro.jpg', 'La relación entre los impuestos y el ahorro.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual VALUES (24, 'Ahorro e Inversiones para Principiantes', 'http://example.com/ahorro-inversiones', 'ahorro-inversiones.jpg', 'Guía básica para comenzar a ahorrar e invertir.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual VALUES (26, 'Video del toro', 'no lo tengo', 'img.jpg', '', 'Inversiones');
INSERT INTO public.contenidoaudiovisual VALUES (27, 'Video del toro', 'no lo tengo', 'img.jpg', 'esta vez con descripcion', 'Inversiones');


--
-- TOC entry 4845 (class 0 OID 16416)
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
-- TOC entry 4847 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: gestor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gestor VALUES (35, 15, 2, 15, 10000, '2024-10-08 00:00:00', 'g');


--
-- TOC entry 4849 (class 0 OID 16426)
-- Dependencies: 224
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.perfil VALUES (15, false, 'Toro', NULL, 'prueba1@gmail.com', '$2a$08$krtbVkhiDaH0AHiqQQtEGu2.GApJTNCnDWJVv5m27bmiK357/6RUC', NULL, NULL, NULL);


--
-- TOC entry 4851 (class 0 OID 16433)
-- Dependencies: 226
-- Data for Name: subtipomovimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subtipomovimiento VALUES (1, 1, 'Impuestos');
INSERT INTO public.subtipomovimiento VALUES (5, 1, 'Comida');
INSERT INTO public.subtipomovimiento VALUES (6, 1, 'Amigos');
INSERT INTO public.subtipomovimiento VALUES (7, 1, 'Transporte');
INSERT INTO public.subtipomovimiento VALUES (8, 1, 'Salud');
INSERT INTO public.subtipomovimiento VALUES (9, 1, 'Entretenimiento');
INSERT INTO public.subtipomovimiento VALUES (10, 1, 'Educación');
INSERT INTO public.subtipomovimiento VALUES (11, 1, 'Vivienda');
INSERT INTO public.subtipomovimiento VALUES (12, 1, 'Ropa');
INSERT INTO public.subtipomovimiento VALUES (13, 1, 'Viajes');
INSERT INTO public.subtipomovimiento VALUES (14, 1, 'Deportes');
INSERT INTO public.subtipomovimiento VALUES (15, 2, 'Salario');
INSERT INTO public.subtipomovimiento VALUES (16, 2, 'Bonos');
INSERT INTO public.subtipomovimiento VALUES (17, 2, 'Intereses');
INSERT INTO public.subtipomovimiento VALUES (18, 2, 'Dividendos');
INSERT INTO public.subtipomovimiento VALUES (19, 2, 'Alquileres');
INSERT INTO public.subtipomovimiento VALUES (20, 2, 'Ventas');
INSERT INTO public.subtipomovimiento VALUES (21, 2, 'Regalos');
INSERT INTO public.subtipomovimiento VALUES (22, 2, 'Lotería');
INSERT INTO public.subtipomovimiento VALUES (23, 2, 'Inversiones');
INSERT INTO public.subtipomovimiento VALUES (24, 2, 'Otros');
INSERT INTO public.subtipomovimiento VALUES (25, 3, 'Cuenta de Ahorro');
INSERT INTO public.subtipomovimiento VALUES (26, 3, 'Fondo de Emergencia');
INSERT INTO public.subtipomovimiento VALUES (27, 3, 'Ahorro para la Educación');
INSERT INTO public.subtipomovimiento VALUES (28, 3, 'Ahorro para la Jubilación');
INSERT INTO public.subtipomovimiento VALUES (29, 3, 'Ahorro para Viajes');
INSERT INTO public.subtipomovimiento VALUES (30, 3, 'Ahorro para Compra de Vivienda');
INSERT INTO public.subtipomovimiento VALUES (31, 3, 'Ahorro para Eventos Especiales');
INSERT INTO public.subtipomovimiento VALUES (32, 3, 'Inversiones a Largo Plazo');
INSERT INTO public.subtipomovimiento VALUES (33, 3, 'Ahorro para Vehículo');
INSERT INTO public.subtipomovimiento VALUES (34, 3, 'Ahorro para Salud');


--
-- TOC entry 4853 (class 0 OID 16437)
-- Dependencies: 228
-- Data for Name: tipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipos VALUES (1, 'Gastos');
INSERT INTO public.tipos VALUES (2, 'Ingreso');
INSERT INTO public.tipos VALUES (3, 'Ahorro');


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: asesor_idasesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asesor_idasesor_seq', 1, false);


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 219
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidoaudiovisual_idvideo_seq', 27, true);


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 221
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.definicionterminos_idtermino_seq', 10, true);


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 223
-- Name: gestor_idgestor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gestor_idgestor_seq', 35, true);


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_idperfil_seq', 15, true);


--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtipomovimiento_idsubtipo_seq', 34, true);


--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_idtipos_seq', 1, false);


--
-- TOC entry 4680 (class 2606 OID 16449)
-- Name: asesor asesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT asesor_pkey PRIMARY KEY (idasesor);


--
-- TOC entry 4682 (class 2606 OID 16451)
-- Name: contenidoaudiovisual contenidoaudiovisual_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual
    ADD CONSTRAINT contenidoaudiovisual_pkey PRIMARY KEY (idvideo);


--
-- TOC entry 4684 (class 2606 OID 16453)
-- Name: definicionterminos definicionterminos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos
    ADD CONSTRAINT definicionterminos_pkey PRIMARY KEY (idtermino);


--
-- TOC entry 4686 (class 2606 OID 16455)
-- Name: gestor gestor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT gestor_pkey PRIMARY KEY (idgestor);


--
-- TOC entry 4688 (class 2606 OID 16457)
-- Name: perfil perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (idperfil);


--
-- TOC entry 4690 (class 2606 OID 16459)
-- Name: subtipomovimiento subtipomovimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT subtipomovimiento_pkey PRIMARY KEY (idsubtipo);


--
-- TOC entry 4692 (class 2606 OID 16461)
-- Name: tipos tipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_pkey PRIMARY KEY (idtipos);


--
-- TOC entry 4693 (class 2606 OID 16462)
-- Name: asesor fk_asesor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT fk_asesor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4694 (class 2606 OID 16467)
-- Name: gestor fk_gestor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4695 (class 2606 OID 16472)
-- Name: gestor fk_gestor_subtipomovimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_subtipomovimiento FOREIGN KEY (idsubtipo_fk) REFERENCES public.subtipomovimiento(idsubtipo);


--
-- TOC entry 4696 (class 2606 OID 16477)
-- Name: gestor fk_gestor_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


--
-- TOC entry 4697 (class 2606 OID 16482)
-- Name: subtipomovimiento fk_subtipomovimiento_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT fk_subtipomovimiento_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-10-07 09:05:47

--
-- PostgreSQL database dump complete
--

