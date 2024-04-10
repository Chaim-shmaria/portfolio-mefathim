import React, { useEffect, useState } from 'react';
import * as styled from './menu.styles';
import * as style from "../shared/table/Table.styles";
import MetaDishCard from './metaDishCard/MetaDishCard';
import { getActiveDishes, getMenuData, } from '../../services/menuService';
import { IDish, IdishCategory, orderDish } from '@/dataTypes/dish';
import { CgAddR } from "react-icons/cg";
import AutoComplete from '../autoComplete';
import  {getCategories}  from '../../services/dishesCategoriesService'
import PopUp from "../shared/popup/Popup";
import AddEditDish from './AddDish';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [active, setActive] = useState(true)
  const [currentDish, setCurrentDish] = useState<IDish>({} as IDish);
  const [categories, setCategories] = useState<IdishCategory[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>([])
  const [AllMenuData ,setAllMenuData] = useState<IDish[]>([])
  const [addEditDish, setAddEditDish] = useState(false)

     
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (active) {
          data = await getMenuData();
        } else {
          data = await getActiveDishes();
        }
        await setAllMenuData(data);
        await setFilteredDishes(data);
        console.log(filteredDishes, 'Data fetched successfully');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [active]);

  const fetchCategories = async () => {
    try {
      let fetchedCategories: IdishCategory[]= await getCategories();
      fetchedCategories.sort((a, b) => a.id - b.id);
      setCategories(fetchedCategories);
      setSelectedCategory(1);
    } catch (error) {
      console.error("שגיאה בקבלת הקטגוריות:", error);
    }
  };

  useEffect(() =>{
    fetchCategories();
  }, []);
  
  
  const handleCardActive = () => {
    setActive(!active)
  };

  const handleCardClick = (dish: IDish) => {
    setCurrentDish(dish);
    setAddEditDish(true)
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
  };

  const closeAddEditDhise = () => {
    setAddEditDish(!addEditDish)
    setCurrentDish({} as IDish)
  }

  return (
    <styled.Wrapper>
      {addEditDish && (
        <PopUp togglePop={closeAddEditDhise}>
          <AddEditDish editDish={currentDish} closePop={closeAddEditDhise}/>
        </PopUp>
      )}
      <styled.upperRow>
        <styled.LeftupperRow>
          <styled.Search>
            <AutoComplete 
              olderData={AllMenuData}
              setOlderData={setFilteredDishes}
              searchBy={'name'}/>
          </styled.Search>
          <styled.Share>
            {active ? (
              <styled.DisplayText>מציג את כל המנות</styled.DisplayText>
              ) : (
              <styled.DisplayText>מציג רק מנות שבמלאי</styled.DisplayText>)}
            <style.DisplayIcon active={active} onClick={handleCardActive}></style.DisplayIcon>
          </styled.Share>  
        </styled.LeftupperRow>
        <styled.RightupperRow>
          <styled.Select onChange={handleChangeCategory}>
          {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </styled.Select>
          <styled.PlusButton onClick={closeAddEditDhise}>
              <CgAddR/>
          </styled.PlusButton>
          <styled.Text>
              מנות
          </styled.Text>
        </styled.RightupperRow>
      </styled.upperRow>
        <styled.RationItems>
          {filteredDishes.filter((dish) => dish.category_id === selectedCategory).map((dish) => (
          <styled.dish>
              <MetaDishCard key={dish.id} dish={dish} onClick={handleCardClick}/>
          </styled.dish>
          ))}
        </styled.RationItems>
    </styled.Wrapper>
  );
};

export default Menu;