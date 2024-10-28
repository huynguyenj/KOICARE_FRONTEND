import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const iconStyle = {
    margin: "0 15px",
    cursor: "pointer",
    transition: "color 0.3s ease",
    color: "#fff",
  };

  const socialIconsStyle = {
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    margin: "20px"
  };

  const fontStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "JetBrains Mono",
  };

  const footerStyle = {
    backgroundColor: "#212121",
    padding: "20px",
    color: "#fff",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <footer style={footerStyle}>
      <div className="row">
        <div
          className="d-flex justify-content-around align-items-center"
          style={fontStyle}
        >
          <div style={{ fontFamily: "JetBrains Mono", fontSize: "15px" }}>
            &copy; 2024 Bảo lưu mọi quyền, Koiday&reg;
            <br />
            Chính sách quyền riêng tư | Điều khoản
          </div>
          <div className="social-icons" style={socialIconsStyle}>
            <a>
              <i style={iconStyle}>
                <FontAwesomeIcon icon={faFacebook} />
              </i>
            </a>
            <a>
              <i style={iconStyle}>
                <FontAwesomeIcon icon={faTelegram} />
              </i>
            </a>
            <a>
              <i style={iconStyle}>
                <FontAwesomeIcon icon={faPinterest} />
              </i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;