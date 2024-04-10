import { useEffect, useState } from "react";
import { IInventory, ISupplier } from "../shared/table/Table.types";
import * as Styled from "./addProduct.styles";
import {
  getOtherData,
  addProduct,
  updateProduct as updateProduct,
  updateLInkTable,
} from "../../services/productService";
import { getSupplierNamesForProduct } from "../../services/baseService";

const AddProduct = (props: {
    setSeen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    currentProduct?: any;
    isAdd: boolean;
  }) =>{
    const [suppliers, setSuppliers] = useState([] as ISupplier[]);
    const [inventory, setInventory] = useState([] as IInventory[]);
   
    
  }