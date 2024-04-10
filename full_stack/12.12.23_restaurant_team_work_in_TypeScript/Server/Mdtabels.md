# users type and table

| id  | first_name | last_name | phone      | email                   | password      | role      | is_active | user_name |
| --- | ---------- | --------- | ---------- | ----------------------- | ------------- | --------- | --------- | --------- | ------------- |
| 1   | Alice      | Johnson   | 1234567890 | <alice.johnson@email.com> | Pa$$w0rd123   | Admin     | true      | ali       | alice_j       |
| 2   | Bob        | Smith     | 9876543210 | <bob.smith@email.com>     | SecurePass456 | Moderator | true      | bob       | bob_s         |
| 3   | Charlie    | Brown     | 5556667777 | <charlie.brown@email.com> | StrongPwd789  | User      | false     | char      | charlie_brown |

```typescript
interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  id: number;
}
```

# product table and interface

| id  | name | category | invetory_id | package_size | n_units | size_type | MKT | nim_inventory |
| --- | ---- | -------- | ----------- | ------------ | ------- | --------- | --- | ------------- |

| 001 | Awesome Widget | Electronics |005 | 6 | 6 | liter | 900 |1|

```typescript
interface Product {
  name: string;
  id: string;
  category: string; // "toalet" "meat"
  size: number; // optional
  n_unit: number; // optional ""
  size_type: string; //optional ""
  mkt: number;
}
```

# tables table and interface

| id  | name | n_seats | seated | shape     |type|x0...y1|
| --- | ---- | ------- | ------ | --------- |----|-----|
| 101 | 1    | 4       | true   | Rectangle |table|5|
| 102 | bar    | 4       | true   | Rectangle |object|5|


```typescript
interface Table {
  id: string;
  number: string;
  n_seats: number;
  seated: bool;
  shape: string;
  type: string;
  x0: number;
  x1: number;
  yo: number;
  y1: number;
}
```

# supplier table and interface

| id  | business_number | company_name     | email                | address         | phone_n | balance | min_order |
| --- | --------------- | ---------------- | -------------------- | --------------- | ------- | ------- | --------- |
| 1   | 343434          | Tech Innovations | tech@innovations.com | 123 Tech Street |

```typescript
interface supplier {
    id : string;
    business_number: string; // ח.פ
    company_name: string;
    email: string (valid);
    address: string;
    phone_number: string;
    balance: number;
    min_order : number;

}

```

# dishes table and interface

| id  | name                | category    | price | picture               | description                                       |
| --- | ------------------- | ----------- | ----- | --------------------- | ------------------------------------------------- |
| 101 | Spaghetti Bolognese | Main Course | 12.99 | /images/spaghetti.jpg | Classic Italian dish with rich meaty tomato sauce |

```typescript
interface Dishes {
  id: number;
  name: string;
  category: string;
  price: number;
  picture: string;
  description: string;
}
```

# diners_order table and interface

| id  | total | table_name | table_id | waiter_id | n_diners | paid | timestamp            |
| --- | ----- | ---------- | -------- | --------- | -------- | ---- | -------------------- |
| 201 | 29.97 | 5          | 201      | 4         | 10       | true | 26 Mar 2018, 10:30am |

```typescript
interface diners_order {
  id: number;
  total: number;
  table_name: string;
  n_diners: number;
  table_id: number;
  waiter_id: number;
  paid: bool;
  timeStamp: string;
}
```

# supplier_order table and interface

| id  | supplier_id | date_ordered | date_supplied | total_amount | notes                       |
| --- | ----------- | ------------ | ------------- | ------------ | --------------------------- | ----- |
| 201 | 1           | 2023-01-15   | 2023-01-15    | $500         | Delivered on time           | true  |
| 202 | 2           | 2023-02-20   | 2023-03-10    | $750         | Some items out of stock     | false |
| 203 | 3           | 2023-03-10   | 2023-03-11    | $600         | Special packaging requested | false |
| 204 | 1           | 2023-01-25   | 2023-03-20    | $300         | Quick delivery              | false |
| 205 | 2           | 2023-02-28   | 2023-03-23    | $400         | Extra discounts applied     | false |

```typescript
interface supplier_order {
  id: number;
  supplier_id: number;
  date_ordered: string;

  date_supplied: string;
  total_amount: string;
  notes: string;
}
```

# inventory table and interface

| id  | name          | category   | quantity | order_threshold |
| --- | ------------- | ---------- | -------- | --------------- |
| 001 | Steak         | Meat       | 50 kg    | number          |
| 002 | Pasta         | Grains     | 100 kg   | Yes             |
| 003 | Tomatoes      | Vegetables | 200 kg   | Yes             |
| 004 | Chicken Wings | Poultry    | 30 kg    | Yes             |
| 005 | Olive Oil     | Condiments | 10 L     | Yes             |
| 006 | Flour         | Grains     | 50 kg    | Yes             |
| 007 | Salmon        | Seafood    | 20 kg    | Yes             |
| 008 | Lettuce       | Vegetables | 30 kg    | Yes             |
| 009 | Cheese        | Dairy      | 15 kg    | Yes             |
| 010 | Coffee Beans  | Beverages  | 5 kg     | Yes             |

```typescript
interface inventory {
  id: number;
  name: string;
  category: string;
  quantity: number;
  size_type: string;
  order_threshold: number;
}
```

# linked tables

## linked table between dishes and its products

| dish_id | inventory_id | in_stock | necessary |
| ------- | ------------ | -------- | --------- |
| 101     | 1            | true     | true      |
| 101     | 2            | true     | false     |
| 101     | 3            | true     |
| 102     | 4            | true     |
| 103     | 5            | false    |
| 103     | 6            | true     |
| 104     | 2            | true     |
| 104     | 3            | false    |
| 105     | 1            | true     |
| 105     | 5            | true     |

## linked table between order and its dishes

| id  | order_id | dish_id | dish_name | notes | price | amount |
| --- | -------- | ------- | --------- | ----- | ----- | ------ |
| 201 | 101      | pizza   |           |       |
| 201 | 102      |         |           |       |
| 202 | 103      |         |           |       |
| 202 | 104      |         |           |       |
| 203 | 105      |         |           |       |

## linked table between supplier and products

| supplier_id | product_id | last_supplied | category | price |
| ----------- | ---------- | ------------- | -------- | ----- |
| 1           | 1          | 2023-01-15    |          | 100   |
| 2           | 2          | 2023-02-20    |          | 50    |
| 3           | 3          | 2023-03-10    |          | 75    |
| 1           | 4          | 2023-01-15    |          | 120   |
| 2           | 5          | 2023-02-20    |          | 60    |
| 3           | 6          | 2023-03-10    |          | 90    |

# linked table between SupplierOrder and product

| order_id | product_id | amount | price |
| -------- | ---------- | ------ | ----- |
| 211      | 34         | 5      |
| 211      | 13         | 3      |
| 543      | 34         | 2      |
