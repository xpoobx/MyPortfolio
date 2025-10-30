import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);