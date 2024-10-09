import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

const FishForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    shape: "",
    size: "",
    weight: "",
    gender: "",
    feature: "",
    habitat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
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
        {/* Left Side - Image and Buttons */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 3, textAlign: "center", boxShadow: 6 }}>
            <Typography variant="h6">Thêm cá của tôi</Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <img
              src="/path/to/fish-image.jpg"
              alt="Fish"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ marginBottom: 2, width: "100%" }}
            >
              Tạo thêm cá mới
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
            <Button variant="contained" sx={{ width: "100%" }}>
              Thêm vào cá yêu thích
            </Button>
          </Card>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: 3, boxShadow: 6 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên của cá"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giống loài"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Vóc dáng"
                    name="shape"
                    value={formData.shape}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kích thước"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Trọng lượng"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giới tính"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Đặc điểm nổi bật"
                    name="feature"
                    value={formData.feature}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hồ đang sống"
                    name="habitat"
                    value={formData.habitat}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "right", marginTop: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                  Lưu
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FishForm;
