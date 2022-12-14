import jwt from "jsonwebtoken"
import {SECRET_KEY} from "../constants.js";

export function authMiddleware (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        req.user = jwt.verify(token, SECRET_KEY)
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};