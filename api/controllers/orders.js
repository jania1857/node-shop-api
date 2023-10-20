const {db} = require("../../db.connection")

function getOrders(req, res, next) {
    return res.status(200).json({
        message: "Working!"
    })
}

function getOrder(req, res, next) {
    return res.status(200).json({
        message: "Working!"
    })
}

function addOrder(req, res, next) {
    return res.status(201).json({
        message: "Working!"
    })
}

function deleteOrder(req, res, next) {
    return res.status(200).json({
        message: "Working!"
    })
}



module.exports = {
    getOrders,
    getOrder,
    addOrder,
    deleteOrder
}