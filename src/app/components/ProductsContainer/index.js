import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function ProductsContainer({ children, className }) {
  return <div className={`ProductsContainer ${className}`}>{children}</div>;
}

ProductsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ProductsContainer.defaultProps = {
  className: "",
};

export default ProductsContainer;
