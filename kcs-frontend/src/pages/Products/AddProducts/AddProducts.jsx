import React, { useState } from "react";
import './AddProducts.css';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [productContent, setProductContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ productName, productPrice, productType, productContent });
  };

  return (
    <>
      <header className="header">
        <img src="logo.png" alt="Koiday logo" />
        <div className="header-icons">
          <i className="fa fa-globe" title="Language"></i>
          <i className="fa fa-shopping-cart" title="Cart"></i>
          <i className="fa fa-user" title="Profile"></i>
        </div>
      </header>

      <div className="container">
        <h2>Thêm sản phẩm</h2>
        
        <div className="product-image">
          <img src="product-image.png" alt="Product" />
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Tên sản phẩm" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />

          <input 
            type="text" 
            placeholder="Giá sản phẩm" 
            value={productPrice} 
            onChange={(e) => setProductPrice(e.target.value)} 
          />

          <input 
            type="text" 
            placeholder="Loại mặt hàng" 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)} 
          />

          <textarea 
            placeholder="Nội dung sản phẩm" 
            value={productContent} 
            onChange={(e) => setProductContent(e.target.value)} 
          />

          <div className="actions">
            <button type="submit">Thêm sản phẩm</button>
            <div>
              <i className="fa fa-trash" title="Xoá sản phẩm"></i>
              <i className="fa fa-sync" title="Cập nhật"></i>
            </div>
          </div>
        </form>
      </div>

      <footer>
        <p>© 2024 Bảo lưu mọi quyền, Koiday®</p>
        <a href="#">Chính sách quyền riêng tư</a> | <a href="#">Điều khoản</a>
      </footer>
    </>
  );
};

export default AddProducts;
