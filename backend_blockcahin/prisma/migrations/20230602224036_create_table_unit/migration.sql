-- CreateTable
CREATE TABLE "Unit" (
    "userId" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "hashTx" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_userId_key" ON "Unit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unit_key" ON "Unit"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_hashTx_key" ON "Unit"("hashTx");
