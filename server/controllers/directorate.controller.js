
import Directorate from "../models/Directorate.js";

// Get all directorate members
export const getAllDirectorate = async (req, res) => {
  try {
    const members = await Directorate.find();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single member by ID
export const getDirectorateById = async (req, res) => {
  try {
    const member = await Directorate.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create member
export const createDirectorate = async (req, res) => {
  try {
    const member = await Directorate.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update member
export const updateDirectorate = async (req, res) => {
  try {
    const updated = await Directorate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete member
export const deleteDirectorate = async (req, res) => {
  try {
    const deleted = await Directorate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
