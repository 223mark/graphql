const orders = [
    {
        date: '2005-05-05',
        subtotal: 90.22,
        items: [
            {
                product: {
                    id: 'redshoe',
                    description: 'Old red shoe',
                    price: 45.21
                    
                },
                quantity: 2,
            }
        ]
    }
];

function getAllOrders() {
    return orders;
}

module.exports = {
    getAllOrders
}