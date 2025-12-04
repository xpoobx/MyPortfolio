import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  completion: { type: Date, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // NEW IMAGE FIELD
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
