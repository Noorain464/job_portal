import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
export const register = async(req,res)=>{
    try {
        const {fullname,email,phoneNUmber,password,role} = req.body;
        if(fullname || email || phoneNUmber || password || role){
            return res.status.error(400).json({
                message:"Something is missing",
                success:false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status.error(400).json({
                message:"User already exists",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)

    } catch (error) {
        
    }
}