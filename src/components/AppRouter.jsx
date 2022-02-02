import React from "react";     
import { Route, Routes } from "react-router-dom";  
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories"; 
import AddCategory from "../pages/AddCategory"; 
import CategoryId from "../pages/CategoryId";
import TransactionId from "../pages/TransactionId";
import AddTransaction from "../pages/AddTransaction";
import Report from "../pages/Report";
import ReportByCategories from "../pages/ReportByCategories";
import ReportByCost from "../pages/ReportByCost";
function AppRouter() {
  return(  
  <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} /> 
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-transaction" element={<AddTransaction />} /> 
        <Route path="/edit/:id" element={<CategoryId/>} />
        <Route path="/edit-transaction/:id" element={<TransactionId/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/report-by-categories" element={<ReportByCategories />} />
        <Route path="/report-by-cost" element={<ReportByCost />} />


      </Routes>  
  );
}

export default AppRouter;
