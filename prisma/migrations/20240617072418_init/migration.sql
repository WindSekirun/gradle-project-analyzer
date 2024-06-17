/*
  Warnings:

  - You are about to drop the column `path` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "repoName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "defaultBranch" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "defaultBranch", "id", "origin", "repoName", "updatedAt") SELECT "createdAt", "defaultBranch", "id", "origin", "repoName", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_repoName_key" ON "Project"("repoName");
CREATE INDEX "Project_repoName_origin_idx" ON "Project"("repoName", "origin");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
