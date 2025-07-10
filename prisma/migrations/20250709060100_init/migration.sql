/*
  Warnings:

  - You are about to drop the column `employeeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileActivity" DROP CONSTRAINT "ProfileActivity_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileServices" DROP CONSTRAINT "ProfileServices_profileId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employeeId_fkey";

-- DropIndex
DROP INDEX "User_employeeId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employeeId";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "ProfileActivity";

-- DropTable
DROP TABLE "ProfileServices";
