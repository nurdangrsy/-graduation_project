import React, { useEffect, useState } from "react";
import { message } from "antd";
import SıcakItem from "./SıcakItem";
import './Products.css'
import { useParams } from "react-router-dom";

const Sıcak = () => {
// useParams kullanarak URL'den alınan kategori kimliğini elde etme
  const { id: categoryId } = useParams();
  console.log(categoryId);
  // Sıcak içeceklerin tutulacağı state
  const [sıcak, setSıcak] = useState([]);

  useEffect(() => {
    // Belirli kategoriye ait sıcak içecek verilerini getiren fonksiyon
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
        if (response.ok) {
          // Başarılı bir şekilde veri alındıysa, JSON formatında parse et ve state'i güncelle
          const data = await response.json();
          setSıcak(data);
        } else {
          message.error("Veri Getirme Başarısız");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
   // Sayfa yüklendiğinde sıcak içecekleri getirme işlemini başlat
    fetchProducts();
  },[`http://localhost:5000` , categoryId]);  // useEffect'in bağımlılıkları arasına categoryId eklenmiş

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Sıcak İçecekler</h2>
        </div>
        <div className="product-wrapper ">
          {/* Sıcak içeceklerin her birini temsil eden alt bileşenlerin listesi */}
          {sıcak.map((sıcak) => (
            <SıcakItem sıcakItem={sıcak} key={sıcak._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sıcak;
