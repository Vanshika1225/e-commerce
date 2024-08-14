const jwt = require("jsonwebtoken");
const productsModel = require("../Model/ProductsModel");
const generateSecretKey = require("../AuthToken/AuthToken");

const secretKey = generateSecretKey();

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  try {
    const decoded_token = jwt.verify(token, secretKey);
    if (decoded_token.role !== "admin") {
      res.status(401).json({
        success: false,
        message: "Unable to decode the token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};

exports.AddProduct = [
  this.isAdmin,
  (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        imgURL,
        stockQuantity,
        ratings,
      } = req.body;

      const newProduct = new productsModel({
        id: Math.floor(Math.random() * 1000000),
        name: name,
        description: description,
        price: price,
        category: category,
        imgURL: imgURL,
        stockQuantity: stockQuantity,
        ratings: ratings,
      });

      newProduct
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: "Product added successfully",
            product: product,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error while adding product",
            error: err,
          });
        });
    } catch (err) {
      console.error("Token Verification Error:", err);
      res.status(500).json({
        success: false,
        message: "Token verification failed",
        error: err.message,
      });
    }
  },
];

exports.ShowAllProduct = async (req, res) => {
  console.log("product list");
  try {
    const product = await productsModel.find({});
    console.log(product);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching products",
      error: error.message,
    });
  }
};

exports.EditProduct = [
  this.isAdmin,
  async (req, res) => {
    try {
      let productId = req.params.id;
      productId = productId.replace(/^:+/, "");
      const updatedData = req.body;
      console.log(productId, updatedData);
      const product = await productsModel.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true, runValidators: true }
      );
      console.log(product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: product,
      });
    } catch (error) {
      console.error("Token Verification Error:", error);
      res.status(500).json({
        success: false,
        message: "Token verification failed",
        error: error.message,
      });
    }
  },
];

