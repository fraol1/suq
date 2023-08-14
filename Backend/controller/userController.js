import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "password doesn't match" });
      }

      generateToken(res, user._id);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "no user found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Can't register. please try again later",
      error: error,
    });
  }
};

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "user with that email already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const new_user = await User.create({ name, email, password: hashed });
      if (new_user) {
        generateToken(req, new_user._id);

        res.status(201).json(new_user);
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "Can't register. please try again later",
      error: error,
    });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "we can't find user with that id" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "no user found" });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } else {
      res.status(401).json({ message: "user doesn't exist" });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (user) {
      
      if (user.isAdmin) {
        res.status(401).json({ message: "can't delete an admin" });
      }
      await User.findByIdAndDelete(userId);
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "user doesn't exist" });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

const updateUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin)

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } else {
      res.status(401).json({ message: "user doesn't exist" });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export {
  login,
  Register,
  logout,
  getUserProfile,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
};
