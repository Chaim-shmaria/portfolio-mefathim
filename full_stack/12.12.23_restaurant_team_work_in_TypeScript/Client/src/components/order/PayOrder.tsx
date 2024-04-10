import {  useContext, useEffect, useState } from "react";
import * as styles from "./PayOrder.styles";
import { FcCheckmark } from "react-icons/fc";
import { payOrder } from "../../services/dinerOrdersService";
import WorkDayContext from "../workDay/WorkDayContext";

interface ButtonProps {
  onClose: () => void;
  onPay: () => void;
  total: number;
  table_id: number | null;
  order_id:number
}

const PayOrder = (props: ButtonProps) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const {fetchFloor} = useContext(WorkDayContext)

  const onPay = () => {
    setPaymentSuccess(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (paymentSuccess) {
          const timer = setTimeout(async () => {
            
            props.onPay();
            await payOrder(Number(props.order_id), {table_id: props.table_id});
            await fetchFloor();
            setPaymentSuccess(false);
          }, 2000);
  
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
  
    fetchData();
  }, [paymentSuccess]);

  return !paymentSuccess ? (
    <styles.PopUp>
      <styles.TotalAmount>
        הסכום לתשלום: <span style={{ color: "red" }}>{props.total}</span>
      </styles.TotalAmount>

      <styles.ButtonDiv>
        <styles.Button color="" onClick={onPay}>
          שלם עכשיו
        </styles.Button>
        <styles.Button color="blue" onClick={props.onClose}>
          מאוחר יותר
        </styles.Button>
      </styles.ButtonDiv>
    </styles.PopUp>
  ) : (

    <styles.PopUp>
      <styles.CheckMark>
        <FcCheckmark />
      </styles.CheckMark>
      <styles.PaymentReceived>
        התשלום התקבל בהצלחה!
      </styles.PaymentReceived>
    </styles.PopUp>

  )
}
export default PayOrder

