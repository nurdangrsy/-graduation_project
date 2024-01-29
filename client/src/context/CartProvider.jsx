import {createContext,useEffect, useState} from "react";
import PropTypes from "prop-types";

// Sepet bilgilerini içerecek olan context'i oluştur
export const CartContext = createContext();


const CartProvider = ({children}) => {
  // Sepet öğelerini depolayan state
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  // useEffect ile cartItems değiştiğinde localStorage'a güncelleniyor
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete yeni ürün ekleme fonksiyonu
  const addToCart = (cartItem) => {
    const existingItemIndex = cartItems.findIndex((item) => item._id === cartItem._id);

    if (existingItemIndex !== -1) {
      // Eğer ürün zaten sepette varsa miktarını artır
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + (cartItem.quantity || 1) }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Eğer ürün sepette yoksa yeni bir öğe olarak ekle
      setCartItems((prevCart) => [
        ...prevCart,
        {
          ...cartItem,
          quantity: cartItem.quantity ? cartItem.quantity : 1,
        },
      ]);
    }
  };
 // Sepette ürün silme fonksiyonu
  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });

    setCartItems(filteredCartItems);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    // Yeni miktarı kullanarak cartItems'i güncelle
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };
  const clearCart = () => {
    // Sepeti temizleme işlemleri
    setCartItems([]);
  };
  return(
    // CartContext.Provider içine değerleri yerleştir
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
      >
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider

CartProvider.prototype = {
  children: PropTypes.node
}