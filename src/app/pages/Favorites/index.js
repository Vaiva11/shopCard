import React from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../../components";

function Favorites({ products, toggleFavorite }) {
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
