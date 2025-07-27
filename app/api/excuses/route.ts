import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Excuse from "@/models/excuse";
import Vote from "@/models/vote";

export async function GET() {
  try {
    await connectDB();

    const excuses = await Excuse.find();

    const excusesWithVotes = await Promise.all(
      excuses.map(async (excuse) => {
        const upvoteCount = await Vote.countDocuments({
          excuseId: excuse._id,
          vote: "up",
        });

        const downvoteCount = await Vote.countDocuments({
          excuseId: excuse._id,
          vote: "down",
        });

        return {
          ...excuse.toObject(),
          upvoteCount,
          downvoteCount,
        };
      })
    );

    return NextResponse.json({ success: true, data: excusesWithVotes });
  } catch (error) {
    console.error("GET /api/excuses error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch excuses with votes." },
      { status: 500 }
    );
  }
}
