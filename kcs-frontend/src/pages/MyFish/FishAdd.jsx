import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addFish } from "../../api/pond_fish";

const FishForm = () => {
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fishName: "",
    fishImg: null,
    fishSize: "",
    fishShape: "",
    fishAge: "",
    fishWeight: "",
    fishGender: "",
    fishHealth: "",
    fishType: "",
    origin: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const validateFields = () => {
    const newErrors = {};
    if (!formData.fishName || formData.fishName.trim() === "") {
      newErrors.name = "Tên cá không được để trống";
    }
    if (!formData.fishAge || formData.fishAge <= 0) {
      newErrors.age = "Tuổi phải lớn hơn 0";
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Giá trị phải lớn hơn 0";
    }
    if (!formData.fishSize || formData.fishSize <= 0) {
      newErrors.size = "Kích thước phải lớn hơn 0";
    }
    if (!formData.fishWeight || formData.fishWeight <= 0) {
      newErrors.weight = "Cân nặng phải lớn hơn 0";
    }
    if (!formData.fishShape || formData.fishShape.trim() === "") {
      newErrors.shape = "Vóc dáng không được để trống";
    }
    if (
      !formData.fishGender ||
      !(
        formData.fishGender.trim().toLowerCase() === "đực" ||
        formData.fishGender.trim().toLowerCase() === "cái"
      )
    ) {
      newErrors.gender = "Giới tính phải là đực hoặc cái";
    }
    if (!formData.fishType || formData.fishType.trim() === "") {
      newErrors.type = "Giống loài không được để trống";
    }
    if (!formData.origin || formData.origin.trim() === "") {
      newErrors.origin = "Xuất xứ không được để trống";
    }
    if (!formData.fishHealth || formData.fishHealth.trim() === "") {
      newErrors.health = "Tình trạng sức khỏe không được để trống";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          fishImg: file, // Changed from image to fishImg
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      setUpdate(true);
      try {
        const data = new FormData();
        data.append("fishName", formData.fishName);
        if (formData.fishImg) {
          data.append("fishImg", formData.fishImg);
        }
        data.append("fishSize", formData.fishSize);
        data.append("fishShape", formData.fishShape);
        data.append("fishAge", formData.fishAge);
        data.append("fishWeight", formData.fishWeight);
        data.append("fishGender", formData.fishGender);
        data.append("fishHealth", formData.fishHealth);
        data.append("fishType", formData.fishType);
        data.append("origin", formData.origin);
        data.append("price", formData.price);

        await addFish(data);
        toast.success("Cá đã được thêm thành công!");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra khi thêm cá.");
      } finally {
        setUpdate(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 3, textAlign: "center", boxShadow: 6 }}>
              <Typography variant="h6">Thêm cá của tôi</Typography>
              <Divider sx={{ margin: "10px 0" }} />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Fish"
                  style={{
                    width: "50%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                />
              ) : (
                <></>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="image-input"
              />

              <Button
                component="label"
                htmlFor="image-input"
                variant="contained"
                color="success"
                onClick={handleImageClick}
                sx={{ marginBottom: 2, width: "100%" }}
              >
                Chọn ảnh cá
              </Button>
              <Button
                component={Link}
                to="/userhome/myfishlist"
                variant="contained"
                color="info"
                sx={{ marginBottom: 2, width: "100%" }}
              >
                Xem danh sách cá của tôi
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card sx={{ padding: 3, boxShadow: 6 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Tên của cá"
                      name="fishName"
                      value={formData.fishName}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label=""
                      name="fishType"
                      value={formData.fishType}
                      onChange={handleChange}
                      error={!!errors.type}
                      helperText={errors.type}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="" disabled>Chọn giống loài</option>
                      <option value="Asagi">Asagi</option>
                      <option value="Bekko">Bekko</option>
                      <option value="Doitsu">Doitsu</option>
                      <option value="Ginrin">Ginrin</option>
                      <option value="Goshiki">Goshiki</option>
                      <option value="Hirenaga">Hirenaga / Butterfly</option>
                      <option value="Kawarimono">Kawarimono</option>
                      <option value="Kikokuryu">Kikokuryu</option>
                      <option value="Kohaku">Kohaku</option>
                      <option value="Koromo">Koromo</option>
                      <option value="Ogon">Ogon</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Showa">Showa</option>
                      <option value="Shusui">Shusui</option>
                      <option value="Taisho Sanke">Taisho Sanke</option>
                      <option value="Tancho">Tancho</option>
                      <option value="Utsurimono">Utsurimono</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Vóc dáng"
                      name="fishShape"
                      value={formData.fishShape}
                      onChange={handleChange}
                      error={!!errors.shape}
                      helperText={errors.shape}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Kích thước (cm)"
                      type="number"
                      name="fishSize"
                      value={formData.fishSize}
                      onChange={handleChange}
                      error={!!errors.size}
                      helperText={errors.size}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Trọng lượng (kg)"
                      type="number"
                      name="fishWeight"
                      value={formData.fishWeight}
                      onChange={handleChange}
                      error={!!errors.weight}
                      helperText={errors.weight}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      name="fishGender"
                      value={formData.fishGender}
                      onChange={handleChange}
                      error={!!errors.gender}
                      helperText={errors.gender}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="" disabled>Chọn giới tính</option>
                      <option value="Đực">Đực</option>
                      <option value="Cái">Cái</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tuổi"
                      type="number"
                      name="fishAge"
                      value={formData.fishAge}
                      onChange={handleChange}
                      error={!!errors.age}
                      helperText={errors.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="fishHealth"
                      value={formData.fishHealth}
                      onChange={handleChange}
                      error={!!errors.health}
                      helperText={errors.health}
                      select
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="" disabled>Tình trạng sức khỏe</option>
                      <option value="Tốt">tốt</option>
                      <option value="Xấu">xấu</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nguồn gốc / Xuất xứ"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      error={!!errors.origin}
                      helperText={errors.origin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá trị của cá (VNĐ)"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: "right", marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={update}
                  >
                    {update ? <CircularProgress color="inherit" /> : "Lưu"}
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FishForm;
