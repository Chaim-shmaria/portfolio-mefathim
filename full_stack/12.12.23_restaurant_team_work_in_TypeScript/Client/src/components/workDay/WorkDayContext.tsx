import { IDish } from '@/dataTypes/dish';
import { RestaurantSquare } from '@/services/restaurantFloorService';
import { createContext } from 'react';

export type WorkDayContextType = {
    floorLayout: RestaurantSquare[],
    fetchFloor: ()=>void,
    Menu: IDish[], 
    setMenu: Function,
    setClickTableId:  React.Dispatch<React.SetStateAction<null | number>>,
    table: RestaurantSquare |undefined,
    setAction: Function
  };

const MyContext = createContext<WorkDayContextType>({
    floorLayout:[],
    fetchFloor: ()=>{},
    Menu: [], 
    setMenu: ()=>{},
    setClickTableId:()=>{}, 
    setAction:()=>{},
    table: {}as RestaurantSquare,
});

export default MyContext;