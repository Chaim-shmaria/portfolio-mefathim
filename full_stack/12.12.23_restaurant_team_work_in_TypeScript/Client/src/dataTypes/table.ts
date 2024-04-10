export  interface ITable {
    id: number;
    name: string;
    n_seats: number; 
    seated: boolean;
    shape: string;
    type:string;
    connected_to:number | null;
    x0: string; 
    x1: string; 
    y0: string; 
    y1: string
  }

  export  interface sum extends ITable {
    waiterName:string;
    totalSum: number;
    numberOfDiners:string;
  
  } 
