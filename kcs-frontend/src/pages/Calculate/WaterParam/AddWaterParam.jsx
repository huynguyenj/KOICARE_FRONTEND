import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { addWaterParam, getAllPond } from "../../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify";

function AddWaterParam() {
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState({});
  const [ponds, setPonds] = useState([]);
  const [pondId, setPondId] = useState();
  const [data, setData] = useState({
    measurementTime: "",
    temperature: "",
    salinity: "",
    ph: "",
    o2: "",
    no2: "",
    no3: "",
    po4: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    getPonds();
  }, []);

  const getPonds = async () => {
    try {
      const res = await getAllPond();
      setPonds(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    const newError = {};
    if (!data.measurementTime || data.measurementTime.trim() === "") {
      newError.time = "Thời gian không được để trống!";
    }
    if (!data.temperature) {
      newError.temp = "Nhiệt độ không được để trống!";
    }
    if (!data.ph || data.ph < 0) {
      newError.ph = "Độ pH không được để trống hoặc < 0";
    }
    if (!data.salinity || data.salinity < 0) {
      newError.salt = "Độ muối không được để trống hoặc < 0";
    }
    if (!data.o2 || data.o2 <= 0) {
      newError.o2 = "Nồng độ oxi không được để trống hoặc <= 0";
    }
    if (!data.no2) {
      newError.no2 = "Nồng độ NO2 không được để trống";
    }
    if (!data.no3) {
      newError.no3 = "Nồng độ NO3 không được để trống";
    }
    if (!data.po4) {
      newError.po4 = "Nồng độ PO4 không được để trống";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setUpdate(true);
      try {
        await addWaterParam(pondId, data);
        toast.success("Thêm thông số nước thành công");
      } catch (error) {
        if (error.response.data.code === 1007) {
          toast.error(
            "Bạn đã thêm thông số cho hồ này rồi, bạn muốn thay đổi hãy cập nhật!"
          );
        } else {
          toast.error("Thêm thông số nước thất bại!");
        }
      } finally {
        setUpdate(false);
      }
    }
  };

  const handlePond = (e) => {
    setPondId(e.target.value);
  };

  return (
    <Container maxWidth="md">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <Card sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }} align="center">
          Thêm Thông Số Nước
        </Typography>

        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Hồ của tôi</InputLabel>
                <Select value={pondId} label="Hồ của tôi" onChange={handlePond}>
                  {ponds.map((pond) => (
                    <MenuItem key={pond.pondId} value={pond.pondId}>
                      {pond.pondName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Thời gian đo"
                type="date"
                name="measurementTime"
                value={data.measurementTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!error.time}
                helperText={error.time}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nhiệt độ (°C)"
                type="number"
                name="temperature"
                value={data.temperature}
                onChange={handleChange}
                error={!!error.temp}
                helperText={error.temp}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Độ mặn (%)"
                type="number"
                name="salinity"
                value={data.salinity}
                onChange={handleChange}
                error={!!error.salt}
                helperText={error.salt}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Độ pH"
                type="number"
                name="ph"
                value={data.ph}
                onChange={handleChange}
                error={!!error.ph}
                helperText={error.ph}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nồng độ O2 (mg/l)"
                type="number"
                name="o2"
                value={data.o2}
                onChange={handleChange}
                error={!!error.o2}
                helperText={error.o2}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nồng độ NO2 (mg/l)"
                type="number"
                name="no2"
                value={data.no2}
                onChange={handleChange}
                error={!!error.no2}
                helperText={error.no2}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nồng độ NO3 (mg/l)"
                type="number"
                name="no3"
                value={data.no3}
                onChange={handleChange}
                error={!!error.no3}
                helperText={error.no3}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nồng độ PO4 (mg/l)"
                type="number"
                name="po4"
                value={data.po4}
                onChange={handleChange}
                error={!!error.po4}
                helperText={error.po4}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={update}
              >
                {update ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Lưu"
                )}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                sx={{ mt: 0, width: "100%" }}
                onClick={() => navigator("/userhome/pondlist")}
              >
                Xem hồ của tôi
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Card>
    </Container>
  );
}

export default AddWaterParam;
