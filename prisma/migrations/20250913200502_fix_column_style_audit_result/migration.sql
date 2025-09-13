/*
  Warnings:

  - You are about to drop the column `actualCount` on the `audit_results` table. All the data in the column will be lost.
  - You are about to drop the column `expectedCount` on the `audit_results` table. All the data in the column will be lost.
  - Added the required column `actual_count` to the `audit_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected_count` to the `audit_results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."audit_results" DROP COLUMN "actualCount",
DROP COLUMN "expectedCount",
ADD COLUMN     "actual_count" INTEGER NOT NULL,
ADD COLUMN     "expected_count" INTEGER NOT NULL;
