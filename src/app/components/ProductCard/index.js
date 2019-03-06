import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function ProductCard({
  id,
  image,
  name,
  price,
  currencySymbol,
  isFavorite,
  cartCount,
  updateCartCount,
  toggleFavorite,
}) {
  return (
    <div className="card">
      <p key={id}>
        <img src={image} alt={name} />
        <p id="inLine">
          <h1>Name:</h1>
          {name}
        </p>
        <p id="inLine">
          <h1>Price:</h1>
          {price}
        </p>
        <p id="inLine">
          <h1>currencySymbol:</h1>
          {currencySymbol}
        </p>
        <p id="inLine">
          <input
            type="number"
            min={0}
            onChange={e => {
              updateCartCount(id, e.target.value);
            }}
            value={cartCount}
          />
          <button type="button" onClick={() => toggleFavorite(id)}>
            {isFavorite ? "💔" : "💖"}
          </button>
        </p>
      </p>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFavorite: PropTypes.string.isRequired,
  cartCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

export default ProductCard;
