

// ----------------------------- Users -----------------------------
export const Admins_Columns = ['image', 'name', 'email', 'created_at']
export const Users_Columns = ['image', 'name', 'email', 'created_at']
export const Delivery_Men_Columns = ['fullName', 'email', 'phone']


// ----------------------------- Advertisement -----------------------------
export const Offers_Columns = ['foodItem', 'discount', 'description', 'oldPrice', 'newPrice']
export const Banners_Columns = ['image','title', 'description', 'price']


// ----------------------------- Menu -----------------------------
// export const Categories_Columns = ['image','title', 'foodItems','banner']
export const Categories_Columns = ['image','name', 'created_at','updated_at']
export const Food_Items_Columns = ['image','title', 'description', 'basePrice', 'sizes', 'supplements']


// ----------------------------- Order -----------------------------
export const Order_Columns = ['status', 'foodItem', 'size', 'supplements','price']

// ----------------------------- Order -----------------------------
export const Invoice_Columns = ['foodOrder', 'price']