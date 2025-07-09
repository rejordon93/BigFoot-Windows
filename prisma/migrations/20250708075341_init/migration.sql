/*
  Warnings:

  - You are about to drop the column `firstname` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");
