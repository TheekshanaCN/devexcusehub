import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IVote extends Document {
  userId: Types.ObjectId;
  excuseId: Types.ObjectId;
  vote: "up" | "down";
  createdAt: Date;
}

const voteSchema = new Schema<IVote>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  excuseId: { type: Schema.Types.ObjectId, required: true, ref: "Excuse" },
  vote: { type: String, enum: ["up", "down"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
