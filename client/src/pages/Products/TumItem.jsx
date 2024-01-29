import React, { useContext } from "react";
import PropTypes from "prop-types";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { CartContext } from "../../context/CartProvider";
import "./ProductItem.css";  

const TumItem = ({ tumItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === tumItem._id
  );

  const originalPrice = tumItem.price.current;
  const discountPercentage = tumItem.price.discount;

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <div className="product-item">
      <div className="product-image">
        <a href=" #">
          <img src={tumItem.img[0]} alt="" className="img1" />
          <img src={tumItem.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href=" #" className="product-title">
          {tumItem.name}
        </a>
        
        <div className="product-prices">
          <strong className="new-price">{discountedPrice.toFixed(2)}₺</strong>
          <span className="old-price">{originalPrice.toFixed(2)}₺</span>
        </div>
        <span className="product-discount">-{tumItem.price.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({
                ...tumItem,
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

export default TumItem;

TumItem.propTypes = {
  tumItem: PropTypes.object,
};
