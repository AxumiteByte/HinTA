import Program from "../models/program.model.js";

// @desc Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ startDate: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single program
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create new program (Admin)
export const createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update program (Admin)
export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete program (Admin)
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
