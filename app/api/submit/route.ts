import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Excuse from "@/models/excuse";

export async function GET() {
  try {
    await connectDB();
    const excuses = await Excuse.find();
    return NextResponse.json({ success: true, data: excuses });
  } catch (error) {
    console.error("GET /api/excuses error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch excuses." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { excuse, author } = await req.json();

    if (!excuse || !author) {
      return NextResponse.json({ error: "excuse and author are required" }, { status: 400 });
    }

    const newExcuse = await Excuse.create({ text: excuse, author });

    return NextResponse.json({ success: true, data: newExcuse });
  } catch (error) {
    console.error("POST /api/excuses error:", error);
    return NextResponse.json({ success: false, message: "Failed to submit excuse." }, { status: 500 });
  }
}
