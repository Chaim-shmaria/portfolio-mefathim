import { useContext } from 'react';
import * as styled from './RestaurantFloor.styles'
import WorkDayContext from '../workDay/WorkDayContext';
import Table from './Table'




    
const RestaurantFloor = () => {
    const {floorLayout} = useContext(WorkDayContext); 
    const ObjectText:Record<string,string> = {'bar': 'דלפק', 'cabin': 'ארון משקאות'}

    return (
        <styled.Container>
            {floorLayout.map((object:any) => ( 
                (object.config.type !== "table")
                    ? <styled.RestaurantObject
                        data={object.config}>{<p>{object.config.name}</p>}
                    </styled.RestaurantObject>
                    : <styled.RestaurantTable
                        data={object.config}><Table config={object.config} order={object.order}></Table>
                    </styled.RestaurantTable>
            ))}
        </styled.Container>
    );

}

export default RestaurantFloor;
