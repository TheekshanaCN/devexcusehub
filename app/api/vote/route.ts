import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vote from "@/models/vote";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { userId, excuseId, vote } = await request.json();

    if (
      !userId ||
      !excuseId ||
      !["up", "down"].includes(vote)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Cast IDs to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const excuseObjectId = new mongoose.Types.ObjectId(excuseId);

    const existingVote = await Vote.findOne({ userId: userObjectId, excuseId: excuseObjectId });

    if (existingVote) {
      existingVote.vote = vote;
      await existingVote.save();
      return NextResponse.json({ message: "Vote updated" });
    }

    await Vote.create({ userId: userObjectId, excuseId: excuseObjectId, vote });

    return NextResponse.json({ message: "Vote recorded" });
  } catch (error) {
    console.error("Vote API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
