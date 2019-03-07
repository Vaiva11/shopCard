import React from "react";
import PropTypes from "prop-types";
import { ProductCard, ProductsContainer } from "../../components";

function Shop({ products, toggleFavorite, updateCartCount }) {
  return (
    <div className="ProductsContainer">
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          toggleFavorite={toggleFavorite}
          updateCartCount={updateCartCount}
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
  updateCartCount: PropTypes.func.isRequired,
};
// Shape pasiekia arejaus objektus

Shop.defaultProps = {
  products: [],
};

export default Shop;
