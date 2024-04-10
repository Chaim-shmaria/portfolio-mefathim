import AutoComplete from '../../autoComplete';
import * as Styled from './Table.styles';
import { RestaurantObjects } from './Table.types';
import { SetStateAction, useState } from 'react';


type HeaderProps = {
    name: string;
    onAdd: any;
    values: RestaurantObjects[];
    setRows: SetStateAction<any>;
    searchBy: string;
    activeMode?: boolean;
    handleStatus?: () => void;
    
}
const Header = (props: HeaderProps) => {
    

    return (
      <Styled.PageHeader>
        <Styled.RightTop>
          <Styled.PageMode>{props.name}</Styled.PageMode>
          <Styled.AddButton onClick={props.onAdd} />
        </Styled.RightTop>
        <Styled.LeftTop>
          <Styled.Search>
            <AutoComplete
              // active={active}
              // changeSubString={setTextToSearch}
              // value={textToSearch}
              olderData={props.values}
              setOlderData={props.setRows}
              searchBy={props.searchBy}
            ></AutoComplete>
          </Styled.Search>
          <Styled.DisplayStatus>
            {props.activeMode ? (
              <Styled.DisplayText>הצג לא פעילים</Styled.DisplayText>
            ) : (
              <Styled.DisplayText>הסתר לא פעילים</Styled.DisplayText>
            )}
            <Styled.DisplayIcon
              active={props.activeMode!}
              onClick={props.handleStatus}
            ></Styled.DisplayIcon>
          </Styled.DisplayStatus>
        </Styled.LeftTop>
      </Styled.PageHeader>
    );
  };

  export default Header