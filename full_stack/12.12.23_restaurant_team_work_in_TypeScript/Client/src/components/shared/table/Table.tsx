import { useEffect, useState } from "react";
import * as Styled from "./Table.styles";
import * as configJson from "./table.config.json";
import { RestaurantProps } from "./Table.types";
import Header from "./Header";
import Table from "./Table1";
import {sortTable} from "./SortTable"
import { HiArrowNarrowDown } from "react-icons/hi";
import { HiArrowNarrowUp } from "react-icons/hi";

export const GenericTable = ({ props }: { props: RestaurantProps }) => {
  const json = configJson;
  const tableConfig: { [x: string]: any } = json[props.name];
  const [rows, setRows] = useState([] as any);
  const searchBy = json[props.name].defaultSearch;
  const [sortDirection, setDirection]= useState<string>(" ")
  const [columnSort, setColumnSort]= useState<string>("")

  const handleStatus = async () => {
    props.setMode!(!props.activeMode);
  };

  const handelSort = (key:string, dir:string)=>{
    setDirection(dir)
    setColumnSort(key)
    sortTable(rows, setRows, key, dir)
  }
  const TableTop = () => {
    return (
      <Styled.TabelHeader>
        {Object.entries(tableConfig).map(([key, { header, width,sorted }]) => {
          return <Styled.TabelCell width={width}>{header} 
         <Styled.Arrow>
          {sorted ?
            (sortDirection == "desc" && columnSort == key)
            ? <HiArrowNarrowUp size={20} 
            onClick={()=>handelSort(key,'asc')}/>
            : <HiArrowNarrowDown size={20} 
            onClick={()=>handelSort(key,'desc')}/> 
            :null
            } 
            </Styled.Arrow>     
          </Styled.TabelCell>;
        })}
        <Styled.TabelCell width={1}></Styled.TabelCell>
      </Styled.TabelHeader>
    );
  };

  // const Table = () => {
  //   return (
  //     <Styled.TableContainer>
  //       {rows.map((object:any, index:any) => {
  //         return object[searchBy]
  //           .toLowerCase()
  //           .includes(textToSearch.toLowerCase()) ? (
  //           Object.keys(object).includes("isActive") && !object.isActive ? (
  //             props.activeMode == false ? (
  //               <Styled.NotActiveRow
  //               // key={index}
  //               >
  //                 {Object.entries(tableConfig).map(([key, value]) => {
  //                   return (
  //                     <Styled.NotActiveCell width={value.width}>
  //                       {object[key]}
  //                     </Styled.NotActiveCell>
  //                   );
  //                 })}
  //                 <Styled.NotActiveCell width={1}>
  //                   <Styled.MakeActiveButton
  //                   // onClick={() => props.onMakeActive(object.id)}
  //                   />
  //                 </Styled.NotActiveCell>
  //               </Styled.NotActiveRow>
  //             ) : null
  //           ) : (
  //             <Styled.TabelRow key={index}>
  //               {Object.entries(tableConfig).map(([key, value]) => {
  //                 return (
  //                   <Styled.TabelCell width={value.width}>
  //                     {object[key]}
  //                   </Styled.TabelCell>
  //                 );
  //               })}
  //               <Styled.TabelCell width={1}>
  //                 <Styled.DeleteButton
  //                   onClick={() => props.onDelete(object.id)}
  //                 />
  //                 <Styled.EditButton onClick={() => props.onEdit(object)} />
  //               </Styled.TabelCell>
  //             </Styled.TabelRow>
  //           )
  //         ) : null;
  //       })}
  //     </Styled.TableContainer>
  //   );
  // };

  return (
    <Styled.Page>
      {/* {seen}?{<PopUp togglePop={setSeen}></PopUp>} */}
      <Header
        name={props.name}
        onAdd={props.onAdd}
        values={props.values}
        setRows={setRows}
        searchBy={searchBy}
        activeMode={props.activeMode!}
        handleStatus={handleStatus}
      />
      <TableTop />
      {rows && (
        <Table
          rows={rows}
          searchBy={searchBy}
          activeMode={props.activeMode!}
          tableConfig={tableConfig}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          color={props.color!}
          onMakeActive={props.makeActiveData!}
          clickRow={props.clickRow!}
        />
      )}
    </Styled.Page>
  );
};

//גירסה הכוללת את אוטו קומפליט של אלחנן ואקטיב של שמואל כפי הנדרש

// import { RestaurantObjects } from "./Table.types";
// const Header = (props: {
//   name: string;
//   onAdd: () => void;
//   active?: boolean;
//   setStatus?: (status: boolean) => void;
//   data: RestaurantObjects[];
//   searchBy: string;
//   setFilteredData: (val: RestaurantObjects[]) => void;
// }) => {
//   return (
//     <Styled.PageHeader>
//       <Styled.RightTop>
//         {props.name}
//         <Styled.AddButton onClick={props.onAdd} />
//       </Styled.RightTop>
//       <Styled.LeftTop>
//         <Styled.Search>
//           <AutoComplete
//             olderData={props.data}
//             setOlderData={props.setFilteredData}
//             searchBy={props.searchBy}
//           ></AutoComplete>
//         </Styled.Search>
//         {Object.keys(props).includes("active") ? (
//           <Styled.DisplayStatus>
//             {props.active ? (
//               <Styled.DisplayText>הצג לא פעילים</Styled.DisplayText>
//             ) : (
//               <Styled.DisplayText>הסתר לא פעילים</Styled.DisplayText>
//             )}
//             <Styled.DisplayIcon
//               active={props.active}
//               onClick={() => props.setStatus}
//             />
//           </Styled.DisplayStatus>
//         ) : null}
//       </Styled.LeftTop>
//     </Styled.PageHeader>
//   );
// };

//עד כאן טופל בגרסה זו

// const Table = (props: {
//   tableConfig: { [x: string]: any };
//   dataToDisplay: RestaurantObjects[]; //IUser[];
//   onDelete: (val: any) => void;
//   onEdit: (val: any) => void;
//   onMakeActive: (val: any) => void;
// }) => {
//   return (
//     <Styled.TableContainer>
//       <Styled.TabelHeader>
//         {Object.values(props.tableConfig).map(({ header, width }) => {
//           return <Styled.TabelCell width={width}>{header}</Styled.TabelCell>;
//         })}
//       </Styled.TabelHeader>
//       <label>
//         {" "}
//         */scrolling
//         {props.dataToDisplay.map((object, index) => {
//           return (
//             <Styled.TabelRow key={index}>
//               {Object.entries(props.tableConfig).map(([key, value]) => {
//                 return (
//                   <Styled.TabelCell width={value.width}>
//                     {object[key]}
//                   </Styled.TabelCell>
//                 );
//               })}
//               <Styled.TabelCell width={1}>
//                 <Styled.DeleteButton
//                   onClick={() => props.onDelete(object.id)}
//                 />
//                 <Styled.EditButton onClick={() => props.onEdit(object.id)} />
//               </Styled.TabelCell>
//             </Styled.TabelRow>
//           );
//         })}
//       </label>
//     </Styled.TableContainer>
//   );
// };

// export const GenericTable = ({ props }: { props: RestaurantProps }) => {
//   const json = configJson;
//   const tableConfig: { [x: string]: any } = json[props.name];
//   const [rows, setRows] = useState(props.values);
//   const searchBy = tableConfig.defaultSearch;

//   return (
//     <Styled.Page>
//       <Header
//         name={props.name}
//         active={props.activeStatus}
//         setStatus={props.onChangeStatus}
//         data={props.values}
//         onAdd={props.onAdd}
//         searchBy={searchBy}
//         setFilteredData={setRows}
//       />
//       <Table
//         tableConfig={tableConfig}
//         dataToDisplay={rows}
//         onDelete={props.onDelete}
//         onEdit={props.onEdit}
//         onMakeActive={props.onMakeActive}
//       />
//     </Styled.Page>
//   );
// };
