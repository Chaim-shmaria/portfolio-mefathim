export interface IInventory {
  id: number;
  name: string;
  category: string;
  quantity: number;
  size_type: string;
  size_type_name: string;
  order_threshold: number;
};



export interface dishInventoryServer {
  id: number | null;
  dish_id: string;
  inventory_id: number;
  quantity: number;
  necessary: boolean;
}

export interface dishInventory extends dishInventoryServer {
  inventory_name: string;
  type: string
};