-- Disable foreign key checks temporarily to allow out-of-order inserts if needed
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Insert an Admin User (Password is 'admin123' bcrypt hashed)
-- bcrypt hash for 'admin123' is '$2a$10$wY.uVzB1xXg1C.971YqA/OcI9sFMBm1zL32C3L4F5g672l2U92y5q'
INSERT IGNORE INTO users (id, name, email, password_hash, phone, role, created_at, updated_at) VALUES 
(1, 'Admin Demo', 'admin@foodieqr.com', '$2a$10$wY.uVzB1xXg1C.971YqA/OcI9sFMBm1zL32C3L4F5g672l2U92y5q', '1234567890', 'ADMIN', NOW(), NOW());

-- 2. Insert Food Categories (schema: id, name, description, display_order, is_active)
INSERT IGNORE INTO food_categories (id, name, description, display_order, is_active) VALUES 
(1, 'Starters', 'Appetizers and small bites to start your meal', 1, true),
(2, 'Main Course', 'Hearty main dishes', 2, true),
(3, 'Desserts', 'Sweet treats to finish your meal', 3, true),
(4, 'Beverages', 'Refreshing drinks', 4, true);

-- 3. Insert Food Items (schema: id, category_id, name, description, price, is_veg, is_available, imageurl, created_at, updated_at)
INSERT IGNORE INTO food_items (id, category_id, name, description, price, is_veg, is_available, imageurl, created_at, updated_at) VALUES 
-- Starters
(1, 1, 'Crispy Spring Rolls', 'Vegetable filled spring rolls perfectly fried with sweet chili sauce', 8.99, true, true, '', NOW(), NOW()),
(2, 1, 'Garlic Bread with Cheese', 'Toasted authentic sourdough with garlic butter and melted mozzarella', 6.99, true, true, '', NOW(), NOW()),
(3, 1, 'Buffalo Wings', 'Crispy chicken wings tossed in spicy buffalo sauce with blue cheese dip', 12.50, false, true, '', NOW(), NOW()),

-- Main Course
(4, 2, 'Classic Margherita Pizza', 'Fresh tomato sauce, buffalo mozzarella, and basil on thin crust', 16.00, true, true, '', NOW(), NOW()),
(5, 2, 'Grilled Salmon', 'Atlantic salmon with roasted seasonal vegetables and lemon butter sauce', 24.50, false, true, '', NOW(), NOW()),
(6, 2, 'Spicy Arrabbiata Pasta', 'Penne pasta in a spicy garlic and tomato sauce', 15.00, true, true, '', NOW(), NOW()),
(7, 2, 'Beef Burger', 'Premium beef patty with cheddar, lettuce, tomato and special sauce', 18.50, false, true, '', NOW(), NOW()),

-- Desserts
(8, 3, 'Tiramisu', 'Classic Italian coffee-flavored dessert', 9.50, true, true, '', NOW(), NOW()),
(9, 3, 'Chocolate Lava Cake', 'Warm chocolate cake with a gooey molten center', 11.00, true, true, '', NOW(), NOW()),
(10, 3, 'New York Cheesecake', 'Creamy baked cheesecake with berry compote', 10.00, true, true, '', NOW(), NOW()),

-- Beverages
(11, 4, 'Fresh Lemonade', 'House-made refreshing classic lemonade', 4.50, true, true, '', NOW(), NOW()),
(12, 4, 'Iced Latte', 'Cold brewed espresso with milk over ice', 5.50, true, true, '', NOW(), NOW()),
(13, 4, 'Mango Smoothie', 'Fresh mango blended with yogurt and honey', 6.50, true, true, '', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
