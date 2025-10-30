import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
