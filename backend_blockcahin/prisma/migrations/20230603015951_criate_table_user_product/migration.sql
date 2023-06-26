/*
  Warnings:

  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Unit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "unit" TEXT NOT NULL,
    "hashTx" TEXT NOT NULL,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Product_unit_key" ON "Product"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "Product_hashTx_key" ON "Product"("hashTx");
