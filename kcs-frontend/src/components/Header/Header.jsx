// Header.jsx
import "./Header.css";

function Header() {
  return (
    <>
    <div className="grid-container button-overlay" style={{width:'100%'}}>
        <video
          style={{width:'100%'}}
          autoPlay
          loop
          muted
          playsInline
          src="./videoplayback.mp4"
          className="header-video"
        ></video>
        {/* <button>TAKE CARE NOW !!!</button> */}
      </div>
    </>
  );
}

export default Header;
