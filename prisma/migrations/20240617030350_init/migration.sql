/*
  Warnings:

  - You are about to drop the `ProjectFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - Added the required column `defaultBranch` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProjectFile_name_path_projectId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectFile";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "repoName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "defaultBranch" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "id", "origin", "path", "updatedAt") SELECT "createdAt", "id", "origin", "path", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE INDEX "Project_repoName_path_origin_idx" ON "Project"("repoName", "path", "origin");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
