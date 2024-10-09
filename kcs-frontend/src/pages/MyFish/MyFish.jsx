import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MyFishList() {

  const [heartIconClicked, setHeartIconClicked] = useState(false);

  const style = {
    list: {
      textAlign: 'center', position: 'relative', top: '-10px', fontFamily: 'Arial'
    },
    hr: {
      width: '800px', textAlign: 'center', margin: '0 auto', borderTop: '2px solid #000000'
    },
    button: {
      position: 'relative', right: '20px', top: '25px'
    },
  }

  const handleClick = () => {
    setHeartIconClicked(!heartIconClicked)
  }

  return (
    <div>
      <h1 style={style.list}>Danh sách cá của tôi</h1>
      <hr style={style.hr} />
      <div className="row" style={{ textAlign: 'center' }}>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#000000'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
      </div>
      <div className="row" style={{ textAlign: 'center' }}>
      <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <img src="/KoiFish1.png" alt="Hình ảnh cá 1" style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
              <div className="col-2" style={style.button}>
                <Button className="btn btn-light">
                  <img src="/TrashCan.png" alt="Thùng rác" style={{ width: '70%' }} />
                </Button>
                <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                  <img src="/HeartIcon.png" alt="Trái tim" style={{ width: '25px' }} />
                </Button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
            <span style={{ fontSize: '20px' }}>Tên của cá</span><br />
            <Link style={{ color: 'black', textDecoration: 'underline' }}>Xem thông tin</Link>
          </div>
        </div>
      </div>

    </div>


  )
}


export default MyFishList