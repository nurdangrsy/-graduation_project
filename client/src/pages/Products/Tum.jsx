import React, { useEffect, useState } from "react";
import { message } from "antd";
import TumItem from "./TumItem";
import './Products.css'

const Tum = ({ id }) => {
  // Tüm ürünlerin tutulacağı state
  const [tum, setTum] = useState([]);

  useEffect(() => {
    // Tüm ürün verilerini getiren fonksiyon
    const fetchProducts = async () => {
      try {
        // Başarılı bir şekilde veri alındıysa, JSON formatında parse et ve state'i güncelle
        const response = await fetch(`http://localhost:5000/api/products`);
        if (response.ok) {
          const data = await response.json();
          setTum(data);
        } else {
          message.error("Veri Getirme Başarısız");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Tüm Ürünler</h2>
        </div>
        <div className="product-wrapper ">
          {/* Tüm ürünlerin her birini temsil eden alt bileşenlerin listesi */}
          {tum.map((tum) => (
            <TumItem tumItem={tum} key={tum._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tum;
