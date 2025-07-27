import mongoose from "mongoose";

const ExcuseSchema = new mongoose.Schema({
  text: String,
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Excuse || mongoose.model("Excuse", ExcuseSchema);
