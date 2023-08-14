import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js';

export const protect = async(req,res,next) => {
    
        let token;
        token = req.cookies.jwt;
       
          if (token) {
             try {
               const decode = jwt.verify(token, process.env.JWT_SECRET);
               req.user = await User.findById(decode.userId).select(
                 "-password"
               );
               next();
             } catch (error) {
               res.json({ error: error });
             }
        } else {
            res.json({message: "no token."})
        }
}


export const isAdmin = (req,res,next) =>{
  if(req.user && req.user.isAdmin){
    next()
  }else {
    res.status(401).json({message:"not authorized"})
  }
}