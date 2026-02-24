import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const REPORT_THRESHOLD = 3;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const balloon = await prisma.balloon.findUnique({ where: { id } });

  if (!balloon || balloon.status === "hidden") {
    return NextResponse.json({ error: "Balloon not found" }, { status: 404 });
  }

  const updated = await prisma.balloon.update({
    where: { id },
    data: {
      reportCount: { increment: 1 },
      ...(balloon.reportCount + 1 >= REPORT_THRESHOLD
        ? { status: "hidden" }
        : {}),
    },
  });

  return NextResponse.json({
    reported: true,
    hidden: updated.status === "hidden",
  });
}
