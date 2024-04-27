

// ----------------------------- Users -----------------------------
export const Admins_Data = [
    {
        id: 1,
        fullName: "ahmed",
        email: "admin@gmail.com",
    },
    {
        id: 2,
        fullName: "osama",
        email: "admin@gmail.com",
    },
    {
        id: 3,
        fullName: "yasser",
        email: "admin@gmail.com",
    }
]

export const Users_Data = [
    {
        id: 1,
        fullName: "mohammed",
        email: "user@gmail.com",
        phone: 10101010,
    },
    {
        id: 2,
        fullName: "saeed",
        email: "user@gmail.com",
        phone: 10101010,
    },
    {
        id: 3,
        fullName: "taha",
        email: "user@gmail.com",
        phone: 10101010,
    },
]

export const Delivery_Men_Data = [
    {
        id: 1,
        fullName: "mohammed",
        email: "pilot@gmail.com",
        phone: 10101010,
    },
    {
        id: 2,
        fullName: "saeed",
        email: "pilot@gmail.com",
        phone: 10101010,
    },
    {
        id: 3,
        fullName: "taha",
        email: "pilot@gmail.com",
        phone: 10101010,
    },
]


// ----------------------------- Advertisement -----------------------------
export const Offers_Data = [
    {
        id: 1,
        foodItem: "Pizza",
        discount: 50,
        description: "pizza can be small or large",
        oldPrice: 100,
        newPrice: 50,
    },
    {
        id: 2,
        foodItem: "Pasta",
        discount: 50,
        description: "pasta can be small or large",
        oldPrice: 200,
        newPrice: 100,
    },
    {
        id: 3,
        foodItem: "Burger",
        discount: 50,
        description: "burger can be small or large",
        oldPrice: 300,
        newPrice: 150,
    },
]

export const Banners_Data = [
    {
        id: 1,
        image: "https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg",
        title: "عرض اليوم",
        description: "pizza can be small or large",
        price: 350,
    },
    {
        id: 2,
        image: "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
        title: "عرض البرجر",
        description: "burger can be small or large",
        price: 150,
    },
]



// ----------------------------- Menu -----------------------------
export const Categories_Data = [
    {
        id: 1,
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
        title: 'برجر',
        banner: "banner data",
        foodItems: "foodItems data",
    },
    {
        id: 2,
        image: "https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg",
        title: 'بيتزا',
        banner: "banner data",
        foodItems: "foodItems data",
    },
]

export const Food_Items_Data = [
    {
        id: 1,
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
        title: 'تشيز برجر لحم',
        description: "description description description description description description ",
        sizes: [150, 200, 250],
        supplements: ['خس', 'صوص مايونيز'],
        basePrice: 120
    },
    {
        id: 1,
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
        title: 'تشيز برجر لحم',
        description: "description description description description description description ",
        sizes: [150, 200, 250],
        supplements: ['خس', 'صوص مايونيز'],
        basePrice: 150
    },
]

// ----------------------------- Order -----------------------------
export const Order_Data = [
    {
        id:1,
        status: 'done',
        foodItem: 'burger',
        size: 150,
        supplements: ['مايونيز'],
        price: 300
    },
    {
        id:2,
        status: 'done',
        foodItem: 'burger',
        size: 150,
        supplements: ['مايونيز'],
        price: 300
    }
]