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

-- CreateIndex
CREATE UNIQUE INDEX "bins_code_key" ON "public"."bins"("code");

-- AddForeignKey
ALTER TABLE "public"."aisles" ADD CONSTRAINT "aisles_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."racks" ADD CONSTRAINT "racks_aisleId_fkey" FOREIGN KEY ("aisleId") REFERENCES "public"."aisles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bins" ADD CONSTRAINT "bins_rack_id_fkey" FOREIGN KEY ("rack_id") REFERENCES "public"."racks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bins" ADD CONSTRAINT "bins_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
