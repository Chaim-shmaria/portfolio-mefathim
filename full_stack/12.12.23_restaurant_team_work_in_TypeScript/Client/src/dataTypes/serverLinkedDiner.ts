  
  // Linked table between dishes and its products
  interface LinkedDishesProducts {
    dishId: number; 
    productId: number; 
    inStock: boolean;
    necessary?: boolean;
  }
  
  // Linked table between order and its dishes
  interface LinkedOrderDishes {
    orderId: number; 
    dishId: number; 
    amountOrdered: number; 
    notes: string;
    sumPerDish?: number;
  }
  
  // Linked table between supplier and products
  interface LinkedSupplierProducts {
    supplierId: number; 
    productId: number; 
    lastSupplied: string; 
    price: number;
  }
  
  // Linked table between waiter and tables
  interface LinkedWaiterTables {
    waiterId: number; 
    tableId: number; 
  }
  
  // Linked table between order and product
  interface LinkedOrderProduct {
    orderId: number; 
    productId: number; 
    quantityOfProduct: number;
  }
export {}