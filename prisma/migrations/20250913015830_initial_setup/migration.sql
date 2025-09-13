-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('PUTAWAY', 'PICK', 'MOVE', 'ADJUSTMENT', 'AUDIT');

-- CreateEnum
CREATE TYPE "public"."PlanStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('PENDING', 'DONE');

-- CreateEnum
CREATE TYPE "public"."AuditStatus" AS ENUM ('PASS', 'FAIL');

-- CreateTable
CREATE TABLE "public"."warehouses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aisles" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aisles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."racks" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "aisleId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "racks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bins" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "rack_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "pallet_count" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 10,
    "last_audit_date" TIMESTAMP(3),
    "risk_score" INTEGER NOT NULL DEFAULT 0,
    "audit_factor" INTEGER NOT NULL DEFAULT 0,
    "activity_factor" INTEGER NOT NULL DEFAULT 0,
    "adjustment_factor" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bin_activities" (
    "id" TEXT NOT NULL,
    "bin_id" TEXT NOT NULL,
    "type" "public"."ActivityType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bin_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."PlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_tasks" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "bin_id" TEXT NOT NULL,
    "status" "public"."TaskStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_results" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "bin_id" TEXT NOT NULL,
    "expectedCount" INTEGER NOT NULL,
    "actualCount" INTEGER NOT NULL,
    "discrepancy" INTEGER NOT NULL,
    "status" "public"."AuditStatus" NOT NULL,
    "notes" TEXT,
    "auditedBy" TEXT,
    "auditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bins_code_key" ON "public"."bins"("code");

-- CreateIndex
CREATE UNIQUE INDEX "audit_tasks_bin_id_status_key" ON "public"."audit_tasks"("bin_id", "status");

-- AddForeignKey
ALTER TABLE "public"."aisles" ADD CONSTRAINT "aisles_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."racks" ADD CONSTRAINT "racks_aisleId_fkey" FOREIGN KEY ("aisleId") REFERENCES "public"."aisles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bins" ADD CONSTRAINT "bins_rack_id_fkey" FOREIGN KEY ("rack_id") REFERENCES "public"."racks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bins" ADD CONSTRAINT "bins_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bin_activities" ADD CONSTRAINT "bin_activities_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "public"."bins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_tasks" ADD CONSTRAINT "audit_tasks_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."audit_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_tasks" ADD CONSTRAINT "audit_tasks_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "public"."bins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_results" ADD CONSTRAINT "audit_results_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."audit_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_results" ADD CONSTRAINT "audit_results_bin_id_fkey" FOREIGN KEY ("bin_id") REFERENCES "public"."bins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
