import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import { getCategoryProductsList } from "../../../redux/action/products";
import { ADD_TO_CART } from "../../../redux/actionTypes/cart";
import ProductCard from "./ProductCard";

const perPage = 5;
const ProductsList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);

  const defaultProductApiState = { sort: "asc" };
  const [productApiState, setProductApiState] = useState(
    defaultProductApiState
  );

  const totalPages = Math.ceil(productsData.length / perPage);

  useEffect(() => {
    let mountComponent = true;

    const initialFetch = async () => {
      try {
        setLoading(true);
        const productsListRes = await getCategoryProductsList({
          category,
          productApiState,
        });

        if (productsListRes.length && mountComponent) {
          setProductsData(productsListRes);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    initialFetch();

    return () => {
      mountComponent = false;
    };
  }, [productApiState]);

  const onAddToCartClick = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const handleProductSorting = (e) => {
    const sortType = e.target.value;
    setProductApiState((prevState) => {
      return { ...prevState, sort: sortType };
    });
  };

  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const renderProducts = useCallback(() => {
    if (!productsData.length) {
      return (
        <Col className="text-center text-light m-auto">
          There is no products available
        </Col>
      );
    }

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const filteredData = productsData.slice(startIndex, endIndex);
    return (
      <>
        {filteredData?.map((product) => {
          return (
            <Col key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                onAddToCart={onAddToCartClick.bind(null, product)}
              />
            </Col>
          );
        })}
      </>
    );
  }, [productsData, currentPage]);

  return (
    <Container>
      <Row className="bg-light rounded-2 bg-dark-subtle p-2 mb-3">
        <Col>
          <Input
            style={{ width: "200px" }}
            type="select"
            id="sortSelect"
            name="sortSelect"
            onChange={handleProductSorting}
          >
            <option>asc</option>
            <option>desc</option>
          </Input>
        </Col>
      </Row>
      <Row xs={1} md={3} xl={4}>
        {isLoading ? (
          <Col className="text-light text-center m-auto">
            <Spinner />
          </Col>
        ) : (
          renderProducts()
        )}
      </Row>

      <Row className="bg-light rounded-2 bg-dark-subtle p-2 mb-3">
        <Col className="d-flex">
          <div className="ms-auto d-flex gap-1">
            <Button
              color="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <Button
              color="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsList;
