
import jwt from "jsonwebtoken";
import express from "express";

const checkAuth = (req: express.Request, res:express.Response ,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    
    if(token) {
        try {
            const decoded = jwt.verify(token, 'secret')
            console.log(req.body);
            req.body._id = decoded._id
            next()
        } catch (error) {
            return res.status(403).json({
                error
            })
        }
    }else {
        return res.status(404).json(undefined)
    }
}


export {
    checkAuth
}