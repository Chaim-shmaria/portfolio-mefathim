import { RestaurantSquare } from "services/restaurantFloorService";
import * as styled from "./RestaurantFloor.styles";
import WorkDayContext from "../workDay/WorkDayContext";
import { useContext } from "react";

interface Props extends RestaurantSquare {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  config: any;
  order: any;
}
export const OrderDetails = ({ config, order }: Props) => {
  const { setClickTableId, setAction } = 
    useContext(WorkDayContext); 
  return (        
  <>
  <styled.TableNumber>{config.name}</styled.TableNumber>
  {!config.connected_to ? (
    <styled.WaiterAndDinersCircleTable>
      <styled.Diners>{order?.n_diners}</styled.Diners>
      <styled.WaiterTable>
        {order.waiter_name.slice(0, 5)}
      </styled.WaiterTable>
    </styled.WaiterAndDinersCircleTable>
  ) : (
    <styled.WaiterAndDinersCircleTable/>
  )}
  { !config.connected_to ?( 
        order.total ?  <styled.AmountPay>{order.total}</styled.AmountPay> : 
          <styled.unseatEmptyTable 
            onClick={() => {
              setClickTableId(config.id); 
              setAction('unseatTable')}}
            name={'unseatTable'}
          >
              'פנה שולחן'
          </styled.unseatEmptyTable>
  ): <styled.unseatEmptyTable 
            onClick={() => {
              setClickTableId(config.id); 
              setAction('unattachTable')}}
            name={'unattachTable'}
          >
          {order!.table_name} &#x1F517;
      </styled.unseatEmptyTable>
      
  }</>);
};


export const CircleTable = ({ config, order, onClick }: Props) => {
  return (
    <styled.ImgRelative>
      <styled.ImgCircleTable 
        src="circleTable.png" 
        alt="Circle Table" 
        />
          {order ? (
            <styled.TextCircleTableOrder onClick={onClick}>
              <OrderDetails config={config} order={order}/>
            </styled.TextCircleTableOrder>
          ):(
            <styled.TextCircleTable onClick={onClick}>
              <styled.TableNumber>{config.name}</styled.TableNumber>
            </styled.TextCircleTable>
          )}
    </styled.ImgRelative>
  );
};


export const RectangleTable = ({ config, order, onClick }: Props) => {
  return (
    <styled.ImgRelative>
      <styled.ImgRectangleTable
        src="rectangleTable.png"
        alt="Rectangle Table"
      />
      {order ? (
        <styled.TextRectangleTableOrder onClick={onClick}>
          <OrderDetails config={config} order={order}/>
        </styled.TextRectangleTableOrder>
      ) : (
        <styled.TextRectangleTable onClick={onClick}>
          <styled.TableNumber>{config.name}</styled.TableNumber>
        </styled.TextRectangleTable>
      )}
    </styled.ImgRelative>
  );
};

    
const Table = (props: RestaurantSquare) => {
  const { setClickTableId, setAction } =
    useContext(WorkDayContext);
        
 const ClickTable = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement && 
      (e.target.name === 'unseatTable' || 
      e.target.name ===  'unattachTable')){
      return}
   
    setClickTableId(props.config.connected_to || props.config.id);
    !props.order?.id
      ? setAction("seating")
      : !props.order.total
      ? setAction("Order")
      : setAction("OrderSummary");
  };

  return props.config.shape !== "rectangle" ? (
    <CircleTable
      config={props.config}
      order={props.order}
      onClick={ClickTable}
    />
  ) : (
    <RectangleTable
      config={props.config}
      order={props.order}
      onClick={ClickTable}
    />
  );
};

export default Table;
