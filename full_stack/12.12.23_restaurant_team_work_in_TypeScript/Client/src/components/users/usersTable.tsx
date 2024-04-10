import React, { useEffect, useState } from "react";
import { IUser } from "../shared/table/Table.types";
import AddUser from "./UsersPupup";
import {
  deleteRow,
  allusers,
  makeActive,
  getActiveUsers,
} from "../../services/userServices";
import { GenericTable } from "../shared/table/Table";
import PopUp from "../shared/popup/Popup";
import useCustomAlert from '../../Hooks/useAlert';
import useCustomConfirmation from "../../Hooks/useConfirm";



export const Users = () => {
  const a: any[] = [];
  const [cUsers, setCUsers] = useState(a);
  const [onlyActive, setOnlyActive] = useState(true);
  const [showPupUp, setShowPupUp] = useState(false);
  const [userId, setUserId] = useState<null | number>(null);
  const { showAlert, renderAlert } = useCustomAlert();
  const { renderConfirmation, showConfirmation } = useCustomConfirmation();



  const fetchData = () => {
   if (onlyActive) { 
    getActiveUsers().then((data: any) => setCUsers(data));
  }
  else{
    allusers().then((data: any) => setCUsers(data));
  }
  };

  useEffect(() => {
    fetchData();
  }, [showPupUp, onlyActive]);

  const removeUser = async(id: any) => {
    if (await showConfirmation("?סגור על זה")==true) {
      deleteRow(id).then(fetchData);
    }
  };

  const togglePop = () => {
    setShowPupUp(!showPupUp);
  };

  const OpenPupup = () => {
    return (
      <PopUp togglePop={togglePop}>
        <AddUser
          setShowComponent={setShowPupUp}
          userId= {userId}
          users={cUsers}
          showAlert={showAlert}
          showConfirmation={showConfirmation}
        />
      </PopUp>
    );
  };

  const add = () => {
    setUserId(null);
    setShowPupUp(true);
  };

  const edite = (user:IUser) => {
    setUserId(user.id);
    setShowPupUp(true);
  };
  const makeActiveData = async(obj: any) => {
    await makeActive(obj)
    fetchData()
  };

  return (
    <div>
      {showPupUp && <OpenPupup></OpenPupup>}
      {renderAlert()}
      {renderConfirmation()}
      <GenericTable
        props={{
          name: "משתמשים",
          values: cUsers,
          onDelete: removeUser,
          onAdd: add,
          onEdit: edite,
          activeMode:onlyActive,
          setMode:setOnlyActive,
          makeActiveData:makeActiveData
        }}
      />
    </div>
  );
};
