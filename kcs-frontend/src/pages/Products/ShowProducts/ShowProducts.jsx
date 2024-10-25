import React from 'react';
import './ShowProducts.css';
import ShopD from "../../../components/Drawers/Shop";
import FooterEnd from '../../../components/Footer/FooterEnd';

const ShowProduct = () => {
  return (
    <div className="app-container">
      {/* <ShopD/> */}
      <div className="top-actions">
        <button className="action-btn">Thêm sản phẩm</button>
        <button className="action-btn">Xóa sản phẩm</button>
        <button className="action-btn">Sửa sản phẩm</button>
      </div>
      <div className="title-product">
          <h2>Tất cả Sản Phẩm</h2>
        </div>
      <div className="main-content">
        <div className="title-showproduct">
          <p></p>
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
