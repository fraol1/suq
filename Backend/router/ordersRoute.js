import express from "express";
import {
  addOrders,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controller/ordersController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect,addOrders).get(protect, isAdmin, getOrders);
router
  .route("/myOrders")
  .get(protect, getMyOrders)
  
router
  .route("/:id")
  .get(protect, isAdmin, getOrderById)
router
  .route("/:id/pay")
  .put(protect, updateOrderToPaid)
router
  .route("/:id/deliver")
  .put(protect, isAdmin ,updateOrderToDelivered)
  

export default router;
