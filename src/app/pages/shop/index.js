import React from "react";
import PropTypes from "prop-types";
import { ProductCard, ProductsContainer } from "../../components";

function Shop({
  products,
  toggleFavorite,
  updateCartCount,
  history,
  login,
  logout,
  allow,
  location,
}) {
  const intended = location.state && location.state.intendedLocation;
  return (
    <div>
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

      {allow && (
        <button type="button" onClick={() => history.push("/cart")}>
          Go to checkout
        </button>
      )}
      <button
        type="button"
        onClick={() => (allow ? logout() : login(intended))}
      >
        {allow ? "logout" : "login"}
      </button>
    </div>
  );
}

Shop.propTypes = {
  history: PropTypes.shape({}).isRequired,
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
