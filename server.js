import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, this route is protected!` });
});

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, () => {
  console.info(`Server started on port ${config.port}.`);
});