import React from 'react';
import './NavbarShop.css'; // Đảm bảo rằng bạn đã tạo file CSS

function NavbarShop() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="favicon.ico" alt="Koiday Logo" className="koi-logo" />
      </div>
      <div className="navbar-user">
        <img src="Avatar.jpg" alt="User Icon" className="user-icon" />
        <span>xin chào admin</span>
      </div>
    </div>
  );
}

export default NavbarShop;
