import React from "react";
import { connect } from "react-redux";
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

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: id =>
      dispatch({ type: "TOGGLE_FAVORITE_PRODUCT", payload: id }),
    updateCartCount: (id, count) =>
      dispatch({ type: "UPDATE_PRODUCT_CARD_COUNT", payload: { id, count } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
