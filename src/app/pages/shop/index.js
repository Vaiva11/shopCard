import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import { ProductCard } from "../../components";

function Shop({ products, toggleFavorite }) {
  return (
    <div className="cards">
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

Shop.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  toggleFavorite: PropTypes.func.isRequired,
};
// Shape pasiekia arejaus objektus

Shop.defaultProps = {
  products: [],
};

export default Shop;
