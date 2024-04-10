import  {RestaurantObjects} from "./Table.types"



export const sortTable = (
        data:RestaurantObjects[],
        setData:React.Dispatch<RestaurantObjects[]>,
        column:string,
        direction: string )=>{
            if(direction == "desc"){
                const tump = [...data].
                sort((a, b) => a[column] > b[column] ?1 :-1)
                setData(tump);}
            else{
                const tump = [...data].
                sort((a, b) => a[column] <  b[column] ?1 :-1)
                setData(tump);}
     };

   
        
   
    
  

