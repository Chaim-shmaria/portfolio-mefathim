import React from 'react';
import * as styled from './MetaDishCard.styles';
import { IDish } from '@/dataTypes/dish';


interface MetaDishCardProps {
  dish: IDish;
  onClick: (data: IDish) => void;
}

const MetaDishCard: React.FC<MetaDishCardProps> = ({ dish, onClick }) => {
  const handleClick = () => { 
    onClick(dish);
  };
  return (
    <styled.metaDishCard 
      onClick={handleClick} 
      available={dish.in_stock} >
      <styled.ImageWrap>
        <styled.DishImage src={'/'+(dish.picture || 'logo2.svg')} alt={dish.name} />
        {!dish.in_stock && (
          <styled.WraperTextUnavailableProduct>
            <styled.TextUnavailableProduct>
              חסר במלאי
            </styled.TextUnavailableProduct>
          </styled.WraperTextUnavailableProduct>      
        )}
      </styled.ImageWrap>
      <styled.InformationWrap>
        <styled.DishName>{dish.name}</styled.DishName>
        <styled.DishCategory>{dish.category_name}</styled.DishCategory>
        <styled.DishPrice>{dish.price} ש"ח</styled.DishPrice>  
      </styled.InformationWrap> 
    </styled.metaDishCard>
  );
};

export default MetaDishCard;
