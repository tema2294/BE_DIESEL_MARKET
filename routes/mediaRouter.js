import {Router} from "express";

import {saveMediaMiddleware} from "../middlewares/saveMediaMiddleware.js";
import Media from "../models/media.js";

const addMediaFile = async (req,res) => {

    const { alt } = req.body;
    const { filename } = req?.file || {};
    const media = new Media(filename,alt)
    await media.save()

    res.send(req.file)
}

const mediaRouter = new Router()

mediaRouter.post('/uploadImage', saveMediaMiddleware.single('image'), addMediaFile, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

export default mediaRouter