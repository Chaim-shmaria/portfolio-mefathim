-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(15),
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50),
  is_active BOOLEAN,
  username VARCHAR(50)
);

-- Products Table
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  inventory_id INT,
  size DECIMAL(10,2),
  n_unit INT,
  size_type VARCHAR(255),
  mkt INT,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- Tables Table
CREATE TABLE tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  n_seats INT,
  seated BOOLEAN,
  shape VARCHAR(50)
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
  min_order INT,
);

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

-- diners Orders Table
CREATE TABLE diners_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total DECIMAL(10,2),
  table_name TEXT,
  table_id INT,
  waiter_id INT,
  n_diners INT,
  paid BOOLEAN,
  timestamp TIMESTAMP
);

-- supplier orders
CREATE TABLE supplier_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INT,
  date_ordered TIMESTAMP,
  date_supplied TIMESTAMP,
  total_amount DECIMAL(10,2),
  notes VARCHAR(255),
);

CREATE TABLE supplierOrders (
  OrderNumber INT PRIMARY KEY,
  SupplierName VARCHAR(255),
  Date DATE,
  ItemCount INT,
  EstimatedAmount DECIMAL(10, 2),
  Status VARCHAR(50)
);
INSERT INTO supplierOrders (id, OrderNumber, SupplierName, Date, ItemCount, EstimatedAmount, isActive)
VALUES
  (1, 1, 'Supplier1', '2023-01-01', 5, 500.00, 'Active'),
  (2, 2, 'Supplier2', '2023-02-01', 8, 800.50, 'Pending'),
  (3, 3, 'Supplier3', '2023-03-01', 3, 300.75, 'Completed'),
  (4, 4, 'Supplier4', '2023-04-01', 6, 600.25, 'Active');


-- stock
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name:VARCHAR(255),
  category VARCHAR(255),
  quantity DECIMAL(10,2),
  size_type VARCHAR(255),
  order_threshold DECIMAL(10,2)
);

-- link dishes to product
CREATE TABLE dishes_products (
  dish_id INT,
  inventory_id INT,
  in_stock BOOLEAN,
  necessary BOOLEAN,
  PRIMARY KEY (dish_id, inventory_id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id),
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
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
  supplier_id INT,
  product_id INT,
  last_supplied TIMESTAMP,
  price DECIMAL(10,2),
  PRIMARY KEY (supplier_id, product_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);



-- link Supplier_order and product
CREATE TABLE supplier_order_product (
  order_id INT,
  product_id INT,
  amount INT,
  price DECIMAL(10,2),
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES supplier_orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Users Table
INSERT INTO users (first_name, last_name, phone, email, password, role, is_active, username) VALUES
  ('John', 'Doe', '123456789', 'john.doe@example.com', 'password123', 'admin', true, 'johndoe'),
  ('Jane', 'Smith', '987654321', 'jane.smith@example.com', 'pass456', 'customer', true, 'janesmith'),
  ('Bob', 'Johnson', '5551234567', 'bob.johnson@example.com', 'secret123', 'staff', true, 'bobjohn'),
  ('Alice', 'Williams', '9876543210', 'alice.williams@example.com', 'pass789', 'customer', true, 'alicew');

-- Products Table
INSERT INTO products (name, category, inventory_id, size, n_unit, size_type, mkt) VALUES
  ('Product1', 'Category1', 1, 25.5, 10, 'grams', 30),
  ('Product2', 'Category2', 2, 15.2, 5, 'ounces', 20),
  ('Product3', 'Category1', 3, 50.0, 2, 'liters', 40),
  ('Product4', 'Category3', 4, 100.0, 1, 'pieces', 50);

-- Tables Table
INSERT INTO tables (name, n_seats, seated, shape) VALUES
  ('Table1', 4, false, 'square'),
  ('Table2', 6, true, 'rectangle'),
  ('Table3', 2, false, 'round'),
  ('Table4', 8, false, 'oval');

-- Supplier Table
INSERT INTO suppliers (business_number, company_name, email, address, phone_number, balance, min_order) VALUES
  ('123456789', 'Supplier1', 'supplier1@example.com', '123 Main St', '9876543210', 5000.00, 100),
  ('987654321', 'Supplier2', 'supplier2@example.com', '456 Oak Ave', '5551234567', 3000.50, 150),
  ('456789012', 'Supplier3', 'supplier3@example.com', '789 Elm Blvd', '9998887777', 7500.25, 200),
  ('789012345', 'Supplier4', 'supplier4@example.com', '321 Pine Rd', '1112223333', 10000.75, 120);

-- Dishes Table
INSERT INTO dishes (name, category, price, picture, description, in_stock) VALUES
  ('Dish1', 'Appetizer', 12.99, 'dish1.jpg', 'A delicious appetizer', true),
  ('Dish2', 'Main Course', 24.95, 'dish2.jpg', 'A savory main course', true),
  ('Dish3', 'Dessert', 8.50, 'dish3.jpg', 'A sweet dessert', false),
  ('Dish4', 'Appetizer', 15.75, 'dish4.jpg', 'Another tasty appetizer', true);

-- diners Orders Table
INSERT INTO diners_orders (total, table_name, table_id, waiter_id, n_diners, paid, timestamp) VALUES
  (50.75, 'Table1', 1, 3, 4, false, CURRENT_TIMESTAMP),
  (75.20, 'Table2', 2, 2, 6, true, CURRENT_TIMESTAMP),
  (30.50, 'Table3', 3, 1, 2, false, CURRENT_TIMESTAMP),
  (45.90, 'Table4', 4, 4, 8, true, CURRENT_TIMESTAMP);

-- supplier orders
INSERT INTO supplier_orders (supplier_id, date_ordered, date_supplied, total_amount, notes) VALUES
  (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1500.50, 'Urgent order for restocking'),
  (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 800.25, 'Regular monthly order'),
  (3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2000.00, 'Large order for special event'),
  (4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1200.75, 'Standard restocking order');

-- stock
INSERT INTO inventory (name, category, quantity, size_type, order_threshold) VALUES
  ('Inventory1', 'Category1', 100.5, 'grams', 50.0),
  ('Inventory2', 'Category2', 75.2, 'ounces', 30.0),
  ('Inventory3', 'Category3', 200.0, 'liters', 80.0),
  ('Inventory4', 'Category1', 50.0, 'grams', 20.0);

-- link dishes to product
INSERT INTO dishes_products (dish_id, inventory_id, in_stock, necessary) VALUES
  (1, 1, true, true),
  (2, 2, true, true),
  (3, 3, false, false),
  (4, 4, true, true);

-- link order to dishes
INSERT INTO diner_order_dishes (order_id, dish_id, dish_name, notes, amount, price) VALUES
  (1, 1, 'Dish1', 'Extra sauce', 2, 25.98),
  (1, 2, 'Dish2', 'No onions', 1, 24.95),
  (2, 3, 'Dish3', 'Add ice cream', 3, 25.50),
  (3, 4, 'Dish4', 'Spicy variant', 2, 31.50);

-- link supplier and products
INSERT INTO supplier_products (supplier_id, product_id, last_supplied, price) VALUES
  (1, 1, CURRENT_TIMESTAMP, 15.25),
  (2, 2, CURRENT_TIMESTAMP, 10.50),
  (3, 3, CURRENT_TIMESTAMP, 18.75),
  (4, 4, CURRENT_TIMESTAMP, 22.00);

-- link Supplier_order and product
INSERT INTO supplier_order_product (order_id, product_id, amount, price) VALUES
  (1, 1, 20, 15.25),
  (2, 2, 15, 10.50),
  (3, 3, 10, 18.75),
  (4, 4, 25, 22.00);




ALTER TABLE supplierOrders
RENAME COLUMN Status TO isActive;


ALTER TABLE supplierOrders
ADD COLUMN id INTEGER;
UPDATE supplierOrders
SET isActive = "false";