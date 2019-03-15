import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { ProductsContainer } from "../../components";
import "./index.css";

function Cart({ products }) {
  const total = products.reduce((result, product) => {
    return result + product.price * product.cartCount;
  }, 0);
  return (
    <ProductsContainer className="Cart">
      {products.map(({ id, name, cartCount, price, image }) => {
        return (
          <div key={id} className="Cart-item">
            <div>
              <img src={image} alt={name} />
            </div>
            <div>
              <span>{name}</span>
            </div>
            <div>{price}</div>
            <div>{cartCount}</div>
            <div>{cartCount * price}</div>
          </div>
        );
      })}
      <div className="Total">{`Total: ${total}`}</div>
    </ProductsContainer>
  );
}

function mapStateToProps(state) {
  return {
    products: state.shop.products.filter(product => product.cartCount > 0),
  };
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default connect(mapStateToProps)(Cart);
