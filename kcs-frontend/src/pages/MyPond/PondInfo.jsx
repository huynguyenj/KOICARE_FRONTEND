import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  TextField,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { getPond, updatePond } from "../../api/pond_fish";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const style = {
  card: {
    maxWidth: 800,
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
  },
  textField: {
    marginBottom: "15px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  hiddenInput: {
    display: "none",
  },
  error: {
    marginBottom: "10px",
  },
};

function PondInfo() {
  const { id } = useParams();
  const [pond, setPond] = useState({});
  const [pondData, setPondData] = useState({
    name: "",
    size: 0,
    depth: 0,
    volume: 0,
    drainCount: 0,
    pumpCapacity: 0,
    creationDate: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [update, setUpdate] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getPondInfo();
  }, []);

  useEffect(() => {
    setPondData({
      name: pond.pondName || "",
      size: pond.size || 0,
      depth: pond.depth || 0,
      volume: pond.volume || 0,
      drainCount: pond.drainCount || 0,
      pumpCapacity: pond.pumpCapacity || 0,
      creationDate: pond.date || "",
      image: pond.pondImg || "",
    });
  }, [pond]);

  const getPondInfo = async () => {
    try {
      const res = await getPond(id);
      setPond(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi trong quá trình lấy dữ liệu!");
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!pondData.name || pondData.name.trim() === "") {
      newErrors.name = "Tên ao không được để trống";
    }
    if (pondData.depth <= 0) {
      newErrors.depth = "Độ sâu phải lớn hơn 0";
    }
    if (pondData.size <= 0) {
      newErrors.size = "Kích thước phải lớn hơn 0";
    }
    if (pondData.volume <= 0) {
      newErrors.volume = "Thể tích phải lớn hơn 0";
    }
    if (pondData.pumpCapacity <= 0) {
      newErrors.pumpCapacity = "Công suất bơm phải lớn hơn 0";
    }
    if (pondData.drainCount <= 0) {
      newErrors.drainCount = "Số lượng cống thải phải lớn hơn 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setPondData({
      ...pondData,
      [field]: event.target.value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPondData({
          ...pondData,
          image: file,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    if (validateFields()) {
      setUpdate(true);
      const data = new FormData();
      data.append("pondName", pondData.name);

      if (pondData.image instanceof File) {
        data.append("pondImg", pondData.image);
      }

      data.append("size", pondData.size);
      data.append("depth", pondData.depth);
      data.append("volume", pondData.volume);
      data.append("drainCount", pondData.drainCount);
      data.append("pumpCapacity", pondData.pumpCapacity);

      try {
        await updatePond(pond.pondId, data);
        toast.success("Cập nhật hồ cá thành công!");
        getPondInfo();
        setIsEditing(false);
      } catch (error) {
        toast.error("Cập nhật hồ cá thất bại!");
        console.log(error);
      } finally {
        setUpdate(false);
      }
    }
  };

  const handleCancel = () => {
    setPondData({
      name: pond.pondName || "",
      size: pond.size || 0,
      depth: pond.depth || 0,
      volume: pond.volume || 0,
      drainCount: pond.drainCount || 0,
      pumpCapacity: pond.pumpCapacity || 0,
      creationDate: pond.date || "",
      image: pond.pondImg || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div>
      <ToastContainer />
      <Card style={style.card}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Left: Pond Image */}
            <Grid item xs={12} sm={6}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Pond Preview"
                  style={style.imagePreview}
                />
              ) : (
                <img
                  src={pondData.image}
                  alt="Pond"
                  style={style.imagePreview}
                />
              )}
              {isEditing && (
                <div style={{ marginTop: "10px" }}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleImageClick}
                  >
                    <PhotoCamera />
                  </IconButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={style.hiddenInput}
                  />
                </div>
              )}
            </Grid>

            {/* Right: Pond Information */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="div" gutterBottom>
                {isEditing ? "Chỉnh sửa hồ cá" : pondData.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Tên hồ cá"
                    fullWidth
                    value={pondData.name}
                    onChange={handleChange("name")}
                    style={style.textField}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Độ sâu (m)"
                    type="number"
                    fullWidth
                    value={pondData.depth}
                    onChange={handleChange("depth")}
                    style={style.textField}
                    error={!!errors.depth}
                    helperText={errors.depth}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Kích thước (m2)"
                    type="number"
                    fullWidth
                    value={pondData.size}
                    onChange={handleChange("size")}
                    style={style.textField}
                    error={!!errors.size}
                    helperText={errors.size}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Thể tích (m3)"
                    type="number"
                    fullWidth
                    value={pondData.volume}
                    onChange={handleChange("volume")}
                    style={style.textField}
                    error={!!errors.volume}
                    helperText={errors.volume}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Công suất bơm (m3/h)"
                    type="number"
                    fullWidth
                    value={pondData.pumpCapacity}
                    onChange={handleChange("pumpCapacity")}
                    style={style.textField}
                    error={!!errors.pumpCapacity}
                    helperText={errors.pumpCapacity}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Số lượng cống thải"
                    type="number"
                    fullWidth
                    value={pondData.drainCount}
                    onChange={handleChange("drainCount")}
                    style={style.textField}
                    error={!!errors.drainCount}
                    helperText={errors.drainCount}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Actions */}
          <Box style={style.buttonContainer}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  {update ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Lưu"
                  )}
                </Button>
                <Button
                sx={{marginRight: 60}}
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/userhome/pondlist"
            >
              Quay lại
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default PondInfo;
