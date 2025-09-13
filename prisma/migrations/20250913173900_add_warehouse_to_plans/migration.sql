/*
  Warnings:

  - Added the required column `warehouse_id` to the `audit_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."audit_plans" ADD COLUMN     "warehouse_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."audit_plans" ADD CONSTRAINT "audit_plans_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
