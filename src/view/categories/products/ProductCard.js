import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

const ProductCard = (props) => {
  const { title, price, description, image, onAddToCart } = props;

  return (
    <Card className="my-3 overflow-hidden">
      <CardImg
        alt="Card"
        style={{ height: "300px" }}
        className="img-thumbnail object-fit-cover"
        src={image}
      />
      <CardBody>
        <CardTitle tag="h5" className="two-line-text-truncate">
          {title}
        </CardTitle>
        <CardText className="h5">$ {price}</CardText>
        <CardText className="five-line-text-truncate">{description}</CardText>
      </CardBody>

      <CardBody className="d-flex">
        <Button onClick={onAddToCart} color="primary" className="ms-auto">
          Add to cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
