import React, {useEffect,useState,useContext} from 'react';
import * as styles from './OrderDetail.styles'
import PayOrder from'./PayOrder';
import WorkDayContext from '../workDay/WorkDayContext'
import { getOrders,getOrderWithDishes } from '../../services/dinerOrdersService';
import { IFullDinerOrder } from '@/dataTypes/dinerOrder';

interface OrderDetailsProps {
    clickTableId: number ;    
}
const OrderDetails : React.FC<OrderDetailsProps> = () => {
    const {table, setClickTableId, setAction} = useContext(WorkDayContext); 
    const [close,setClose]=useState(true)
    const [showPayWindow,setShowPayWindow]=useState(false)
    const [credit,setCredit]=useState("")
    const [orderData, setOrderData] = useState<IFullDinerOrder>(() => ({
        id: 0,
        waiter_id: 0,
        waiter_name: '',
        table_id: 0,
        table_name: '',
        n_diners: 0,
        total: 0,
        paid: 0,
        timestamp: '',
        dishes: [],
      }));
      
      
      const fetchOrder = async () => {
          const data = await getOrderWithDishes(table!.order!.id);
          setOrderData(data);
      };
    
    useEffect(() => {
        fetchOrder();
      },[]); 
    
     

    const closing=()=>{
        setClose(false)
        setClickTableId(null)
        setAction('')
    };
   
    const ShowPopUp =()=>{ 
        setShowPayWindow(!showPayWindow);
    }; 
   
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
          setCredit(inputValue);
    };
    const TotalWithCredit = (totalAmount: number, input: string): number => {
        const inputAsInteger = parseInt(input, 10);
            return isNaN(inputAsInteger) ? totalAmount : Math.max(totalAmount - inputAsInteger, 0);
    };
    
    
    const AnotherOrder = () => {
        setAction('Order')

    }
    
    return(
        <div>
        {close&&<styles.Orders>
            <styles.Close onClick={closing}>x</styles.Close>

            <styles.Title>פרטי הזמנה</styles.Title> 
            <styles.Iddiv>
                <styles.IdWaiter>מלצר: <styles.Bold>{orderData.waiter_name}</styles.Bold>
                </styles.IdWaiter>
                <styles.IdTable>מס' שולחן: <styles.Bold>{orderData.table_name}</styles.Bold>
                </styles.IdTable>
            </styles.Iddiv>
            <styles.Thead>
                <styles.DishName>מנה</styles.DishName>
                <styles.Amount>כמות</styles.Amount>
                <styles.Price>מחיר</styles.Price>
                <styles.Notes><styles.Bold>הערות</styles.Bold></styles.Notes>
            </styles.Thead>
            <styles.Details>{orderData.dishes.map((data) => {
                return(
            <styles.GrayRow>
                <styles.DishName>{data.dish_name}</styles.DishName>
                <styles.Amount>{data.amount}</styles.Amount>
                <styles.Price>{data.total}</styles.Price>
                <styles.Notes title={data.notes}>{data.notes}</styles.Notes>
            </styles.GrayRow>
             )}
             )}
            </styles.Details>
            <styles.AddCredit>הוסף זיכוי:
                <styles.Input type='number' min= "0" value={credit} onChange={handleInputChange}/>
            </styles.AddCredit>
            <styles.TotalAmount>סה"כ להזמנה: 
                <span style={{ color: "red" }}>{TotalWithCredit(orderData.total, credit)}</span>
            </styles.TotalAmount>
            <styles.ButtonDiv> 
                <styles.Button onClick={ShowPopUp}>תשלום</styles.Button>
                <styles.Button color='blue' onClick={AnotherOrder}>הזמן עוד</styles.Button>
            </styles.ButtonDiv>
            {showPayWindow && <PayOrder 
                onClose={() => setShowPayWindow(false)}
                onPay={closing}
                total={TotalWithCredit(orderData.total, credit)} 
                table_id={orderData.table_id} 
                order_id = {orderData.id}
                />} 
        </styles.Orders>}
        </div>
    )
}
export default OrderDetails;
