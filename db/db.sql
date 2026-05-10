PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS USUARIOS;

CREATE TABLE USUARIOS (
    ID INTEGER PRIMARY KEY,
    NOME TEXT NOT NULL,
    SENHA1 TEXT NOT NULL,
    SENHA2 TEXT NOT NULL,
    EMAIL TEXT NOT NULL UNIQUE
);

-- Base com 100 registros para apresentacao da APS.
INSERT INTO USUARIOS (ID, NOME, SENHA1, SENHA2, EMAIL)
VALUES (1, 'Guikkio', 'APStime', 'APShome', 'guikkio@aps.com');

WITH RECURSIVE sequenciaD(id) AS (
    SELECT 2
    UNION ALL
    SELECT id + 1
    FROM sequenciaD
    WHERE id < 100
)
INSERT INTO USUARIOS (ID, NOME, SENHA1, SENHA2, EMAIL)
SELECT
    id,
    printf('Usuario %03d', id),
    printf('senha%03d', id),
    printf('senha%03d', id),
    printf('usuario%03d@aps.com', id)
FROM sequenciaD;

-- 5 consultas para apresentar no trabalho.

-- 1) Quantidade total de usuarios cadastrados.
SELECT COUNT(*) AS TOTAL_USUARIOS FROM USUARIOS;
-- Resultado esperado:
-- TOTAL_USUARIOS
-- 100

-- 2) Primeiros 5 usuarios cadastrados.
SELECT ID, NOME, EMAIL
FROM USUARIOS
WHERE ID <= 5
ORDER BY ID;
-- Resultado esperado:
-- 1 | Usuario 001 | usuario001@aps.com
-- 2 | Usuario 002 | usuario002@aps.com
-- 3 | Usuario 003 | usuario003@aps.com
-- 4 | Usuario 004 | usuario004@aps.com
-- 5 | Usuario 005 | usuario005@aps.com

-- 3) Quantidade de usuarios com ID par.
SELECT COUNT(*) AS TOTAL_IDS_PARES
FROM USUARIOS
WHERE ID % 2 = 0;
-- Resultado esperado:
-- TOTAL_IDS_PARES
-- 50

-- 4) Usuarios com email entre usuario090@aps.com e usuario099@aps.com.
SELECT ID, NOME, EMAIL
FROM USUARIOS
WHERE EMAIL LIKE 'usuario09%@aps.com'
ORDER BY ID;
-- Resultado esperado:
-- 90 | Usuario 090 | usuario090@aps.com
-- 91 | Usuario 091 | usuario091@aps.com
-- 92 | Usuario 092 | usuario092@aps.com
-- 93 | Usuario 093 | usuario093@aps.com
-- 94 | Usuario 094 | usuario094@aps.com
-- 95 | Usuario 095 | usuario095@aps.com
-- 96 | Usuario 096 | usuario096@aps.com
-- 97 | Usuario 097 | usuario097@aps.com
-- 98 | Usuario 098 | usuario098@aps.com
-- 99 | Usuario 099 | usuario099@aps.com

-- 5) Usuarios com ID par entre 10 e 20.
SELECT ID, NOME, EMAIL
FROM USUARIOS
WHERE ID BETWEEN 10 AND 20
AND ID % 2 = 0
ORDER BY ID;
-- Resultado esperado:
-- 10 | Usuario 010 | usuario010@aps.com
-- 12 | Usuario 012 | usuario012@aps.com
-- 14 | Usuario 014 | usuario014@aps.com
-- 16 | Usuario 016 | usuario016@aps.com
-- 18 | Usuario 018 | usuario018@aps.com
-- 20 | Usuario 020 | usuario020@aps.com
