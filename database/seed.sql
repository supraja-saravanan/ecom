-- ======================================
-- USERS
-- ======================================

INSERT INTO users
(full_name,email,password,role)
VALUES

('Admin User',
'admin@ecommerce.com',
'$2b$10$abcdefghijklmnopqrstuv',
'admin'),

('John Doe',
'john@example.com',
'$2b$10$abcdefghijklmnopqrstuv',
'customer');



-- ======================================
-- CATEGORIES
-- ======================================

INSERT INTO categories
(name,description)

VALUES

('Electronics','Electronic Devices'),

('Mobiles','Smartphones'),

('Fashion','Clothing'),

('Books','Books Collection'),

('Home','Home Essentials');



-- ======================================
-- PRODUCTS
-- ======================================

INSERT INTO products
(category_id,name,description,price,stock,image_url)

VALUES

(1,
'MacBook Air M4',
'Apple Laptop',
124999,
15,
'https://dummyimage.com/macbook'),

(2,
'iPhone 17',
'Latest Apple Phone',
99999,
30,
'https://dummyimage.com/iphone'),

(3,
'Nike Running Shoes',
'Sports Shoes',
6999,
100,
'https://dummyimage.com/shoes'),

(4,
'Atomic Habits',
'Best Selling Book',
799,
75,
'https://dummyimage.com/book'),

(5,
'Office Chair',
'Ergonomic Chair',
9999,
25,
'https://dummyimage.com/chair');



-- ======================================
-- ORDERS
-- ======================================

INSERT INTO orders

(user_id,
total_amount,
order_status,
payment_status,
shipping_address)

VALUES

(2,
107798,
'Delivered',
'Paid',
'Bangalore, India');



-- ======================================
-- ORDER ITEMS
-- ======================================

INSERT INTO order_items

(order_id,
product_id,
quantity,
price)

VALUES

(1,
2,
1,
99999),

(1,
4,
1,
799),

(1,
5,
1,
7000);