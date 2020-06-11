-- SCRIPTS

-- Cria um Schema
CREATE SCHEMA `bye_paper`;

-- Cria uma tabela
CREATE TABLE `bye_paper`.`product` (
    `id` INT NOT NULL,
    `title` VARCHAR(80) NULL,
    `description` TEXT(4000) NULL,
    PRIMARY KEY (`id`)
);