export const restaurantData = {
    id: 'rest_001',
    tableNumber: '12',
    name: "Spice Symphony",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    cuisine: "Indian Restaurant",
    address: "FC Road, Pune"
};

export const mockCategories = [
    { id: 1, name: 'Starters', description: 'Appetizers', isActive: true },
    { id: 2, name: 'Main Course', description: 'Main dishes', isActive: true },
    { id: 3, name: 'Rice & Breads', description: 'Rice and breads', isActive: true },
    { id: 4, name: 'Desserts', description: 'Sweet treats', isActive: true },
    { id: 5, name: 'Beverages', description: 'Drinks', isActive: true }
];

export const mockMenuItems = [
    {
        id: 1,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese marinated in spices",
        price: 285,
        imageurl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
        categoryId: 1,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 2,
        name: "Chicken Tikka",
        description: "Tender chicken pieces marinated and grilled",
        price: 325,
        imageurl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
        categoryId: 1,
        isVeg: false,
        isAvailable: true
    },
    {
        id: 3,
        name: "Butter Chicken",
        description: "Rich tomato cream sauce with tender chicken",
        price: 385,
        imageurl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
        categoryId: 2,
        isVeg: false,
        isAvailable: true
    },
    {
        id: 4,
        name: "Paneer Butter Masala",
        description: "Cottage cheese in creamy tomato gravy",
        price: 325,
        imageurl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
        categoryId: 2,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 5,
        name: "Dal Makhani",
        description: "Black lentils slow-cooked with butter",
        price: 285,
        imageurl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        categoryId: 2,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 6,
        name: "Biryani",
        description: "Fragrant basmati rice with aromatic spices",
        price: 425,
        imageurl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
        categoryId: 3,
        isVeg: false,
        isAvailable: true
    },
    {
        id: 7,
        name: "Garlic Naan",
        description: "Soft flatbread with garlic and butter",
        price: 65,
        imageurl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
        categoryId: 3,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 8,
        name: "Jeera Rice",
        description: "Fragrant basmati rice with cumin",
        price: 175,
        imageurl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop",
        categoryId: 3,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 9,
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in sugar syrup",
        price: 125,
        imageurl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
        categoryId: 4,
        isVeg: true,
        isAvailable: true
    },
    {
        id: 10,
        name: "Mango Lassi",
        description: "Refreshing yogurt drink with mango",
        price: 95,
        imageurl: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
        categoryId: 5,
        isVeg: true,
        isAvailable: true
    }
];
