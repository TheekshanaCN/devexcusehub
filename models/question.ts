import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);
