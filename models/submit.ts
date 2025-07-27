import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubmit extends Document {
  text: string;
  author: string;
}

const submitSchema = new Schema<ISubmit>({
  text: { type: String, required: true },
  author: { type: String, required: true },
});

const Submit: Model<ISubmit> = mongoose.models.Submit || mongoose.model("Submit", submitSchema);

export default Submit;
