import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createBalloonSchema, listBalloonsSchema } from "@/lib/validators";
import { containsProfanity } from "@/lib/moderation";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createBalloonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { wishText, displayName } = parsed.data;

  if (containsProfanity(wishText) || (displayName && containsProfanity(displayName))) {
    return NextResponse.json(
      { error: "Your wish contains inappropriate language. Please revise it." },
      { status: 422 }
    );
  }

  const balloon = await prisma.balloon.create({
    data: {
      styleId: parsed.data.styleId,
      shapeId: parsed.data.shapeId,
      wishText: parsed.data.wishText,
      category: parsed.data.category ?? null,
      displayName: parsed.data.displayName ?? null,
      privacy: parsed.data.privacy,
    },
  });

  return NextResponse.json(balloon, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = listBalloonsSchema.safeParse({
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.get("limit") ?? 20,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query params", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { cursor, limit } = parsed.data;

  const [balloons, totalCount] = await Promise.all([
    prisma.balloon.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "asc" },
      take: limit + 1,
      ...(cursor
        ? {
            cursor: { id: cursor },
            skip: 1,
          }
        : {}),
    }),
    prisma.balloon.count({ where: { status: "active" } }),
  ]);

  const hasMore = balloons.length > limit;
  const results = hasMore ? balloons.slice(0, limit) : balloons;
  const nextCursor = hasMore ? results[results.length - 1].id : null;

  return NextResponse.json({
    balloons: results,
    nextCursor,
    totalCount,
  });
}
