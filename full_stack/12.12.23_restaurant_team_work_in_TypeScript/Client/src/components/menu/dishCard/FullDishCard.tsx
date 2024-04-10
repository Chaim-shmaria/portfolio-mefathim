import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import * as styled from "./fullDishCard.styles";

const FullDishCard = (props: {
  img: string;
  name: string;
  category: string;
  description: string;
  price: number;
  showOnly?: boolean;
}) => {
  const _delete = () => {
    return;
  };
  const edit = () => {
    return;
  };
  return (
    <styled.fullDishCard>
      <styled.dishImg src={'/'+(props.img || 'logo2.svg')} />
      <styled.titleLine>
        <styled.dishName> {props.name}</styled.dishName>
        <styled.dishCategory> {props.category}</styled.dishCategory>
      </styled.titleLine>
      <styled.dishDescription>
        <styled.descriptionWord>תיאור:</styled.descriptionWord>
        {props.description}
      </styled.dishDescription>
      <styled.bottomLine>
        {!props.showOnly && (
          <div>
            <button onClick={edit}>
              <FaEdit />
            </button>
            <button onClick={_delete}>
              <FaRegTrashAlt />{" "}
            </button>
          </div>
        )}
        <styled.pricePos>
          <div>{'ש"ח'}</div>
          <div>{props.price} </div>{" "}
        </styled.pricePos>
      </styled.bottomLine>
    </styled.fullDishCard>
  );
};
export default FullDishCard
