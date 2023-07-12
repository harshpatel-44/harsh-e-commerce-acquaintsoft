import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardTitle, Col, Container, Row, Spinner } from "reactstrap";
import { getCategoriesList } from "../../redux/action/products";

const CategoriesList = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [categoriesListData, setCategoriesListData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let mountComponent = true;

    const initialFetch = async () => {
      try {
        setLoading(true);
        const categoriesListRes = await getCategoriesList();

        if (categoriesListRes.length && mountComponent) {
          setCategoriesListData(categoriesListRes);
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
  }, []);

  const onCategoryClick = (category) => {
    const path = location.pathname.split("/")[1];

    navigate("/" + path + "/" + category);
  };

  const renderCategories = useCallback(() => {
    if (!categoriesListData.length) {
      return (
        <Col className="text-center text-light m-auto">
          There is no data available
        </Col>
      );
    }

    return (
      <>
        {categoriesListData?.map((category) => {
          return (
            <Col key={category}>
              <Card
                onClick={onCategoryClick.bind(null, category)}
                className="d-flex justify-content-center align-items-center py-5 px-2 my-2 font-decoration-none cursor-pointer"
              >
                <CardTitle className="h4 m-0">{category}</CardTitle>
              </Card>
            </Col>
          );
        })}
      </>
    );
  }, [categoriesListData, location]);

  return (
    <Container>
      <Row xs={1} md={2} xl={4}>
        {isLoading ? (
          <Col className="text-light text-center m-auto">
            <Spinner />
          </Col>
        ) : (
          renderCategories()
        )}
      </Row>
    </Container>
  );
};

export default CategoriesList;
