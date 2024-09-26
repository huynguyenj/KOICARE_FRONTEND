import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const navigator = useNavigate();

  function login() {
    navigator("/login");
  }

  function register() {
    navigator("/register");
  }

  return (
    <>
      <nav className="navbar d-flex">
        <Link to="/">
          <img
            className="logo ms-5"
            src="/Logo.png"
            alt=""
            style={{ maxWidth: "150px" }}
          />
        </Link>
        <div className="navbar-right d-flex ms-auto align-items-center">
          {/* Anchor links to scroll to sections on the homepage */}
          <a
            href="#about"
            className="nav-item ms-4"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Thông tin chung
          </a>
          <a
            href="#blog"
            className="nav-item ms-4"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Tin tức và blog
          </a>
          {/* User and Cart Icons */}
          <a className="nav-item ms-4" href="#">
            <FontAwesomeIcon icon={faUserTie} style={{ color: "#ffffff" }} />
          </a>
          <a className="nav-item ms-4" href="#">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "#ffffff" }}
            />
          </a>
          {/* Login/Register Buttons */}
          <div
            className="log-part ms-4 me-4"
            style={{ fontFamily: "JetBrains Mono", marginBottom: "5px" }}
          >
            <button className="login-link" onClick={login}>
              Đăng nhập
            </button>{" "}
            /
            <button className="login-link" onClick={register}>
              &nbsp;Đăng ký
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
