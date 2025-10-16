import News from "../models/News.js";

// Create news
export const createNews = async (req, res) => {
  try {
    const { title, content, image, author, category } = req.body;
    const news = await News.create({
      title,
      content,
      image,
      author,
      category,
    });
    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ publishedAt: -1 });
    res.status(200).json({ success: true, data: newsList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single news
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: "News not found" });
    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update news
export const updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedNews) return res.status(404).json({ success: false, message: "News not found" });
    res.status(200).json({ success: true, data: updatedNews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ success: false, message: "News not found" });
    res.status(200).json({ success: true, message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
