import orderModel from "../Model/OrdersModel.js";

export const AddOrder = (req, res) => {
  try {
    const { id, userId, ProductsList, totalAmount, orderStatus, orderDate } =
      req.body;

    const newOrder = new orderModel({
      id: id,
      userId: userId,
      ProductsList: ProductsList,
      totalAmount: totalAmount,
      orderStatus: orderStatus,
      orderDate: orderDate,
    });

    newOrder
      .save()
      .then((order) => {
        res.status(200).json({
          success: true,
          message: "Order added successfully",
          order: order,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({
          success: true,
          message: "Error in order the product",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error while adding order",
      error: error.message,
    });
  }
};
