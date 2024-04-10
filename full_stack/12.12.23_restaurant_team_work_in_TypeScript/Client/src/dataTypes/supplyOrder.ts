export interface IsupplierOrder {
    id?: number; 
    supplier_id: string; 
    date_ordered: string; 
    date_supplied: string;
    total_amount: number;
    notes?: string;
  }