import React, { useState } from "react";
import "./Status_Products.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";

const Status_Products = () => {
  return (
    <div className="Status_Products-container">
      <ShopD />
      <div className="filter-bar">
        <label>Từ</label>
        <input type="date" />
        <label>Đến</label>
        <input type="date" />
        <select className="sort-select">
          <option>Sắp xếp</option>
          <option>Gần nhất</option>
          <option>Xa nhất</option>
        </select>
        <select className="status-select">
          <option>Trạng thái</option>
          <option>Đang hoạt động</option>
          <option>Ngưng hoạt động</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="search-bar"
        />
        <button className="btn-display">
          <p4 className="btn-show">Hiển thị</p4>
        </button>
      </div>
      <FooterEnd />
    </div>
  );
};

export default Status_Products;
