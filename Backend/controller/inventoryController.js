import Product from "../models/productModel.js";

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    console.log("ID:", id);
    console.log("Stock:", stock);

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: { stock: Number(stock) } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Stock updated",
      product: updated,
    });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};