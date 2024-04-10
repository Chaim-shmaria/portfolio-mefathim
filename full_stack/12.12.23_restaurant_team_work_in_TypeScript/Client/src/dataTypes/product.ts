export interface IProduct {
  id?: number;
  name: string;
  category: string;
  inventory_id?:number;
  size?:number;
  n_units?:number;
  size_type:string; 
  mkt?: number;
  }