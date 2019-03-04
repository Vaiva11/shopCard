import React from "react";
import PropTypes from "prop-types";
import "./Shop.css";

function Shop({ products }) {
  return (
    <div className="cards">
      {products.map(product => (
        <div className="card">
          <p key={product.id}>
            <img src={product.image} alt={product.name} />
            <p id="inLine">
              <h1>Name:</h1>
              {product.name}
            </p>
            <p id="inLine">
              <h1>Price:</h1>
              {product.price}
            </p>
            <p id="inLine">
              <h1>currencySymbol:</h1>
              {product.currencySymbol}
            </p>
            <button type="button">Add to cart 📦</button>
            <button type="button">Add to fav 💜</button>
          </p>
        </div>
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
};
// Shape pasiekia arejaus objektus

Shop.defaultProps = {
  products: [],
};

export default Shop;
