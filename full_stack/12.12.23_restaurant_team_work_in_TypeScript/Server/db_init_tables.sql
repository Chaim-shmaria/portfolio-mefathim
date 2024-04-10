-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(15),
  email VARCHAR(255),
  password VARCHAR(255),
  role_id INTEGER REFERENCES roles(role_id),
  image VARCHAR(255),
  is_active BOOLEAN,
  username VARCHAR(50)
);
CREATE INDEX idx_name
ON users (first_name
);

CREATE INDEX idx_active
ON users (is_active
);

CREATE TABLE roles (
  role_id INTEGER PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE
);
-- Products Table
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  inventory_id INT,
  size DECIMAL(10,2),
  n_unit INT,
  size_type_id INTEGER REFERENCES kilo_liter(size_type_id),
  mkt INT,
  is_active BOOLEAN,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

CREATE TABLE kilo_liter (
  size_type_id INTEGER PRIMARY KEY,
  size_type_name VARCHAR(50) UNIQUE
  );

-- Tables Table
CREATE TABLE tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  n_seats INT,
  shape VARCHAR(50),
  type VARCHAR(50),
  connected_to INTEGER,
  x0 INT,
  x1 INT,
  y0 INT,
  y1 INT
);

-- Supplier Table
CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_number VARCHAR(15),
  company_name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(15),
  balance DECIMAL(10,2),
  min_order INT
);

-- Dishes Table
CREATE TABLE dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(10,2),
  picture VARCHAR(255),
  description TEXT,
  in_stock INT
);

CREATE INDEX idx_stock
ON dishes (in_stock
);

-- diners Orders Table
CREATE TABLE diners_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total DECIMAL(10,2),
  table_name TEXT,
  table_id INT,
  waiter_id INT,
  waiter_name TEXT,
  n_diners INT,
  paid BOOLEAN,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_paid
  ON diners_orders (paid
);

-- supplier orders
CREATE TABLE supplier_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INT,
  date_ordered TIMESTAMP,
  date_supplied TIMESTAMP,
  total_amount DECIMAL(10,2),
  notes VARCHAR(255)
);

-- stock
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  quantity DECIMAL(10,2),
  size_type_id INTEGER,
  order_threshold DECIMAL(10,2)
);

-- link dishes to product
CREATE TABLE dishes_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dish_id INT,
  inventory_id INT,
  quantity INT,
  in_stock BOOLEAN,
  necessary BOOLEAN,
  UNIQUE (dish_id, inventory_id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id),
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);


CREATE INDEX idx_necessary
ON dishes_products (necessary
);


-- link order to dishes
CREATE TABLE diner_order_dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INT,
  dish_id INT,
  dish_name VARCHAR(255),
  notes VARCHAR(255),
  amount INT,
  price DECIMAL(10,2),
  FOREIGN KEY (dish_name) REFERENCES dishes(name),
  FOREIGN KEY (order_id) REFERENCES diners_orders(id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- link supplier and products
CREATE TABLE supplier_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INT,
  product_id INT,
  last_supplied TIMESTAMP,
  category  VARCHAR(255),
  price DECIMAL(10,2),
  UNIQUE (supplier_id, product_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);



-- link Supplier_order and product
CREATE TABLE supplier_order_product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INT,
  product_id INT,
  amount INT,
  price DECIMAL(10,2),
  UNIQUE (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES supplier_orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert data into roles table
INSERT INTO roles (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'Manager'),
(3, 'Waiter'),
(4, 'Chef'),
(5, 'Cleaner');

-- Insert data into users table
INSERT INTO users (id, first_name, last_name, phone, email, password, role_id, is_active, username) VALUES
(1, 'John', 'Doe', '+123456789', 'john.doe@email.com', 'password123', 1, true, 'johndoe'),
(2, 'Jane', 'Smith', '+987654321', 'jane.smith@email.com', 'securepass', 3, true, 'janesmith'),
(3, 'Bob', 'Johnson', '+111222333', 'bob.johnson@email.com', 'pass123', 2, false, 'bobjohn'),
(4, 'Alice', 'Williams', '+444555666', 'alice.williams@email.com', 'mysecretpass', 4, true, 'alicewill'),
(5, 'Eva', 'Miller', '+777888999', 'eva.miller@email.com', 'evapassword', 3, true, 'evamill');


INSERT INTO kilo_liter (size_type_id, size_type_name) VALUES
(1, 'kilo'),
(2, 'liter');


-- Products Table
INSERT INTO products (name, category, inventory_id, size, n_unit, size_type_id, mkt) VALUES
  ('חזה עוף', 'Category1', 1, 25.5, 10, 'grams', 30),
  ('פירורי לחם - אחווה', 'Category2', 2, 15.2, 5, 'grams', 20),
  ('פירורי לחם - רעות', 'Category1', 2, 50.0, 2, 'grams', 40),
  ('ביצה', 'Category1', 3, 50.0, 2, 'liters', 40),
  ('אסאדו', 'Category1', 4, 50.0, 2, 'grams', 40),
  ('תפוחי אדמה', 'Category1', 5, 50.0, 2, 'grams', 40),
  (' רוזמרין', 'Category1', 6, 50.0, 2, 'grams', 40),
  ('Product4', 'Category3', 7, 100.0, 1, 'pieces', 50);

-- Tables Table
INSERT INTO tables (id, name, n_seats, shape, type, connected_to, x0, x1, y0, y1) VALUES
-- RectangleTable
(1, '1', 4, 'rectangle', 'table', NULL, '4', '10', '3', '9'),
(2, '2', 4, 'rectangle', 'table', NULL, '12', '18', '3', '9'),
(3, '3', 4, 'rectangle', 'table', NULL, '20', '26', '3', '9'),
(4, '4', 4, 'rectangle', 'table', NULL, '28', '34', '3', '9'),
(5, '5', 4, 'rectangle', 'table', NULL, '4', '10', '19', '25'),
(6, '6', 4, 'rectangle', 'table', NULL, '12', '18', '19', '25'),
(7, '7', 4, 'rectangle', 'table', NULL, '20', '26', '19', '25'),
(8, '8', 4, 'rectangle', 'table', 5, '28', '34', '19', '25'),
(9, '9', 4, 'rectangle', 'table', NULL, '38', '44', '26', '32'),
(10, '10', 4, 'rectangle', 'table', NULL, '46', '52', '26', '32'),
(11, '11', 4, 'rectangle', 'table', NULL, '36', '42', '10', '16'),

-- CircleTable
(12, '12', 4, 'circle', 'table', NULL, '4', '10', '11', '17'),
(13, '13', 4, 'circle', 'table', NULL, '12', '18', '11', '17'),
(14, '14', 4, 'circle', 'table', NULL, '20', '26', '11', '17'),
(15, '15', 4, 'circle', 'table', NULL, '28', '34', '11', '17'),
(16, '16', 4, 'circle', 'table', NULL, '4', '10', '27', '33'),
(17, '17', 4, 'circle', 'table', NULL, '12', '18', '27', '33'),
(18, '18', 4, 'circle', 'table', NULL, '20', '26', '27', '33'),
(19, '19', 4, 'circle', 'table', NULL, '28', '34', '27', '33'),
(20, '20', 4, 'circle', 'table', NULL, '38', '44', '33', '39'),
(21, '21', 4, 'circle', 'table', NULL, '46', '52', '33', '39'),
(22, '22', 4, 'circle', 'table', NULL, '36', '42', '18', '24'),
(23, '23', 4, 'circle', 'table', NULL, '48', '54', '2', '8'),
(24, '24', 4, 'circle', 'table', NULL, '40', '46', '2', '8'),
INSERT INTO tables (name, n_seats, seated, shape, type, x0, x1, y0, y1) VALUES
    -- RectangleTable
    ('1', 4, 0, 'rectangle', 'table', '4', '10', '3', '9'),
    ('2', 4, 1, 'rectangle', 'table', '12', '18', '3', '9'),
    ('3', 4, 1, 'rectangle', 'table', '20', '26', '3', '9'),
    ('4', 4, 1, 'rectangle', 'table', '28', '34', '3', '9'),
    ('5', 4, 1, 'rectangle', 'table', '4', '10', '19', '25'),
    ('6', 4, 1, 'rectangle', 'table', '12', '18', '19', '25'),
    ('7', 4, 1, 'rectangle', 'table', '20', '26', '19', '25'),
    ('8', 4, 0, 'rectangle', 'table', '28', '34', '19', '25'),
    ('9', 4, 1, 'rectangle', 'table', '38', '44', '26', '32'),
    ('10', 4, 1, 'rectangle', 'table', '46', '52', '26', '32'),
    ('11', 4, 1, 'rectangle', 'table', '36', '42', '10', '16'),
   
    -- CircleTable
    ('12', 4, True, 'circle', 'table', '4', '10', '11', '17'),
    ('13', 4, True, 'circle', 'table', '12', '18', '11', '17'),
    ('14', 4, True, 'circle', 'table', '20', '26', '11', '17'),
    ('15', 4, False, 'circle', 'table', '28', '34', '11', '17'),
    ('16', 4, True, 'circle', 'table', '4', '10', '27', '33'),
    ('17', 4, True, 'circle', 'table', '12', '18', '27', '33'),
    ('18', 4, True, 'circle', 'table', '20', '26', '27', '33'),
    ('19', 4, True, 'circle', 'table', '28', '34', '27', '33'),
    ('20', 4, True, 'circle', 'table', '38', '44', '33', '39'),
    ('21', 4, False, 'circle', 'table', '46', '52', '33', '39'),
    ('22', 4, False, 'circle', 'table', '36', '42', '18', '24'),
    ('23', 4, True, 'circle', 'table', '48', '54', '2', '8'),
    ('24', 4, True, 'circle', 'table', '40', '46', '2', '8'),

-- objects
(25, 'bar', 4, '', 'object', NULL, '44', '62', '12', '26'),
(26, 'cabin', 4,'', 'object', NULL, '1', '30', '36', '41');


-- Suppliers Table
CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_number VARCHAR(15),
  supplier_name VARCHAR(255),
  contact_name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(15),
  min_order INT,
  is_active BOOLEAN
);

-- INSERT INTO suppliers (business_number, supplier_name, contact_name, email, address, phone_number, min_order, is_active) VALUES
--   ('123456789', 'Supplier1','avi', 'supplier1@example.com', '123 Main St', '9876543210', 100, 1),
--   ('987654321', 'Supplier2','yair', 'supplier2@example.com', '456 Oak Ave', '5551234567', 150, 1),
--   ('456789012', 'Supplier3','israel', 'supplier3@example.com', '789 Elm Blvd', '9998887777', 200, 1),
--   ('789012345', 'Supplier4','kobi', 'supplier4@example.com', '321 Pine Rd', '1112223333', 120, 1);

-- Supplier Table
INSERT INTO suppliers (id,business_number, company_name, email, address, phone_number, balance, min_order) VALUES
  (1,'123456789', 'Supplier1', 'supplier1@example.com', '123 Main St', '9876543210', 5000.00, 100),
  (2,'987654321', 'Supplier2', 'supplier2@example.com', '456 Oak Ave', '5551234567', 3000.50, 150),
  (3,'456789012', 'Supplier3', 'supplier3@example.com', '789 Elm Blvd', '9998887777', 7500.25, 200),
  (4,'789012345', 'Supplier4', 'supplier4@example.com', '321 Pine Rd', '1112223333', 10000.75, 120);

-- Dishes Table
INSERT INTO dishes (name, category, price, picture, description, in_stock) VALUES
  ('חזה עוף', 'מנה עיקרית', 12.99, 'dish1.jpg', 'A delicious appetizer', 1),
  ('אסאדו ותפ"א', 'מנה עיקרית', 24.95, 'dish2.jpg', 'A savory main course', 1),
  ('Dessert1', 'מנת פתיחה', 8.50, 'dish3.jpg', 'A sweet dessert', 1),
  ('Dessert2', 'מנת פתיחה', 15.75, 'dish4.jpg', 'Another tasty appetizer', 1);

-- diners Orders Table
INSERT INTO diners_orders (id,total, table_name, table_id, waiter_id,waiter_name, n_diners, paid, timestamp) VALUES
  (1,50.75, 'Table1', 1, 3,'john', 4, false, CURRENT_TIMESTAMP),
  (2,75.20, 'Table2', 2, 2,'bob' ,6, true, CURRENT_TIMESTAMP),
  (3,30.50, 'Table3', 3, 1,'michael', 2, false, CURRENT_TIMESTAMP),
  (4,45.90, 'Table4', 4, 4,'ketty' ,8, true, CURRENT_TIMESTAMP),
  (5,0, 'Table5', 5, 7,'Itzhak' ,10, false, CURRENT_TIMESTAMP);

-- supplier orders
INSERT INTO supplier_orders (id,supplier_id, date_ordered, date_supplied, total_amount, notes) VALUES
  (1,1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1500.50, 'Urgent order for restocking'),
  (2,2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 800.25, 'Regular monthly order'),
  (3,3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000.00, 'Large order for special event'),
  (4,4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1200.75, 'Standard restocking order');

-- stock
INSERT INTO inventory (name, category, quantity, size_type_id, order_threshold) VALUES
  ('חזה עוף', 'Category1', 1000.5, 'grams', 50.0),
  ('פירורי לחם', 'Category2', 75.2, 'ounces', 30.0),
  (' ביצה', 'Category1', 20, 'grams', 50.0),
  (' אסאדו', 'Category1', 2000, 'grams', 50.0),
  (' תפוחי אדמה', 'Category1', 3000, 'grams', 50.0),
  (' רוזמרין', 'Category1', 70, 'grams', 50.0),
  ('Inventory3', 'Category3', 200.0, 'liters', 80.0),
  ('Inventory4', 'Category1', 50.0, 'grams', 20.0);

-- link dishes to product
INSERT INTO dishes_products (dish_id, inventory_id, quantity, in_stock, necessary) VALUES
  (1, 1, 100, true, true),
  (1, 2, 25, true, true),
  (1, 3, 10, true, true),
  (2, 4, 100, true, true),
  (2, 5, 300, true, true),
  (2, 6, 10, true, false);

-- link order to dishes
INSERT INTO diner_order_dishes (id,order_id, dish_id, dish_name, notes, amount, price) VALUES
  (1,1, 1, 'Dish1', 'Extra sauce', 2, 25.98),
  (2,1, 2, 'Dish2', 'No onions', 1, 24.95),
  (3,2, 3, 'Dish3', 'Add ice cream', 3, 25.50),
  (4,3, 4, 'Dish4', 'Spicy variant', 2, 31.50);

-- link supplier and products
INSERT INTO supplier_products (id,supplier_id, product_id, last_supplied, price) VALUES
  (1,1, 1, CURRENT_TIMESTAMP, 15.25),
  (2,2, 2, CURRENT_TIMESTAMP, 10.50),
  (3,3, 3, CURRENT_TIMESTAMP, 18.75),
  (4,4, 4, CURRENT_TIMESTAMP, 22.00);

-- link Supplier_order and product
INSERT INTO supplier_order_product (id,order_id, product_id, amount, price) VALUES
  (1,1, 1, 20, 15.25),
  (2,2, 2, 15, 10.50),
  (3,3, 3, 10, 18.75),
  (4,4, 4, 25, 22.00);

-- Dishes Table
CREATE TABLE dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(10,2),
  picture VARCHAR(255),
  description TEXT,
  in_stock BOOLEAN
);

-- INSERT INTO dishes (name, category, price, picture, description, in_stock) VALUES
--   ('Dish1', 'Appetizer', 12.99, 'dish1.jpg', 'A delicious appetizer', true),
--   ('Dish2', 'Main Course', 24.95, 'dish2.jpg', 'A savory main course', true),
--   ('Dish3', 'Dessert', 8.50, 'dish3.jpg', 'A sweet dessert', false),
--   ('Dish4', 'Appetizer', 15.75, 'dish4.jpg', 'Another tasty appetizer', true);


-- diners Orders Table
CREATE TABLE diners_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total DECIMAL(10,2),
  table_name TEXT,
  table_id INT,
  waiter_name TEXT,
  waiter_id INT,
  n_diners INT,
  paid BOOLEAN,
  timestamp TIMESTAMP
);

-- INSERT INTO diners_orders (total, table_name, table_id, waiter_name, waiter_id, n_diners, paid, timestamp) VALUES
--   (50.75, 'Table1', 1, 'waiter1', 3, 4, false, CURRENT_TIMESTAMP),
--   (75.20, 'Table2', 2, 'waiter2', 2, 6, true, CURRENT_TIMESTAMP),
--   (30.50, 'Table3', 3, 'waiter3', 1, 2, false, CURRENT_TIMESTAMP),
--   (45.90, 'Table4', 4, 'waiter4', 4, 8, true, CURRENT_TIMESTAMP);
  

-- supplier orders
CREATE TABLE supplier_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INT,
  date_ordered TIMESTAMP,
  date_supplied TIMESTAMP,
  total_amount DECIMAL(10,2),
  item_count INT,
  is_active BOOLEAN,
  status 
  VARCHAR(255)
);

-- INSERT INTO supplier_orders (supplier_id, date_ordered, date_supplied, total_amount, notes) VALUES
--   (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1500.50, 'Urgent order for restocking'),
--   (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 800.25, 'Regular monthly order'),
--   (3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000.00, 'Large order for special event'),
--   (4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1200.75, 'Standard restocking order');


-- stock
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  quantity INT,
  size_type VARCHAR(255),
  order_threshold INT,
  is_active BOOLEAN
);

-- INSERT INTO inventory (name, category, quantity, size_type, order_threshold, is_active) VALUES
--   ('Inventory1', 'Category1', 100.5, 'grams', 50.0, 1),
--   ('Inventory2', 'Category2', 75.2, 'ounces', 30.0, 1),
--   ('Inventory3', 'Category3', 200.0, 'liters', 80.0, 1),
--   ('Inventory4', 'Category1', 50.0, 'grams', 20.0, 1);


--inventory category
CREATE TABLE inventory_category(
category VARCHAR(255)
);

INSERT INTO inventory_category(category) VALUES
  ('חמאה'),                
  ('יוגורט'),               
  ('גבינה'),               
  ('חלב'),                  
  ('אורז'),              
  ('פסטה'),               
  ('קינואה'),          
  ('בשר'),                
  ('עוף'),               
  ('דג'),                 
  ('דגים'),              
  ('פירות'),                
  ('ירקות'),                
  ('קינוחים קפואים'),      
  ('משקאות חמים'),         
  ('משקאות קרים'),       
  ('משקאות אלכוהוליים'),   
  ('מיץ'),                 
  ('רטבים שונים'),       
  ('תבלינים וצמחי תיבול');


--size types
CREATE TABLE size_types(
type VARCHAR(225)
);

INSERT INTO size_types (type) VALUES
  ('ליטר'),
  ('קילו');



-- link dishes to product
CREATE TABLE dishes_products (
  dish_id INT,
  inventory_id INT,
  in_stock BOOLEAN,
  quantity DECIMAL(10,2),
  necessary BOOLEAN,
  PRIMARY KEY (dish_id, inventory_id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id),
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- INSERT INTO dishes_products (dish_id, inventory_id, in_stock, quantity, necessary) VALUES
--   (1, 1, true, 100.5, true),
--   (2, 2, true, 75.2, true),
--   (3, 3, false, 200.0, false),
--   (4, 4, true, 50.5, true);


-- link order to dishes
CREATE TABLE diner_order_dishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INT,
  dish_id INT,
  dish_name VARCHAR(255),
  notes VARCHAR(255),
  amount INT,
  price DECIMAL(10,2),
  FOREIGN KEY (dish_name) REFERENCES dishes(name),
  FOREIGN KEY (order_id) REFERENCES diners_orders(id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- link order to dishes
-- INSERT INTO diner_order_dishes (order_id, dish_id, dish_name, notes, amount, price) VALUES
--   (1, 1, 'Dish1', 'Extra sauce', 2, 25.98),
--   (1, 2, 'Dish2', 'No onions', 1, 24.95),
--   (2, 3, 'Dish3', 'Add ice cream', 3, 25.50),
--   (3, 4, 'Dish4', 'Spicy variant', 2, 31.50);


-- link supplier and products
CREATE TABLE supplier_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INT,
  product_id INT,
  last_supplied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category  VARCHAR(255),
  price DECIMAL(10,2),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- INSERT INTO supplier_products (supplier_id, product_id, last_supplied, price) VALUES
--   (1, 1, CURRENT_TIMESTAMP, 15.25),
--   (2, 2, CURRENT_TIMESTAMP, 10.50),
--   (3, 3, CURRENT_TIMESTAMP, 18.75),
--   (4, 4, CURRENT_TIMESTAMP, 22.00);



-- link Supplier_order and product
CREATE TABLE supplier_order_product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INT ,
  product_id INT,
  amount INT,
  sum INT,
  supplier_id INT
);
DROP TABLE supplier_order_product;
-- INSERT INTO supplier_order_product (order_id, product_id, amount, price) VALUES
--   (1, 1, 20, 15.25),
--   (2, 2, 15, 10.50),
--   (3, 3, 10, 18.75),
--   (4, 4, 25, 22.00);

-- Change the name of the column from "item_count" to "item_quantity"




INSERT INTO products (name, category, inventory_id, size, n_unit, size_type, mkt, is_active)
VALUES
  ('חמאה גדולה', 'חמאה', 1, 5.25, 10, 'יחידה', 30, true),
  ('גבינת פטיט בכחול', 'מוצרי חלב', 2, 3.50, 15, 'יחידה', 25, true),
  ('יוגורט נטול לקטוז', 'יוגורט', 3, 8.75, 8, 'יחידה', 40, true),
  ('פטה בזיליקום', 'גבינה', 1, 2.00, 20, 'יחידה', 15, true),
  ('חלב טרי', 'חלב', 2, 6.50, 12, 'יחידה', 35, true),
  ('אורז בסיבים', 'אורז', 3, 4.75, 18, 'יחידה', 22, true),
  ('פסטה פנה בקרם קפוצ', 'פסטה', 1, 3.00, 25, 'יחידה', 28, true),
  ('קינואה טחונה', 'קינואה', 2, 7.25, 14, 'יחידה', 38, true),
  ('בשר טחון מקרב', 'בשר', 3, 5.50, 16, 'יחידה', 20, true),
  ('עוף פרוס קפוא', 'עוף', 1, 4.25, 22, 'יחידה', 32, true);

  -- Insert data into suppliers table with new data structure
INSERT INTO suppliers (business_number, supplier_name, contact_name, email, address, phone_number, min_order, is_active)
VALUES
  ('111111111', 'אוסם', 'איש קשר חמאה', 'butter_supplier@example.com', 'חמאה 1', '111-111111', 30, true),
  ('222222222', 'תנובה', 'איש קשר גבינה', 'cheese_supplier@example.com', 'גבינה 2', '222-222222', 25, true),
  ('333333333', 'שטראוס', 'איש קשר יוגורט', 'yogurt_supplier@example.com', 'יוגורט 3', '333-333333', 35, true),
  ('444444444', 'רמי לוי', 'איש קשר פסטה', 'pasta_supplier@example.com', 'פסטה 4', '444-444444', 40, true),
  ('555555555', 'דיפלומט', 'איש קשר קינואה', 'quinoa_supplier@example.com', 'קינואה 5', '555-555555', 30, true);

-- Insert data into supplier_products table with new data structure
INSERT INTO supplier_products (supplier_id, product_id, last_supplied, category, price)
VALUES
  (1, 1, CURRENT_TIMESTAMP, 'חמאה', 25.00),
  (2, 1, CURRENT_TIMESTAMP, 'מוצרי חלב', 28.00),
  (1, 2, CURRENT_TIMESTAMP, 'יוגורט', 20.00),
  (2, 2, CURRENT_TIMESTAMP, 'גבינה', 22.00),
  (3, 3, CURRENT_TIMESTAMP, 'חלב', 35.00),
  (4, 3, CURRENT_TIMESTAMP, 'אורז', 38.00),
  (3, 4, CURRENT_TIMESTAMP, 'פסטה', 15.00),
  (4, 4, CURRENT_TIMESTAMP, 'קינואה', 18.00),
  (5, 5, CURRENT_TIMESTAMP, 'בשר', 30.00),
  (1, 5, CURRENT_TIMESTAMP, 'עוף', 32.00),
  (5, 6, CURRENT_TIMESTAMP, 'דג', 22.00),
  (2, 6, CURRENT_TIMESTAMP, 'דגים', 25.00);


ALTER TABLE supplier_orders
ADD COLUMN supplier_name TEXT;

ALTER TABLE supplier_order_product
ADD COLUMN id INTEGER;


  DELETE FROM supplier_orders
