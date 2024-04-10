import { IDish, details } from "@/dataTypes/dish";
import FullDishCard from "../menu/dishCard/FullDishCard";
import * as styled from "./OrderDishCard.styles";
import { useEffect, useState } from "react";

const OrderDishCard = ({
  data,
  details,
  onUpdate,
}: {
  data: IDish;
  details?: details;
  onUpdate: Function;
}) => {
  const [amount, setAmount] = useState(details ? Number(details.amount) : 1);
  const [notes, setNotes] = useState(details ? details.notes : "");
  let quntity = data.in_stock

  const addItem = () => {
    if (amount + 1 <= quntity) {
            setAmount(amount + 1)
        }
        else {
            alert("נגמר המלאי")
        }
  };

  const removeItem = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const submit = () => {
    onUpdate({
      dish_id: data.id,
      dish_name: data.name,
      amount: amount.toString(),
      total: amount * data.price,
      notes: notes,
    });
  };


  useEffect(() => {
    setAmount(details ? Number(details.amount) : 1);
    setNotes(details ? details.notes : "");
  }, [data, details]);

  return (
    <styled.orderDishCard>
      <styled.dishCard>
        <FullDishCard
          img={data.picture}
          name={data.name}
          category={data.category_name}
          description={data.description}
          price={data.price}
          showOnly={true}
        />
      </styled.dishCard>
      <styled.orderLine>
        <styled.addRm>
          <styled.addRmButton onClick={addItem}>+</styled.addRmButton>
          <styled.amount>{amount}</styled.amount>
          <styled.addRmButton onClick={removeItem}>-</styled.addRmButton>
        </styled.addRm>
        <styled.submitButton onClick={submit}>הוסף</styled.submitButton>
      </styled.orderLine>
      <styled.notesField
        placeholder="הערות להזמנה"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></styled.notesField>
    </styled.orderDishCard>
  );
};

export default OrderDishCard;
