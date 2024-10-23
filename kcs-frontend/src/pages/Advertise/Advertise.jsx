import React, { useState } from "react";
import "./Advertise.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";

const Advertise = () => {
  // State for the status color of each promotion
  const [promotionStatuses, setPromotionStatuses] = useState({
    firstItem: "green",
    secondItem: "red",
  });

  // Function to toggle the status color
  const toggleStatusColor = (item) => {
    setPromotionStatuses((prevStatuses) => ({
      ...prevStatuses,
      [item]: prevStatuses[item] === "green" ? "red" : "green", 
    }));
  };

  return (
    <div className="promotions-container">
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
      <div>
        <p2 className="Title-of-page">Tất cả các bài khuyến mãi</p2>
      </div>
      <div className="promotion-list">
        <div className="promotion-item">
          <div className="promotion-header">
            <span>Tháng 9</span>
            <span className="promotion-title">
              Trung thu và cá - deal hot cho những sản phẩm đang có mặt tại shop
              (giảm 20%)
            </span>
            <span
              className={`status-dot ${promotionStatuses.firstItem}`}
              onClick={() => toggleStatusColor("firstItem")}
            ></span>
          </div>
          <img
            src="Advertise-image.png"
            alt="Koi Promotion"
            className="promotion-img"
          />
        </div>

        <div className="promotion-item">
          <div className="promotion-header">
            <span>Tháng 2</span>
            <span className="promotion-title">
              Cá chép hóa rồng - giảm giá toàn bộ sản phẩm kích thích tăng
              trưởng cho cá (giảm 10%)
            </span>
            <span
              className={`status-dot ${promotionStatuses.secondItem}`}
              onClick={() => toggleStatusColor("secondItem")}
            ></span>
          </div>
          <img
            src="Advertise-image.png"
            alt="Koi Promotion"
            className="promotion-img"
          />
        </div>
      </div>
      <div className="btn-add">
        <button className="add">Thêm bài đăng</button>
      </div>
      <FooterEnd />
    </div>
  );
};

export default Advertise;
