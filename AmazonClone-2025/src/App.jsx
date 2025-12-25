import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Layout/Header/Header";
import Payment from "./pages/Payments/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Result from "./pages/Results/Result";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import PageNotFound from "./components/Layout/PageNotFound/PageNotFound";
import Auth from "./pages/Auth/Auth";
import { auth } from "./Utility/firebase";
import { context } from "./Utility/Reducer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { state, dispatch } = useContext(context);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({ type: "ADD_USER", user: authuser });
      } else {
        dispatch({ type: "ADD_USER", user: null });
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="category/:id" element={<Result />} />
          <Route path="product/:productid" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="payments"
            element={
              <ProtectedRoute
                redirect={"/payments"}
                msg={"You need to login to proceed to payment"}
              >
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute
                redirect={"/orders"}
                msg={"You need to login to view your orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
