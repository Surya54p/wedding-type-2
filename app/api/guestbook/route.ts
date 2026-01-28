import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const messages = await prisma.guestbook.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, message } = body;

  if (!name || !message) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }

  const newMessage = await prisma.guestbook.create({
    data: { name, message },
  });

  return NextResponse.json(newMessage);
}
