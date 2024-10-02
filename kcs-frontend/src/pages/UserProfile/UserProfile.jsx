import React, { useState } from "react";
import "./UserProfile.css";
import Sidebar from "../../components/Sidebar/Sidebar"

function UserProfile() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      gender: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="user-profile-container">
      <Sidebar />
      <div className="user-profile">
        <div className="profile-info">
          <img className="avatar" src="/path/to/avatar.png" alt="User avatar" />
          <h3>Tên tài khoản đăng ký</h3>
          <p>Thay đổi ảnh đại diện</p>
        </div>
        <div className="profile-actions">
          <button className="btn btn-home">Trang chủ</button>
          <button className="btn btn-logout">Đăng xuất</button>
        </div>
        <ul className="menu">
          <li>Chỉnh sửa tài khoản</li>
          <li>Cá yêu thích</li>
          <li>Sản phẩm đã mua</li>
          <li>Liên kết xã hội</li>
          <li>Đổi mật khẩu</li>
        </ul>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Giới tính</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="btn btn-reset"
                onClick={handleReset}
              >
                Tải lại
              </button>
              <button type="submit" className="btn btn-save">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
