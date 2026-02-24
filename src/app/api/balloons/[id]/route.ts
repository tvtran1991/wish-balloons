import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const balloon = await prisma.balloon.findUnique({
    where: { id },
  });

  if (!balloon || balloon.status === "hidden") {
    return NextResponse.json({ error: "Balloon not found" }, { status: 404 });
  }

  return NextResponse.json(balloon);
}
