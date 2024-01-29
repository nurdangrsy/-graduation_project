import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
  //sepet işlemleri için CartContext'ten setCartItems fonksiyonunu aldı
  const { setCartItems } = useContext(CartContext);

  //sepeti sıfırlamak için useEffect kullanıldı
  useEffect(() => {
    // Alışveriş sepetini sıfırla
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary" style={{
                background:"blue",
              }}>Ana Sayfa</Button>,
            </Link>,
            <a href="/admin/orders" key={"order"}>
                <Button key="buy">Siparişlerim</Button>
                </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;