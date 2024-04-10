import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./suppliers.styles";
import { ISupplier } from "../../components/shared/table/Table.types";
import { addRow, updateRow } from "../../services/supplierService";
import isValidSupplier from "./suppliers.utils";

interface AddSuppliererProps {
  fetchData: () => void;
  currentSupplier: ISupplier;
  setCurrentSupplier: React.Dispatch<
    React.SetStateAction<ISupplier | undefined>
  >;
  showComponent: boolean;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>;
  newSupplier: boolean | undefined;
  setnewSupplier: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  showAlert: (message: string) => void;
}

const AddSupplier: React.FC<AddSuppliererProps> = ({
  fetchData,
  setShowComponent,
  currentSupplier,
  setCurrentSupplier,
  newSupplier,
  setnewSupplier,
  showAlert,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    const updatedSupplier: ISupplier = {
      ...(currentSupplier ?? {}),
      [fieldName]: value,
    };
    setCurrentSupplier(updatedSupplier);
  };

  const onClose = () => {
    setShowComponent(false);
  };

  const addSupplier = async () => {
    if (isValidSupplier(currentSupplier!,showAlert)) {
      await addRow(currentSupplier);
      fetchData();
      onClose();
    }
  };

  const editSupplier = async () => {
    if (isValidSupplier(currentSupplier!,showAlert)) {
    const id = currentSupplier?.id!;
    await updateRow(id, currentSupplier);
    fetchData();
    onClose();
  }};

  return (
    <Styled.Container>
      <Styled.Icon onClick={onClose} />
      {newSupplier && <Styled.H3>הוספת ספק</Styled.H3>}
      {!newSupplier && <Styled.H3>פרטי ספק</Styled.H3>}
      <Styled.Rows>
        <Styled.Row>
          <Styled.LabelRow>ח.פ.:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.business_number}
            onChange={(e) => {
              handleChange(e, "business_number");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>שם הספק:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.supplier_name}
            onChange={(e) => {
              handleChange(e, "supplier_name");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>כתובת:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.address}
            onChange={(e) => {
              handleChange(e, "address");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>שם איש קשר:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.contact_name}
            onChange={(e) => {
              handleChange(e, "contact_name");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>נייד איש קשר:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.phone_number}
            onChange={(e) => {
              handleChange(e, "phone_number");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>מייל איש קשר:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.email}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>מינימום להזמנה:</Styled.LabelRow>
          <Styled.Input
            value={currentSupplier?.min_order}
            onChange={(e) => {
              handleChange(e, "min_order");
            }}
          />
        </Styled.Row>
        {newSupplier && (
          <Styled.Button onClick={addSupplier}>הוסף ספק</Styled.Button>
        )}
        {!newSupplier && (
          <Styled.Button onClick={editSupplier}>ערוך ספק</Styled.Button>
        )}
      </Styled.Rows>
    </Styled.Container>
  );
};

export default AddSupplier;
