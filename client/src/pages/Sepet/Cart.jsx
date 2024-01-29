import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

const Cart = () => {
  // CartContext'ten sepet bilgilerini almak için useContext hook'u kullanılıyor
  const { cartItems } = useContext(CartContext);
  return (
    <section className="cart-page">
      <div className="container">
     {/* Eğer sepette ürün varsa, sepet içeriğini göster */}
      {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          
          </div>
       ) : (
       <b> <h1>Sepette hiç ürün yok!</h1></b>
      )}
      </div>
    </section>
  );
};

export default Cart;