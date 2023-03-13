import User from "../models/User.js";

export const admin = async (req,res,next)=> {
        try {
                const user = await User.findById(req.user._id)
                if(!user.isAdmin){
                        const error = new Error("YOu have no access") ;
                        error.status = 401;
                        throw error;
                } 
                next()
        } catch (error) {
                next({error:error.message})
        }
}