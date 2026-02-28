export const mockOrders = [
    {
        orderId: 1001,
        tableNumber: '12',
        items: [
            { foodItemId: 1, foodName: 'Butter Chicken', quantity: 2, unitPrice: 385, subTotal: 770 },
            { foodItemId: 7, foodName: 'Garlic Naan', quantity: 3, unitPrice: 65, subTotal: 195 },
            { foodItemId: 5, foodName: 'Dal Makhani', quantity: 1, unitPrice: 285, subTotal: 285 }
        ],
        totalAmount: 1250,
        createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
        status: 'PENDING'
    },
    {
        orderId: 1002,
        tableNumber: '5',
        items: [
            { foodItemId: 1, foodName: 'Paneer Tikka', quantity: 2, unitPrice: 285, subTotal: 570 },
            { foodItemId: 6, foodName: 'Biryani', quantity: 1, unitPrice: 425, subTotal: 425 }
        ],
        totalAmount: 995,
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        status: 'PREPARING'
    },
    {
        orderId: 1003,
        tableNumber: '8',
        items: [
            { foodItemId: 2, foodName: 'Chicken Tikka', quantity: 2, unitPrice: 325, subTotal: 650 },
            { foodItemId: 10, foodName: 'Mango Lassi', quantity: 2, unitPrice: 95, subTotal: 190 }
        ],
        totalAmount: 840,
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        status: 'READY'
    },
    {
        orderId: 1004,
        tableNumber: '3',
        items: [
            { foodItemId: 4, foodName: 'Paneer Butter Masala', quantity: 1, unitPrice: 325, subTotal: 325 },
            { foodItemId: 8, foodName: 'Jeera Rice', quantity: 1, unitPrice: 175, subTotal: 175 },
            { foodItemId: 9, foodName: 'Gulab Jamun', quantity: 2, unitPrice: 125, subTotal: 250 }
        ],
        totalAmount: 750,
        createdAt: new Date(Date.now() - 20 * 60000).toISOString(),
        status: 'COMPLETED'
    }
];
