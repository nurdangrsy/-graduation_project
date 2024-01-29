import React, { useContext } from "react";
import PropTypes from "prop-types";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { CartContext } from "../../context/CartProvider";
import "./ProductItem.css";  

const TatlıItem = ({ tatlıItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === tatlıItem._id
  );

  const originalPrice = tatlıItem.price.current;
  const discountPercentage = tatlıItem.price.discount;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <div className="product-item">
      <div className="product-image">
        <a href=" #">
          <img src={tatlıItem.img[0]} alt="" className="img1" />
          <img src={tatlıItem.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href=" #" className="product-title">
          {tatlıItem.name}
        </a>
        
        <div className="product-prices">
          <strong className="new-price">{discountedPrice.toFixed(2)}₺</strong>
          <span className="old-price">{originalPrice.toFixed(2)}₺</span>
        </div>
        <span className="product-discount">-{tatlıItem.price.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({
                ...tatlıItem,
                price: discountedPrice,
              })
            }
            disabled={filteredCart}
          >
            <i> <AddShoppingCartIcon/></i>
          </button>
          <a href=" #">
            <i><ShareIcon/></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TatlıItem;

TatlıItem.propTypes = {
  tatlıItem: PropTypes.object,
};
