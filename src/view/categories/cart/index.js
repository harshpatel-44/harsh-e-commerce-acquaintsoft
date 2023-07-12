import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../../../redux/actionTypes/cart";
import { showConfirmation } from "../../../utils";

const Cart = () => {
  const { cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onAddToCartClick = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const onRemoveFromCartClick = (product) => {
    dispatch({ type: REMOVE_FROM_CART, payload: product });
  };

  const onClearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const cartTotalItems = cartProducts.reduce(
    (acc, item) => (acc += +item.noOfProducts),
    0
  );

  const cartTotalAmount = cartProducts.reduce(
    (acc, item) => (acc += +item.product.price * item.noOfProducts),
    0
  );

  const onOrderSubmit = () => {
    showConfirmation({ text: "you want to submit order?" }).then((e) => {
      if (e.isConfirmed) {
        onClearCart();
        Swal.fire({
          title: "Ordered Successfully!",
          icon: "success",
        });
      }
    });
  };

  const Product = (data) => {
    const {
      image,
      title,
      price,
      description,
      onAddToCart,
      noOfProducts,
      onRemoveFromCart,
    } = data;
    return (
      <Card className="my-3 overflow-hidden">
        <Row className=" d-flex flex-row">
          <Col sm={4}>
            <CardImg
              alt="Card"
              style={{ height: "300px" }}
              className="img-thumbnail object-fit-cover"
              src={image}
            />
          </Col>
          <Col sm={8}>
            <CardBody>
              <CardTitle tag="h5" className="two-line-text-truncate">
                {title}
              </CardTitle>
              <CardText>
                <span className="h5">$ {price}</span>{" "}
                <span className="d-inline-flex align-items-center ms-3 gap-3">
                  <Button
                    onClick={onRemoveFromCart}
                    color="danger"
                    className="ms-auto p-1 py-0"
                  >
                    -
                  </Button>
                  {noOfProducts}
                  <Button
                    onClick={onAddToCart}
                    color="primary"
                    className="ms-auto p-1 py-0"
                  >
                    +
                  </Button>
                </span>
              </CardText>
              <CardText className="five-line-text-truncate">
                {description}
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Row>
      <Col sm={cartProducts?.length ? 8 : 12}>
        {cartProducts?.length ? (
          cartProducts.map((item) => {
            const { product, noOfProducts } = item;
            return (
              <Product
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                noOfProducts={noOfProducts}
                onAddToCart={onAddToCartClick.bind(null, product)}
                onRemoveFromCart={onRemoveFromCartClick.bind(null, product)}
              />
            );
          })
        ) : (
          <div className="text-center text-light m-auto">
            Your cart is empty
            <Button tag={Link} to="/categories" className="ms-3" color="light">
              Shop
            </Button>
          </div>
        )}
      </Col>
      {!!cartProducts?.length && (
        <Col sm={4} className="pt-3">
          <Button onClick={onClearCart} color="danger" className="mb-3">
            Clear Cart
          </Button>
          <Card className=" py-3 px-3">
            <CardTitle>
              Total Items : <b>{cartTotalItems}</b>
            </CardTitle>
            <CardTitle>
              Total Amount : <b>{cartTotalAmount} $</b>
            </CardTitle>
            <Button onClick={onOrderSubmit} color="primary">
              Submit Order
            </Button>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default Cart;
