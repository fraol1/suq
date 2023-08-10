import Product from "../Model/productModel.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: "there is no product in database", error: error });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.json({ message: "there is no product with that id", error: error });
  }
};

export { getProduct, getProducts };
