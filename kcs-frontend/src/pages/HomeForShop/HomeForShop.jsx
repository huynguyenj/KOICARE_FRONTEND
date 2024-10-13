import React from 'react';
import Footer from '../../components/Footer/Footer';
import './HomeForShop.css';

const HomeForShop = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="https://your-logo-url.com/logo.png" alt="Koiday Logo" />
        </div>
        <div className="menu">
          <i className="fas fa-globe"></i>
          <i className="fas fa-user"></i>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </header>

      <section className="banner">
        <div className="image-container">
          <img src="https://your-image-url1.com" alt="Garden" />
        </div>
        <div className="image-container">
          <img src="https://your-image-url2.com" alt="Koi Pond" />
        </div>
        <div className="image-container">
          <img src="https://your-image-url3.com" alt="Modern House" />
        </div>
      </section>

      <section className="category">
        <h2>Danh mục lựa chọn</h2>
        <div className="category-items">
          <div className="category-item">Sản phẩm</div>
          <div className="category-item">Đơn hàng</div>
          <div className="category-item">Khuyến mãi</div>
          <div className="category-item">Doanh thu</div>
          <div className="category-item">Trạng thái</div>
        </div>
      </section>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default HomeForShop;
