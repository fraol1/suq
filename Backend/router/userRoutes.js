import express from 'express'
import {
  login,
  Register,
  logout,
  getUserProfile,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route("/").post(Register).get(protect,isAdmin,getUsers);
router.post('/login',login)
router.post('/logout',logout)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,isAdmin,deleteUser).put(protect,isAdmin,updateUser).get(protect,getUserById)

export default router
