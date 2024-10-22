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

  const [koiFishList, setKoiFishList] = useState([]);

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

  useEffect(() => {
    getFishes();
  }, [location]);

  const getFishes = async () => {
    try {
      const res = await getAllFish();
      setKoiFishList(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
    }
  };

  const handleLogout = async (fishId) => {
    try {
      await deleteFish(fishId);
      toast.success("Xóa thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa dữ liệu thất bại!");
    }
  };

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
                        width: "90%",
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

                <Link style={style.moreInfo}>Xem thông tin</Link>
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
