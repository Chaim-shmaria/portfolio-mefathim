import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import React from "react";
import { Suppliers } from "./components/suppliers/suppliers";
import SupplierTab from "./components/suppliers/supplierTab";

import RestaurantFloor from "components/restaurantFloor/RestaurantFloor";
import { Inventory } from "./components/inventory/Inventory";
import SupplierOrder from "./components/supplierOrder/supplierOrder";
import WorkDay from "./components/workDay/WorkDay";
import PlaceAnOrder from "./components/order/NewOrder";
import { Users } from "./components/users/usersTable";
import SafeRoutes from "./components/SafeRouting";
import Menu from "./components/menu/Menu";
import Products from "./components/product/productTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="manager" element={<SafeRoutes roles={["מנהל"]} />}>
          <Route index element={<Navigate to={"users"} />} />
          <Route path="users" element={<Users />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="supplier_order" element={<SupplierOrder />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/:id/:collection" element={<SupplierTab />} />
          <Route path="products" element={<Products />} />
          <Route path="menu" element={<Menu />} />
        </Route>

        <Route
          path="work_day"
          element={
            <SafeRoutes roles={[]}>
              <WorkDay />
            </SafeRoutes>
          }
        >
          <Route index element={<RestaurantFloor />} />
          <Route path="order" element={<PlaceAnOrder />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
