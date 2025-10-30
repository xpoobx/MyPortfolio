import Project from "../models/project.model.js";

//CREATE
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//READ ALL
export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

//READ BY ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//UPDATE
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE ONE
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};

//DELETE ALL
export const deleteAllProjects = async (req, res) => {
  await Project.deleteMany();
  res.json({ message: "All projects deleted" });
};