import Contact from "../models/contact.model.js";

//CREATE
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//READ ALL
export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

//READ BY ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//UPDATE
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE ONE
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
};

//DELETE ALL
export const deleteAllContacts = async (req, res) => {
  await Contact.deleteMany();
  res.json({ message: "All contacts deleted" });
};