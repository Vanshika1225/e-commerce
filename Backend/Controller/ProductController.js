const jwt = require("jsonwebtoken");
const productsModel = require("../Model/ProductsModel");
const generateSecretKey = require("../AuthToken/AuthToken");

const secretKey = generateSecretKey();

exports.AddProduct = (req, res) => {
  console.log("Request Headers:", req.headers);

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not provided or incorrect format",
    });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    if (decodedToken.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admins can add the product",
      });
    }

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
};

exports.ShowAllProduct = async(req, res) => {
    console.log("product list")
  try {
    const product = await productsModel.find({});
    console.log(product)
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