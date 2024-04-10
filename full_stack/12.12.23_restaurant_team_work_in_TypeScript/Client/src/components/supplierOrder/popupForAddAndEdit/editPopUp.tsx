import PopUp from "../../shared/popup/Popup";
import { useState, useEffect } from "react";
import * as configJson from "../../shared/table/table.config.json";
import * as Styledd from "./addPopUpTable.styles";
import EmailComponent from "../../../components/emailPoup/emailPopup";
import * as Styleddd from "./addPopUp.styles";
import {
  getData,
  getDataToEdit,
  updateData,
  updateInventory,
} from "../../../services/supplierOrderService";
import { OrderButton } from "./editPopUp.styles";
import * as editStyle from "./editPopUp.styles";


const json = configJson;
const GET_DATA = "editOrder";

const tableConfig: { [x: string]: any } = json["ערוך הזמנה חדשה"];

const EditOrder = (props: any) => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showEmail, setShowEmail] = useState<boolean>(false);


  const fetchData = () => {
    getData(`/${GET_DATA}/${props.data.id}`).then((data: any) => {
      setDisplayData(data);
      setSelectedStatus(data[0]?.status || "");
    });
  };
  const handleStatusChange = async (newStatus: any) => {
    const setNewStatus = {
      ...props.data,
      status: newStatus,
    };
    setSelectedStatus(newStatus);

    try {
      await updateData(props.data.id, setNewStatus);
    } catch (error) {
      console.error(error);
    }
    if (newStatus === "סופק"){
      try {
       updateInventory({value: props.data.id});
      } catch (error) {
        console.error(error);
      }    }
  };
  interface OrderData {
    amount: number;
    product_name: string;
  }

  function generateOrderMessage(Data: OrderData[]): string {
    const productMap: Record<string, number> = {};

    Data.forEach((item) => {
      const { amount, product_name } = item;

      productMap[product_name] = productMap[product_name]
        ? productMap[product_name] + amount
        : amount;
    });
    const message: string[] = [
      "נשמח להזמין את המוצרים הבאים:",
      ...Object.entries(productMap).map(
        ([productName, totalAmount]) => ` - ${productName}: ${totalAmount} `
      ),
      "",
      "תודה רבה!",
    ];

    return message.join("\n");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Header: React.FC = () => (
    <>
      <Styledd.CloseIcon onClick={props.toggle} />

      <Styledd.PageMode>
        <editStyle.TableHeader>עדכן הזמנה מספר {props.data.id}</editStyle.TableHeader>
      </Styledd.PageMode>
    </>
  );
  const TableTop: React.FC = () => (
    <Styledd.TabelHeader>
      {Object.values(tableConfig).map(({ header, width }) => (
        <editStyle.TabelCell key={header} width={width}>
          {header}
        </editStyle.TabelCell>
      ))}
    </Styledd.TabelHeader>
  );
  const Table: React.FC = () => (
    <Styledd.TableContainer>
      {displayData.map((object: any, index: number) => (
        <editStyle.TabelRow key={index}>
          {Object.entries(object).map(
            ([key, value]: any[]) =>
              key !== "order_id" &&
              key !== "supplier_email" &&
              key !== "total_amount" && (
                <editStyle.TabelCell key={key} width={1}>
                <editStyle.TabelCell key={key} width={1}>
                  {value}
                </editStyle.TabelCell>
                </editStyle.TabelCell>
              )
          )}
        </editStyle.TabelRow>
      ))}
    </Styledd.TableContainer>
  );

  return (
    <PopUp togglePop={props.toggle}>
      <Styleddd.pop>
        <Styledd.Page>
          <Header />
          <TableTop />
          <Table />


          {showEmail && (
            <EmailComponent
              close={setShowEmail}
              to={displayData[0].supplier_email}
              subject={"הזמנה חדשה ממסעדת מפתחים"}
              body={generateOrderMessage(displayData)}
              handleStatusChange={handleStatusChange}
            />
          )}
          <editStyle.suppliersInOrder>: סטטוס הזמנה</editStyle.suppliersInOrder>
          <editStyle.buttonAndText>
            <editStyle.BottunsAndMail>
              <editStyle.WarpEmail>
          {displayData[0]?.status === "ממתין לשליחה" && (
            <editStyle.mail
              onClick={(e) => {
                setShowEmail(true);
                props.fetchData();


              }}
            />
          )}
          </editStyle.WarpEmail>
            <OrderButton
              onClick={() => {
                props.fetchData();
                props.toggle();
              }}
            >
              עדכן
            </OrderButton>
            

            <editStyle.sumTotal>
              {" "}
              {displayData[0] ? displayData[0].total_amount : 0} :סה"כ{" "}
            </editStyle.sumTotal>
            </editStyle.BottunsAndMail>
            <editStyle.RadioGroup>
              <editStyle.RadioLabel>
                סופק
                <editStyle.RadioInput
                  type="radio"
                  value="סופק"
                  checked={selectedStatus === "סופק"}
                  onChange={() => handleStatusChange("סופק")}
                />
              </editStyle.RadioLabel>
              <editStyle.RadioLabel>
                שולם
                <editStyle.RadioInput
                  type="radio"
                  value="שולם"
                  checked={selectedStatus === "שולם"}
                  onChange={() => handleStatusChange("שולם")}
                />
              </editStyle.RadioLabel>
              <editStyle.RadioLabel>
                נשלח להזמנה{" "}
                <editStyle.RadioInput
                  type="radio"
                  value=" נשלח להזמנה"
                  checked={selectedStatus === "נשלח להזמנה"}
                  onChange={() => handleStatusChange(selectedStatus)}
                />
              </editStyle.RadioLabel>
              <editStyle.RadioLabel>
                ממתין לשליחה{" "}
                <editStyle.RadioInput
                  type="radio"
                  value="ממתין לשליחה"
                  checked={selectedStatus === "ממתין לשליחה"}
                  onChange={() => handleStatusChange("ממתין לשליחה")}
                />
              </editStyle.RadioLabel>
            </editStyle.RadioGroup>
          </editStyle.buttonAndText>
        </Styledd.Page>
      </Styleddd.pop>
    </PopUp>
  );
};

export default EditOrder;
