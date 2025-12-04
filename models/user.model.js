import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // added role
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
