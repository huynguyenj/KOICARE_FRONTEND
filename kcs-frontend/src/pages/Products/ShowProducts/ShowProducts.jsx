import React, { useState } from 'react';
import './ShowProducts.css';
import NavbarShop from '../../../components/NavbarShop/NavbarShop';

function ShowProducts() {
  const [products, setProducts] = useState([
    { name: "Tên sản phẩm 1", content: "Nội dung sản phẩm", price: "XXX.000", rating: 4.5 },
    { name: "Tên sản phẩm 2", content: "Nội dung sản phẩm", price: "XXX.000", rating: 4.8 },
    { name: "Tên sản phẩm 3", content: "Nội dung sản phẩm", price: "XXX.000", rating: 3 },
    { name: "Tên sản phẩm 4", content: "Nội dung sản phẩm", price: "XXX.000", rating: 4.1 }
  ]);

  return (
    <div className="App">
      <header>
        <NavbarShop/>
      </header>

      <div className="actions">
        <div className="controll">
          <button>Thêm sản phẩm</button>
          <button>Xoá sản phẩm</button>
          <button>Cập nhật</button>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Nhập tên sản phẩm" />
          <button>Tìm kiếm</button>
        </div>
      </div>

      

      <div className="product-section">
        <h2 className="product-header">Tất cả sản phẩm</h2>
        <div className="product-list">
          {products.map((product, index) => (
            <div className="product-item" key={index}>
              <input type="checkbox" />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-content">{product.content}</div>
              </div>
              <div className="product-price">Giá: {product.price}đ</div>
              <div className="product-rating">
                Đánh giá: {product.rating} <span>⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowProducts;
