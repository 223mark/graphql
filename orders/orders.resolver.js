const ordersModel = require('./order.model');
module.exports = {
    Query: {
        orders: () => {
            return ordersModel.getAllOrders();
        }
    }
}

