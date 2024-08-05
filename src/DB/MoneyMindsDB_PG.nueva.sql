--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-05 07:46:00

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
-- TOC entry 6 (class 2615 OID 16738)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 230 (class 1255 OID 16739)
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
-- TOC entry 231 (class 1255 OID 16740)
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
-- TOC entry 232 (class 1255 OID 16741)
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
-- TOC entry 233 (class 1255 OID 16742)
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
-- TOC entry 234 (class 1255 OID 16743)
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
-- TOC entry 235 (class 1255 OID 16744)
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
-- TOC entry 216 (class 1259 OID 16745)
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
-- TOC entry 217 (class 1259 OID 16750)
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
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 217
-- Name: asesor_idasesor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asesor_idasesor_seq OWNED BY public.asesor.idasesor;


--
-- TOC entry 218 (class 1259 OID 16751)
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
-- TOC entry 219 (class 1259 OID 16756)
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
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 219
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenidoaudiovisual_idvideo_seq OWNED BY public.contenidoaudiovisual.idvideo;


--
-- TOC entry 220 (class 1259 OID 16757)
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
-- TOC entry 221 (class 1259 OID 16762)
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
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 221
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.definicionterminos_idtermino_seq OWNED BY public.definicionterminos.idtermino;


--
-- TOC entry 222 (class 1259 OID 16763)
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
-- TOC entry 223 (class 1259 OID 16766)
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
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 223
-- Name: gestor_idgestor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gestor_idgestor_seq OWNED BY public.gestor.idgestor;


--
-- TOC entry 224 (class 1259 OID 16767)
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
-- TOC entry 225 (class 1259 OID 16772)
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
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_idperfil_seq OWNED BY public.perfil.idperfil;


--
-- TOC entry 226 (class 1259 OID 16773)
-- Name: subtipomovimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtipomovimiento (
    idsubtipo integer NOT NULL,
    idtipos_fk integer NOT NULL,
    descripcion character varying(250)
);


ALTER TABLE public.subtipomovimiento OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16776)
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
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtipomovimiento_idsubtipo_seq OWNED BY public.subtipomovimiento.idsubtipo;


--
-- TOC entry 228 (class 1259 OID 16777)
-- Name: tipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos (
    idtipos integer NOT NULL,
    descripcion character varying(250) NOT NULL
);


ALTER TABLE public.tipos OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16780)
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
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_idtipos_seq OWNED BY public.tipos.idtipos;


--
-- TOC entry 4725 (class 2604 OID 16781)
-- Name: asesor idasesor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor ALTER COLUMN idasesor SET DEFAULT nextval('public.asesor_idasesor_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 16782)
-- Name: contenidoaudiovisual idvideo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual ALTER COLUMN idvideo SET DEFAULT nextval('public.contenidoaudiovisual_idvideo_seq'::regclass);


--
-- TOC entry 4727 (class 2604 OID 16783)
-- Name: definicionterminos idtermino; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos ALTER COLUMN idtermino SET DEFAULT nextval('public.definicionterminos_idtermino_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 16784)
-- Name: gestor idgestor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor ALTER COLUMN idgestor SET DEFAULT nextval('public.gestor_idgestor_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 16785)
-- Name: perfil idperfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN idperfil SET DEFAULT nextval('public.perfil_idperfil_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 16786)
-- Name: subtipomovimiento idsubtipo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento ALTER COLUMN idsubtipo SET DEFAULT nextval('public.subtipomovimiento_idsubtipo_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 16787)
-- Name: tipos idtipos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos ALTER COLUMN idtipos SET DEFAULT nextval('public.tipos_idtipos_seq'::regclass);


--
-- TOC entry 4894 (class 0 OID 16745)
-- Dependencies: 216
-- Data for Name: asesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.asesor (idasesor, idperfil_fk, mensaje, fecha) VALUES (1, 1, 'Consulta sobre el uso de SQL en bases de datos.', '2024-07-01 10:00:00');
INSERT INTO public.asesor (idasesor, idperfil_fk, mensaje, fecha) VALUES (2, 2, 'Necesito ayuda con un script en Python.', '2024-07-02 11:00:00');
INSERT INTO public.asesor (idasesor, idperfil_fk, mensaje, fecha) VALUES (3, 3, '¿Cómo puedo optimizar consultas SQL?', '2024-07-03 12:00:00');
INSERT INTO public.asesor (idasesor, idperfil_fk, mensaje, fecha) VALUES (4, 4, 'Recomendaciones para aprender Machine Learning.', '2024-07-04 13:00:00');
INSERT INTO public.asesor (idasesor, idperfil_fk, mensaje, fecha) VALUES (5, 5, 'Problemas al conectar a la base de datos.', '2024-07-05 14:00:00');


--
-- TOC entry 4896 (class 0 OID 16751)
-- Dependencies: 218
-- Data for Name: contenidoaudiovisual; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (11, 'Estrategias de Ahorro Personal', 'http://example.com/estrategias-ahorro', 'estrategias-ahorro.jpg', 'Consejos y estrategias para mejorar el ahorro personal.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (12, 'Planificación de la Jubilación', 'http://example.com/planificacion-jubilacion', 'planificacion-jubilacion.jpg', 'Cómo planificar tu jubilación mediante el ahorro y la inversión.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (13, 'Ahorro para Emergencias', 'http://example.com/ahorro-emergencias', 'ahorro-emergencias.jpg', 'La importancia de tener un fondo de emergencia.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (14, 'Fundamentos de Inversiones', 'http://example.com/fundamentos-inversiones', 'fundamentos-inversiones.jpg', 'Introducción a los conceptos básicos de las inversiones.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (15, 'Inversiones en el Mercado de Valores', 'http://example.com/inversiones-mercado-valores', 'inversiones-mercado-valores.jpg', 'Guía sobre cómo invertir en el mercado de valores.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (16, 'Diversificación de Cartera', 'http://example.com/diversificacion-cartera', 'diversificacion-cartera.jpg', 'La importancia de diversificar tu cartera de inversiones.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (17, 'Inversiones Inmobiliarias', 'http://example.com/inversiones-inmobiliarias', 'inversiones-inmobiliarias.jpg', 'Cómo invertir en el mercado inmobiliario.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (18, 'Inversiones a Largo Plazo', 'http://example.com/inversiones-largo-plazo', 'inversiones-largo-plazo.jpg', 'Estrategias para inversiones a largo plazo.', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (19, 'Introducción a los Impuestos', 'http://example.com/introduccion-impuestos', 'introduccion-impuestos.jpg', 'Conceptos básicos sobre los impuestos y su impacto en tus finanzas.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (20, 'Planificación Fiscal para Individuos', 'http://example.com/planificacion-fiscal', 'planificacion-fiscal.jpg', 'Cómo planificar tus impuestos de manera eficiente.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (21, 'Impuestos sobre Inversiones', 'http://example.com/impuestos-inversiones', 'impuestos-inversiones.jpg', 'Entendiendo los impuestos aplicables a las inversiones.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (22, 'Reducción de Impuestos Legales', 'http://example.com/reduccion-impuestos', 'reduccion-impuestos.jpg', 'Métodos legales para reducir tus impuestos.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (23, 'Impuestos y Ahorro', 'http://example.com/impuestos-ahorro', 'impuestos-ahorro.jpg', 'La relación entre los impuestos y el ahorro.', 'Impuestos');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (24, 'Ahorro e Inversiones para Principiantes', 'http://example.com/ahorro-inversiones', 'ahorro-inversiones.jpg', 'Guía básica para comenzar a ahorrar e invertir.', 'Ahorro');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (26, 'Video del toro', 'no lo tengo', 'img.jpg', '', 'Inversiones');
INSERT INTO public.contenidoaudiovisual (idvideo, titulo, videolink, img, descripcion, categoria) VALUES (27, 'Video del toro', 'no lo tengo', 'img.jpg', 'esta vez con descripcion', 'Inversiones');


--
-- TOC entry 4898 (class 0 OID 16757)
-- Dependencies: 220
-- Data for Name: definicionterminos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (1, 'SQL', 'Structured Query Language, es un lenguaje de programación utilizado para gestionar bases de datos relacionales.', 'img_sql.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (2, 'Python', 'Python es un lenguaje de programación interpretado de alto nivel, diseñado para ser fácil de leer y simple de implementar.', 'img_python.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (3, 'Machine Learning', 'Machine Learning es una rama de la inteligencia artificial que se centra en el desarrollo de algoritmos que permiten a las computadoras aprender de los datos.', 'img_ml.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (4, 'Historia del Arte', 'La historia del arte estudia el desarrollo del arte a través del tiempo, considerando factores sociales, políticos y culturales.', 'img_arte.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (5, 'Yoga', 'El yoga es una disciplina física y mental que se originó en la India, enfocada en la meditación y posturas físicas.', 'img_yoga.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (6, 'Astronomía', 'La astronomía es la ciencia que estudia los cuerpos celestes, sus movimientos y fenómenos relacionados.', 'img_astronomy.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (7, 'Fotografía', 'La fotografía es el arte y la técnica de obtener imágenes duraderas debido a la acción de la luz.', 'img_photography.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (8, 'Programación en Java', 'Java es un lenguaje de programación de propósito general, concurrente y basado en clases, diseñado para tener las menos dependencias posibles.', 'img_java.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (9, 'Guitarra', 'La guitarra es un instrumento musical de cuerdas pulsadas, compuesto por una caja de resonancia, un mástil sobre el que va adosado el diapasón o trastero, generalmente con un agujero acústico en el centro de la tapa (boca).', 'img_guitar.jpg');
INSERT INTO public.definicionterminos (idtermino, titulo, contenido, img) VALUES (10, 'Cocina Italiana', 'La cocina italiana es una expresión de las artes culinarias desarrolladas en Italia, rica en sabor y variada en ingredientes.', 'img_italian_cuisine.jpg');


--
-- TOC entry 4900 (class 0 OID 16763)
-- Dependencies: 222
-- Data for Name: gestor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gestor (idgestor, idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones) VALUES (1, 1, 1, 1, 1000, '2024-07-01 10:00:00', 'Primera observación');


--
-- TOC entry 4902 (class 0 OID 16767)
-- Dependencies: 224
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.perfil (idperfil, admin, nombre, apellido, foto, mail, "contraseña", pasatiempo, conocimiento, ultactividad) VALUES (2, false, 'Maria', 'Garcia', 'foto2.jpg', 'maria.garcia@example.com', 'password2', 'Cocinar', 'Python', 'Script Python');
INSERT INTO public.perfil (idperfil, admin, nombre, apellido, foto, mail, "contraseña", pasatiempo, conocimiento, ultactividad) VALUES (4, false, 'Ana', 'Martinez', 'foto4.jpg', 'ana.martinez@example.com', 'password4', 'Deporte', 'Bases de Datos', 'Conexión BD');
INSERT INTO public.perfil (idperfil, admin, nombre, apellido, foto, mail, "contraseña", pasatiempo, conocimiento, ultactividad) VALUES (1, true, 'Juan', 'Perez', 'foto1.jpg', 'juan.perez@example.com', 'password1', NULL, NULL, NULL);
INSERT INTO public.perfil (idperfil, admin, nombre, apellido, foto, mail, "contraseña", pasatiempo, conocimiento, ultactividad) VALUES (3, true, 'Carlos', 'Lopez', 'foto3.jpg', 'carlos.lopez@example.com', 'password3', NULL, NULL, NULL);
INSERT INTO public.perfil (idperfil, admin, nombre, apellido, foto, mail, "contraseña", pasatiempo, conocimiento, ultactividad) VALUES (5, true, 'Luis', 'Hernandez', 'foto5.jpg', 'luis.hernandez@example.com', 'password5', NULL, NULL, NULL);


--
-- TOC entry 4904 (class 0 OID 16773)
-- Dependencies: 226
-- Data for Name: subtipomovimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (1, 1, 'Impuestos');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (5, 1, 'Comida');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (6, 1, 'Amigos');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (7, 1, 'Transporte');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (8, 1, 'Salud');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (9, 1, 'Entretenimiento');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (10, 1, 'Educación');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (11, 1, 'Vivienda');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (12, 1, 'Ropa');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (13, 1, 'Viajes');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (14, 1, 'Deportes');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (15, 2, 'Salario');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (16, 2, 'Bonos');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (17, 2, 'Intereses');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (18, 2, 'Dividendos');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (19, 2, 'Alquileres');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (20, 2, 'Ventas');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (21, 2, 'Regalos');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (22, 2, 'Lotería');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (23, 2, 'Inversiones');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (24, 2, 'Otros');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (25, 3, 'Cuenta de Ahorro');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (26, 3, 'Fondo de Emergencia');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (27, 3, 'Ahorro para la Educación');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (28, 3, 'Ahorro para la Jubilación');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (29, 3, 'Ahorro para Viajes');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (30, 3, 'Ahorro para Compra de Vivienda');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (31, 3, 'Ahorro para Eventos Especiales');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (32, 3, 'Inversiones a Largo Plazo');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (33, 3, 'Ahorro para Vehículo');
INSERT INTO public.subtipomovimiento (idsubtipo, idtipos_fk, descripcion) VALUES (34, 3, 'Ahorro para Salud');


--
-- TOC entry 4906 (class 0 OID 16777)
-- Dependencies: 228
-- Data for Name: tipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipos (idtipos, descripcion) VALUES (1, 'Gastos');
INSERT INTO public.tipos (idtipos, descripcion) VALUES (2, 'Ingreso');
INSERT INTO public.tipos (idtipos, descripcion) VALUES (3, 'Ahorro');


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 217
-- Name: asesor_idasesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asesor_idasesor_seq', 1, false);


--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 219
-- Name: contenidoaudiovisual_idvideo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenidoaudiovisual_idvideo_seq', 27, true);


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 221
-- Name: definicionterminos_idtermino_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.definicionterminos_idtermino_seq', 10, true);


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 223
-- Name: gestor_idgestor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gestor_idgestor_seq', 33, true);


--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_idperfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_idperfil_seq', 1, false);


--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 227
-- Name: subtipomovimiento_idsubtipo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtipomovimiento_idsubtipo_seq', 34, true);


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 229
-- Name: tipos_idtipos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_idtipos_seq', 1, false);


--
-- TOC entry 4733 (class 2606 OID 16789)
-- Name: asesor asesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT asesor_pkey PRIMARY KEY (idasesor);


--
-- TOC entry 4735 (class 2606 OID 16791)
-- Name: contenidoaudiovisual contenidoaudiovisual_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenidoaudiovisual
    ADD CONSTRAINT contenidoaudiovisual_pkey PRIMARY KEY (idvideo);


--
-- TOC entry 4737 (class 2606 OID 16793)
-- Name: definicionterminos definicionterminos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definicionterminos
    ADD CONSTRAINT definicionterminos_pkey PRIMARY KEY (idtermino);


--
-- TOC entry 4739 (class 2606 OID 16795)
-- Name: gestor gestor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT gestor_pkey PRIMARY KEY (idgestor);


--
-- TOC entry 4741 (class 2606 OID 16797)
-- Name: perfil perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (idperfil);


--
-- TOC entry 4743 (class 2606 OID 16799)
-- Name: subtipomovimiento subtipomovimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT subtipomovimiento_pkey PRIMARY KEY (idsubtipo);


--
-- TOC entry 4745 (class 2606 OID 16801)
-- Name: tipos tipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_pkey PRIMARY KEY (idtipos);


--
-- TOC entry 4746 (class 2606 OID 16802)
-- Name: asesor fk_asesor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asesor
    ADD CONSTRAINT fk_asesor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4747 (class 2606 OID 16807)
-- Name: gestor fk_gestor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_perfil FOREIGN KEY (idperfil_fk) REFERENCES public.perfil(idperfil);


--
-- TOC entry 4748 (class 2606 OID 16812)
-- Name: gestor fk_gestor_subtipomovimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_subtipomovimiento FOREIGN KEY (idsubtipo_fk) REFERENCES public.subtipomovimiento(idsubtipo);


--
-- TOC entry 4749 (class 2606 OID 16817)
-- Name: gestor fk_gestor_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gestor
    ADD CONSTRAINT fk_gestor_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


--
-- TOC entry 4750 (class 2606 OID 16822)
-- Name: subtipomovimiento fk_subtipomovimiento_tipos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipomovimiento
    ADD CONSTRAINT fk_subtipomovimiento_tipos FOREIGN KEY (idtipos_fk) REFERENCES public.tipos(idtipos);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-08-05 07:46:00

--
-- PostgreSQL database dump complete
--

