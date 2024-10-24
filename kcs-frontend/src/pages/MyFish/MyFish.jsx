import { Button, ButtonBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer1";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteFish, getAllFish } from "../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

function MyFishList() {
  const [heartIconClicked, setHeartIconClicked] = useState(false);

  // const [koiFishList, setKoiFishList] = useState([]);

  const koiFishList = [
    {
      fishId: 1,
      fishImg: "https://images.unsplash.com/photo-1583132648365-b3e4e0f8c8f7",
      fishName: "Kohaku Koi"
    },
    {
      fishId: 2,
      fishImg: "https://images.unsplash.com/photo-1583132648534-3f4eb6d4f374",
      fishName: "Showa Sanshoku"
    },
    {
      fishId: 3,
      fishImg: "https://images.unsplash.com/photo-1583132648476-f5c7cb875932",
      fishName: "Taisho Sanshoku"
    },
    {
      fishId: 4,
      fishImg: "https://images.unsplash.com/photo-1583132648412-5c75d0b9e1c1",
      fishName: "Asagi Koi"
    },
    {
      fishId: 5,
      fishImg: "https://images.unsplash.com/photo-1583132648498-d3d13e8e5a0e",
      fishName: "Shiro Utsuri"
    },
    {
      fishId: 6,
      fishImg: "https://images.unsplash.com/photo-1583132648387-6c69b55b6cd7",
      fishName: "Tancho Koi"
    },
    {
      fishId: 7,
      fishImg: "https://images.unsplash.com/photo-1583132648323-9c5c9f35b912",
      fishName: "Bekko Koi"
    },
    {
      fishId: 8,
      fishImg: "https://images.unsplash.com/photo-1583132648345-8ec453d4a084",
      fishName: "Chagoi Koi"
    }
  ];

  const style = {
    list: {
      textAlign: "center",
      position: "relative",
      fontFamily: "Arial",
      margin: "0",
      padding: "0",
    },
    hr: {
      width: "800px",
      textAlign: "center",
      margin: "0 auto",
      borderTop: "2px solid #000000",
    },
    button: {
      position: "relative",
      right: "20px",
      top: "25px",
    },
    fishName: {
      fontSize: "20px",
      fontFamily: "Arial",
    },
    moreInfo: {
      color: "black",
      textDecoration: "underline",
    },
  };

  const handleClick = () => {
    setHeartIconClicked(!heartIconClicked);
  };

  const location = useLocation();

  // useEffect(() => {
  //   getFishes();
  // }, [location]);

  // const getFishes = async () => {
  //   try {
  //     const res = await getAllFish();
  //     setKoiFishList(res.result);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Lấy dữ liệu thất bại!");
  //   }
  // };

  // const handleLogout = async (fishId) => {
  //   try {
  //     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa con cá này?");

  //     if (!confirmDelete) {
  //       return;
  //     }
  //     await deleteFish(fishId);
  //     toast.success("Xóa thành công");
  //     getFishes();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Xóa dữ liệu thất bại!");
  //   }
  // };

  return (
    <div>
      <ToastContainer />
      <div className="grid-container">
        <h1 style={style.list}>Danh sách cá của tôi</h1>
        <hr style={style.hr} />
        <div className="row" style={{ textAlign: "center" }}>
          {koiFishList.map((fish) => (
            <div className="col-md-3" key={fish.fishId}>
              <div className="container">
                <div className="row justify-content-center">
                  <div
                    style={{
                      width: "82%",
                      height: "200px",
                      overflow: "hidden",
                      margin: "20px 0",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={fish.fishImg}
                      alt={fish.fishName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-2" style={style.button}>
                    <Button
                      className="btn btn-light"
                      onClick={() => handleLogout(fish.fishId)}
                    >
                      <DeleteOutlineIcon style={{ color: "#000000" }} />
                    </Button>
                    <Button
                      className={`btn btn-light ${
                        heartIconClicked === true
                          ? "backgroundColor-#ff0000"
                          : "backgroundColor-#f9f9f9"
                      }`}
                      onClick={handleClick}
                    >
                      <FavoriteBorderIcon style={{ color: "#000000" }} />
                    </Button>
                    <Button className="btn btn-light">
                      <AddIcon style={{ color: "#000000" }} />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{ position: "relative", right: "25px", bottom: "15px" }}
              >
                <span style={style.fishName}>{fish.fishName}</span>
                <br />

                <Link component={Link} to={`/userhome/myfishlist/fishinfo/${fish.fishId}`} style={style.moreInfo}>Xem thông tin</Link>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MyFishList;
