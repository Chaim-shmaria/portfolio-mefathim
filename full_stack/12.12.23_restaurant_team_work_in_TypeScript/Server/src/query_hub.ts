
type query = string

// update dishes in_stock by its dishes_products table 
// Checks if necessary and the result of the calculation is greater than 0
// If he meets the conditions - then he will do the calculation and save the result.
// If it is not necessary - give a high result so that it does not come out at the minimum
export const updateDishesInStock: query =  `WITH DishPortions AS (
    SELECT
      dp.dish_id,
      MIN(CASE 
            WHEN dp.necessary = 1 AND (i.quantity / dp.quantity) < 1 THEN 0 
            WHEN dp.necessary = 1 THEN FLOOR(i.quantity / dp.quantity) 
            ELSE 999999 
        END) AS available_portions
    FROM dishes_inventory dp
    JOIN inventory i ON dp.inventory_id = i.id
    GROUP BY dp.dish_id
  )
  UPDATE dishes
  SET in_stock = (
  SELECT available_portions
  FROM DishPortions
  WHERE DishPortions.dish_id = dishes.id
  )`;


