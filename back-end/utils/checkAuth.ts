
import jwt from "jsonwebtoken";
import express from "express";


module.exports.checkAuth = (req: express.Request, res:express.Response ,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if(token) {
        try {
            const decoded = jwt.verify(token, 'secret')
            req.body._id = decoded._id
            next()
        } catch (error) {
            return res.status(403).json({
                message: "Not allowed"
            })
        }
    }else {
        return res.status(404).json({
            message: "Not allowed 404"
        })
    }
}