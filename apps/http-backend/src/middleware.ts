import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtsecret } from './config';


export const createRefreshToken = (userId: string, username: string) => {
    return jwt.sign({userId, username}, jwtsecret, {
        expiresIn: '7d' 
        });
}

export const createAccessToken = (userId: string, username: string) => {
    return jwt.sign({user: { userId, username }}, jwtsecret, {
        expiresIn: '2h' 
    });
}

export const refreshAccessToken =(req:Request, res:Response) => {
    const {refreshToken}=req.body;
    if(!refreshToken){
        return res.status(401).json({
            message:"No refreshToken",
            success: false
        });
    }

    try{
        const decoded =  jwt.verify(refreshToken, jwtsecret) as { userId: string, username: string };
        const newAccessToken = createAccessToken(decoded.userId,decoded.username);

        return res.json({ accessToken: newAccessToken });
  } catch (error) {
        return res.status(401).json({ message: "Invalid or expired refresh token" });
  }

}


export const Authmiddleware = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            message:"Unauthorized access",
            success: false
        });
    }
    try{
        const decode=await jwt.verify(token,jwtsecret) as { user: { userId: string,username:string } };
        
        const successUser=await User.findById(decode.user.userId).select("-password -refreshToken");

        if(!successUser){
            return res.status(401).json({
                message:"Unauthorized access",
                success: false
            });
        }

        req.userId=decode.user.userId;
        next();
    }catch(error){
        console.error("Token verification failed:", error);
        return res.status(401).json({
            message:"Unauthorized access",
            success: false
        });
    }  
}