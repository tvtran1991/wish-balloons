-- CreateTable
CREATE TABLE "balloons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "style_id" INTEGER NOT NULL,
    "wish_text" TEXT NOT NULL,
    "category" TEXT,
    "display_name" TEXT,
    "privacy" TEXT NOT NULL DEFAULT 'public',
    "report_count" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "balloons_pkey" PRIMARY KEY ("id")
);
