import Order from "../Model/orderModel.js";
import Product from "../Model/productModel.js";

const addOrders = async (req, res) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: "NO order item" });
      } else {
        const order = new Order({
          orderItem: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined,
          })),
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
      }
    } catch (error) {
        res.status(500).json(error)
    }
}
const getMyOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id})
        res.status.json(orders)
    } catch(error){
        res.status(200).json(error);
    }
}
const getOrderById = async (req, res) => {
   try {const order = await Order.findById(req.params.id)
    res.status(200).json(order)
    } catch( error){
        res.status(200).json(error);
    }
}
const updateOrderToPaid = async (req, res) => {
    res.send("update order to paid")
}
const updateOrderToDelivered = async (req, res) => {
    res.send("update Order To Delivered");
}
const getOrders = async (req, res) => {
    res.send("get all orders");
}

export {
    addOrders,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,

}