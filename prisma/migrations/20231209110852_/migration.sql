/*
  Warnings:

  - Added the required column `uuid` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;
