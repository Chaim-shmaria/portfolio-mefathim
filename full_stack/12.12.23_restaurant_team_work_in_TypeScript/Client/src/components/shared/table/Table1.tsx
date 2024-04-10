import { useState } from "react";
import * as Styled from "./Table.styles";
import { redirect } from "react-router-dom";

type TableProps = {
  rows: any[];
  searchBy: string;
  activeMode?: boolean;
  tableConfig: any;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
  onMakeActive:(obj:any) => void;
  color?:(field:any,quantity:any,order_threshold:any)=> string|undefined;
  clickRow?:(obj:any)=>void
  
};

const Table = (props: TableProps) => {

  return (
    <Styled.TableContainer>
      {props.rows.map((object: any, index: any) => {
        // return object[props.searchBy].toLowerCase() ? (
          return object[props.searchBy] ? (

          Object.keys(object).includes("is_active") && !object.is_active ? (
            props.activeMode == false ? (
              <Styled.NotActiveRow
              // key={index}
              >
                {Object.entries(props.tableConfig).map(([key, value]) => {
                  if (key == "defaultSearch") {
                    return null;
                  }
                  return (
                    <Styled.NotActiveCell width={1}>
                      {object[key]}
                    </Styled.NotActiveCell>
                  );
                })}
                <Styled.NotActiveCell width={1}>
                  <Styled.MakeActiveButton
                  onClick={() => props.onMakeActive(object)}
                  />
                </Styled.NotActiveCell>
              </Styled.NotActiveRow>
            ) : null
          ) : (
            <Styled.TabelRow onClick={()=>props.clickRow?props.clickRow(object):{}} key={index}>
              {Object.entries(props.tableConfig).map(([key, value]) => {
                if (key == "defaultSearch") {
                  return null;
                }
                return (
                  <Styled.TabelCell color={props.color?props.color(key,object.quantity,object.order_threshold):undefined} width={1}>{object[key]}</Styled.TabelCell>
                );
              })}

              <Styled.TabelCell width={1}>
                <Styled.DeleteButton 
                  onClick={(e) => {e.stopPropagation();props.onDelete(object.id)}}
                />
                <Styled.EditButton onClick={(e) => {e.stopPropagation();props.onEdit(object)}} />
              </Styled.TabelCell>
            </Styled.TabelRow>
          )
        ) : null;
      })}
    </Styled.TableContainer>
  );
};

export default Table;
