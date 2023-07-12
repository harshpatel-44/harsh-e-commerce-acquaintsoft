import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Home = () => {
  return (
    <div>
      <Button tag={Link} to="/categories" className="ms-3" color="light">
        Go to Shop
      </Button>
    </div>
  );
};

export default Home;
