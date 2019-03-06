import React from "react";
import PropTypes from "prop-types";
import { ProductCard, ProductsContainer } from "../../components";

function Favorites({ products, toggleFavorite, updateCartCount }) {
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

Favorites.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  toggleFavorite: PropTypes.func.isRequired,
};
// Shape pasiekia arejaus objektus

Favorites.defaultProps = {
  products: [],
};

export default Favorites;
