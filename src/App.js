import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
import { handleUserLogout } from "./redux/action/auth";
import { showConfirmation } from "./utils";
import Home from "./view/Home";
import CategoriesList from "./view/categories";
import Cart from "./view/categories/cart";
import ProductsList from "./view/categories/products";
import LoginPage from "./view/login";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.cart);

  const logoutHandler = useCallback(async () => {
    return showConfirmation({ text: "you want to logout?" }).then(async (e) => {
      if (e.isConfirmed) {
        try {
          await handleUserLogout();
        } catch (e) {}
      }
    });
  }, [handleUserLogout]);

  const onCartButtonClick = () => {
    return navigate("/cart");
  };

  return (
    <>
      {isLoggedIn && (
        <Navbar color="light" className="mb-3">
          <NavbarBrand>
            Harsh Patel E-Commerce App
            <br />
            <Nav className="d-flex flex-row gap-3 me-auto" navbar>
              <NavItem
                tag={Link}
                className="text-reset text-light-emphasis text-decoration-none"
                to="/home/"
              >
                Home
              </NavItem>
              <NavItem
                tag={Link}
                className="text-reset text-light-emphasis text-decoration-none"
                to="/categories/"
              >
                Categories
              </NavItem>
            </Nav>
          </NavbarBrand>

          <Nav
            className="ml-auto d-flex flex-row align-items-center gap-5"
            navbar
          >
            <Button
              onClick={onCartButtonClick}
              color="primary"
              className="ms-auto"
            >
              Cart : {cartProducts.length}
            </Button>

            <NavItem onClick={logoutHandler} className="cursor-pointer">
              Logout
            </NavItem>
          </Nav>
        </Navbar>
      )}
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isLoggedIn ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route
            path="*"
            element={
              !isLoggedIn ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          {!isLoggedIn ? (
            <Route path="/login" element={<LoginPage />} />
          ) : (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/categories" element={<CategoriesList />} />
              <Route
                exact
                path="/categories/:category"
                element={<ProductsList />}
              />
              <Route exact path="/cart" element={<Cart />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
