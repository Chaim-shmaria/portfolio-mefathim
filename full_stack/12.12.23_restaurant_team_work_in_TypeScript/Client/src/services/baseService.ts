import axios from "axios";

const url = process.env.REACT_APP_URL;

export const getAll = (tableName: string) => {
return axios.get(`${url}/${tableName}/all`)
.catch((error) => {
  return Promise.reject(error);
});
};

export const getActive = (tableName: string) => {
  return axios.get(`${url}/${tableName}/active`).catch((error) => {
    return Promise.reject(error);
  });
};
export const uploadImg = (tableName: string, data: any) => {
  return axios.post(`${url}/${tableName}/img`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }).catch((error) => {
    return error
  });
};

export const deleteImg = (tableName: string, data: any) => {
  data={id:data}
  return axios.post(`${url}/${tableName}/delete_img`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    return error
  });
};

export const getByColumn = (tableName: string, column: string, value: string | number) => {
  return axios.get(`${url}/${tableName}?${column}=${value}`).catch((error) => {
    return error;
  });
};

export const addItem = (tableName: string, data: any) => {
  return axios.post(`${url}/${tableName}/add`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    return (error);
  });
};

export const deleteItem = (tableName: string, id: number) => {
  return axios.delete(`${url}/${tableName}/${id}`).catch((error) => {
    return error;
  });
};

export const updateItem = (tableName: string, id: number | null, data: any) => {
  return axios
    .put(`${url}/${tableName}/update/${id}`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .catch((error) => {
      return error;
    });
};

export const makeActiveItem = (tableName: string, obj: any) => {
  if (window.confirm("להפוך לפעיל?")) {
    let newObject = obj;
    newObject.is_active = true;
    return updateItem(tableName, obj.id, newObject);
  }
};
export const makeActiveItems = (tableName: string, id: number) => {
  return axios.put(`${url}/${tableName}/active/${id}`).catch((error) => {
    return error;
  });
};

//use for add order supplier popup
//in folder "popup for add and edit"

export const getByRow = (tableName: string, id: any) => {
  return axios.get(`${url}/${tableName}/${id}`).catch((error) => {
    return Promise.reject(error);
  });
};

export const addItemsToOrderTables = async (tableName: string, data: any) => {
  try {
    const response = await axios.post(
      `${url}/${tableName}/new`,
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return 
  } catch (error: any) {
    console.error("Error in addItemsToOrderTables:", error);
    console.log("Error response:", error.response);
    return Promise.reject(error);
  }
};

export const getSupplierNamesForProduct = (productId: number) => {
  return axios
    .get(`${url}/products/getSupplierNames/${productId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error:", error.message);
      throw error;
    });
};

export const updateProductSupplier = async (
  productId: number,
  updatedVendorIds: number[]
) => {
  try {
    const response = await axios.post("/updateProductSupplier", {
      productId,
      updatedVendorIds,
    });
    console.log(response.data);
  } catch (error: any) {
    console.error(
      "Error updating product vendors:",
      error.response ? error.response.data : error.message
    );
  }
};

export const updateProducts = (tableName: string, data: any, row: any) => {
  return axios
    .put(`${url}/${tableName}/update`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .catch((error) => {
      return error;
    });
};

export const updateLink = (tableName: string, data: any) => {
  console.log(data[0].product_id);
  return axios
    .put(
      `${url}/${tableName}/updateLinkTable/${data[0].product_id}`,
      JSON.stringify({data: data}),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .catch((error) => {
      return error;
    });
};
