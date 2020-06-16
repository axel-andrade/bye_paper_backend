-- SCRIPTS

-- Cria um Schema
CREATE SCHEMA `bye_paper`;

---- Cria uma tabela
CREATE TABLE IF NOT EXISTS `bye_paper`.`products` (
    `id` INT NOT NULL,
    `title` VARCHAR(80) NULL,
    `description` TEXT(4000) NULL,
    PRIMARY KEY (`id`)
);

---- Cria uma tabela
CREATE TABLE "customers"."customers" (
    "id" SERIAL NOT NULL,
    "cpf" character varying(11) NOT NULL,
    "name" character varying(100) NOT NULL,
    "email" character varying(50) NOT NULL,
    "phone" character varying(20) NOT NULL,
    "birthDate" date NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP WITH TIME ZONE,
    "defaultCardId" integer,

    CONSTRAINT "REL_05186f3b5cd9f407ad39acaf67"
    UNIQUE ("defaultCardId"),
    CONSTRAINT "PK_1f76724f85fc0246661e390b071"
    PRIMARY KEY ("id")
);
