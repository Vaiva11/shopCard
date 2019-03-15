import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProductCard } from "../../components";

function Shop({ products, toggleFavorite, updateCartCount }) {
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
    </div>
  );
}

Shop.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    products: state.shop.products,
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
