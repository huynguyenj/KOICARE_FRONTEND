import React from 'react';
import './ShowProducts.css';
import ShopD from "../../../components/Drawers/Shop"
import FooterEnd from '../../../components/Footer/FooterEnd';

const ShowProduct = () => {
  return (
    <div className="app-container">
      <ShopD/>
      
      <div className="main-content">
        <div className="header">
          <h1>Tất cả sản phẩm</h1>
          <div className="action-buttons">
            <button>Thêm sản phẩm</button>
            <button>Xóa sản phẩm</button>
            <button>Cập nhật</button>
          </div>
          <input type="text" placeholder="Tìm kiếm sản phẩm" className="search-bar"/>
        </div>

        <div className="product-list">
          {Array(5).fill(null).map((_, index) => (
            <div className="product-item" key={index}>
              <input type="checkbox" />
              <div className="product-info">
                <h2>Tên sản phẩm</h2>
                <p>Nội dung sản phẩm</p>
              </div>
              <div className="product-meta">
                <p>Giá: XXX.000đ</p>
                <p>Đánh giá: {Math.random() * 5}.0 ★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterEnd/>
    </div>
  );
}

export default ShowProduct;
