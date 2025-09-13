/*
  Warnings:

  - You are about to drop the column `auditedAt` on the `audit_results` table. All the data in the column will be lost.
  - You are about to drop the column `auditedBy` on the `audit_results` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."audit_results" DROP COLUMN "auditedAt",
DROP COLUMN "auditedBy";
