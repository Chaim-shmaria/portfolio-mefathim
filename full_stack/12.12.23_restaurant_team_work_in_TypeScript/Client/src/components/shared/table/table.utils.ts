import  {RestaurantObjects} from "./Table.types"

export const sortTable = (
        data:RestaurantObjects[],
        setData:React.Dispatch<RestaurantObjects[]>,
        column:string,
        descending:boolean )=>{
            console.log(column)
            if(descending){
                const tump = [...data].
                sort((a, b) => a[column] > b[column] ?1 :-1)
                console.log(tump)
                setData(tump);}
            else{
                const tump = [...data].
                sort((a, b) => a[column] < b[column] ?1 :-1)
                setData(tump);}
            }
