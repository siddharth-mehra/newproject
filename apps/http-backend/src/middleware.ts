import { NextFunction, Request, Response } from 'express';
import {verify} from 'jsonwebtoken';
import {jwtsecret} from './config.js';
export const Authmiddleware = async(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    if (!token) {
        res.status(401).json({
            message:"Unauthorized access",
            success: false
        });
    }
    try{
        const res=await verify(token,jwtsecret);
        console.log("Token verified successfully:", res);
        await next();
    }catch(error){
        console.error("Token verification failed:", error);
        res.status(401).json({
            message:"Unauthorized access",
            success: false
        });
    }

    
}