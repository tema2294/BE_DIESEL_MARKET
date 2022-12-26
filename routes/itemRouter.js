import Item from "../models/item.js";
import {Router} from "express";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";

export const deleteItems = async (req, res) => {
    try {
        const {params} = req
        const { itemId } = params

        if (!itemId) {
            res.status(400).json({message: 'Пустой айдишник ошибка'})
        }

        const deletedItem = await Item.findOneAndDelete({_id: itemId},{new: true})
        const updatedItems = await Item.find()
        return res.json(updatedItems)
    } catch (e) {
        res.status(400).json({message: 'Error deleting coin'})
    }
}

export const getItems = async (req, res) => {
    try {

        const { categoryName } = req.params
        let queryItems = []
        const hasCategoryQuery = !!categoryName;

        if (hasCategoryQuery) {
            queryItems = await Item.find({ categoryName })
        } else {
            queryItems = await Item.find()
        }
        return res.json(queryItems)

    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'update error'})
    }
}

export const updateItem = async (req, res) => {
    try {
        const responseItem = req.body
        const { _id,...otherFields } = responseItem

            if (!_id) return res.status(400).json({message: 'ID обязательное поле'})
            const updatedItem = await Item.findByIdAndUpdate(_id, {...otherFields}, {new: true})
            if (!updatedItem) return res.status(400).json({message: 'Товар не найден'})

            return res.json({message: 'Товар Успешно обновлен!',item: updatedItem})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Ошибка сохранения',serverMessage: e})
    }
}

export const createItem = async (req, res) => {
    try {
        const responseItem = req.body
            const item = new Item(responseItem)
            await item.save()
            return res.json({message: 'Товар Успешно сохранен!',item: item})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Ошибка сохранения',serverMessage: e})
    }
}

export const updateItems2 = async (req, res) => {
    try {
        const responseItems = req.body
        console.log(req.body)
        await Item.collection.insertMany(responseItems)
        return res.json({message: 'Товар Успешно сохранен!'})


    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Ошибка сохранения',serverMessage: e})
    }
}


const itemsRouter = new Router()


itemsRouter.get('/:categoryName', getItems)
itemsRouter.post('/update-item',roleMiddleware('ADMIN'),updateItem)
itemsRouter.post('/create',roleMiddleware('ADMIN'),createItem)
// itemsRouter.post('/add-many',updateItems2)
itemsRouter.delete('/:itemId',roleMiddleware('ADMIN'),deleteItems)


export default itemsRouter