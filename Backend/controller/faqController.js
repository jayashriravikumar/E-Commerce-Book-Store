import FAQ from "../models/faqModel.js";

// Get all FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ success: true, faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add FAQ
export const addFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category,
    });

    res.status(201).json({ success: true, faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Sccessfully FAQ is deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
