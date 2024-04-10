export interface IDish {
  [x: string]: any; // Necessary to identify the width in general
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  price: number;
  picture: string;
  description: string;
  in_stock: number;
}


export  interface NewDish extends IDish {
    products?:Record<string, string|number>[];

  }

export interface IdishCategory{
  id: number;
  category_name: string;
}  
export  interface orderDish{
  dish_id: number;
  dish_name: string;
  amount:number;
  notes: string;
  price: number;
  total: number;
}

export type details = {
  amount: number,
  notes: string,
  total: number,
}

