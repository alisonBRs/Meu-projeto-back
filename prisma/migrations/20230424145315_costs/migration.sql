/*
  Warnings:

  - Made the column `cost` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "services_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_services" ("authorId", "cost", "description", "id", "name") SELECT "authorId", "cost", "description", "id", "name" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
