import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  Grid,
  FormControl,
  CircularProgress,
  TextField,
  Link,
  IconButton,
  List,
  Box,
  ListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  checkParam,
  getPondWaterParam,
  updateWaterParam,
} from "../../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify";
import { getAllProduct } from "../../../api/product";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Info } from "@mui/icons-material";
import { LinkIcon } from "lucide-react";
function ViewWaterParam() {
  const { id } = useParams();
  const [waterParam, setWaterParam] = useState({});
  const [recomendation, setRecomendation] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [productsList, setProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [recomendProduct, setRecomendProduct] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getAllProduct();
      setProductList(res);
      console.log(productsList);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState({
    measurementTime: "",
    temperature: 0,
    salinity: 0,
    ph: 0,
    o2: 0,
    no2: 0,
    no3: 0,
    po4: 0,
  });

  useEffect(() => {
    getWaterParam();
  }, [id]);

  useEffect(() => {
    if (waterParam.measurementTime) {
      setData({
        measurementTime: new Date(waterParam.measurementTime)
          .toISOString()
          .split("T")[0],
        temperature: waterParam.temperature || 0,
        salinity: waterParam.salinity || 0,
        ph: waterParam.ph || 0,
        o2: waterParam.o2 || 0,
        no2: waterParam.no2 || 0,
        no3: waterParam.no3 || 0,
        po4: waterParam.po4 || 0,
      });
    }
  }, [waterParam]);

  const validate = () => {
    const newError = {};
    if (!data.measurementTime || data.measurementTime.trim() == "") {
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
    if (data.no2 < 0) {
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
    console.log(data);
    if (validate()) {
      setLoading(true);
      try {
        // await addWaterParam(pondId,data)
        await updateWaterParam(id, data);
        toast.success("Cập nhật thông số nước thành công");
        setUpdate(false);
        getWaterParam();
        handleCheckParam();
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thông số nước thất bại!");
      } finally {
        setLoading(false);
      }
    }
  };
  const getWaterParam = async () => {
    try {
      const data = await getPondWaterParam(id);
      setWaterParam(data.result);
      console.log(waterParam);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckParam = async () => {
    try {
      const recommend = await checkParam(id);
      setRecomendation(recommend.result);
    } catch (error) {
      console.log(error);
    }
  };

  const recommendProducts = () => {
    if (recomendation) {
      const newRecomendProduct = {};
      Object.entries(recomendation).forEach(([key]) => {
        // Filter products by the current category key
        const productsInCategory = productsList.filter(
          (p) => p.category === key
        );

        // Add filtered products to the new object under the category key
        newRecomendProduct[key] = productsInCategory;
      });
      setRecomendProduct(newRecomendProduct);
      setShow(true);
      console.log(recomendProduct);
    }
  };
  const categoryNames = {
    RESOLVE_O2: "Sản phẩm điều chỉnh oxi",
    RESOLVE_PH: "Sản phẩm điều chỉnh độ pH",
    RESOLVE_TEMPERATURE: "Sản phẩm điều chỉnh nhiệt độ",
    RESOLVE_SALINITY: "Sản phẩm điều chỉnh lượng muối",
    RESOLVE_PO4: "Sản phẩm điều chỉnh nồng độ PO4",
    RESOLVE_NO3: "Sản phẩm điều chỉnh nồng độ NO3",
    RESOLVE_NO2: "Sản phẩm điều chỉnh nồng độ NO2",
  };

  const standardRanges = {
    temperature: { min: 5, max: 26 }, // Updated temperature range for koi ponds
    salinity: { min: 0, max: 0.2 }, // Updated salinity range
    ph: { min: 6.9, max: 8 }, // Updated pH range
    o2: { min: 5, max: 8 }, // Minimum oxygen level in mg/L
    no2: { max: 0 }, // Maximum NO2 level in mg/L
    no3: { max: 40 }, // Maximum NO3 level in mg/L
    po4: { max: 1 }, // Maximum PO4 level in mg/L
  };

 const isNonStandard = (param, value) => {
   const range = standardRanges[param];
   if (!range) return false;

   // Check if the value is out of the valid range
   if (range.min !== undefined && value < range.min) return true;
   if (range.max !== undefined && value > range.max) return true;
   return false;
 };
  // Add a mapping between the display labels and standardRanges keys
  const paramKeys = {
    "Nhiệt độ": "temperature",
    "Độ mặn": "salinity",
    "Độ pH": "ph",
    "Nồng độ O2": "o2",
    "Nồng độ NO2": "no2",
    "Nồng độ NO3": "no3",
    "Nồng độ PO4": "po4",
  };

  const displayParamStatus = (label, value, unit) => {
    const paramKey = paramKeys[label]; // Match param with keys in `standardRanges`
    const isOutOfRange = isNonStandard(paramKey, value); // Use correct param key
    return (
      <Typography>
        {label}:{" "}
        <span style={{ color: "black" }}>
          {value}
          {unit}
        </span>
        {isOutOfRange ? (
          <span style={{ color: "red", marginLeft: "8px" }}>
            ({label} này không đạt tiêu chuẩn)
          </span>
        ) : (
          <span style={{ color: "green", marginLeft: "8px" }}>
            ({label} này đạt tiêu chuẩn)
          </span>
        )}
      </Typography>
    );
  };

  const naviagtor = useNavigate();
  const changeToPondPage = () => {
    naviagtor("/userhome/pondlist");
  };

  const handleChangeUpdate = () => {
    setUpdate(true);
  };
  return (
    <div>
      <ToastContainer />
      <Card
        sx={{ maxWidth: 700, margin: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "green",
              color: "white",
              textAlign: "center",
              mb: 2,
              padding: 2,
              borderRadius: 1,
            }}
          >
            Thông số của hồ
          </Typography>

          {Object.keys(waterParam).length > 0 ? (
            <>
              {!update ? (
                <>
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
                  >
                    {waterParam.pondName}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", color: "gray", mb: 2 }}
                  >
                    Ngày tạo:{" "}
                    {new Date(waterParam.measurementTime).toLocaleDateString()}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />
                  {displayParamStatus("Nhiệt độ", waterParam.temperature, "°C")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Độ mặn", waterParam.salinity, "%")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Độ pH", waterParam.ph, "")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Nồng độ O2", waterParam.o2, "mg/l")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Nồng độ NO2", waterParam.no2, "mg/l")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Nồng độ NO3", waterParam.no3, "mg/l")}
                  <Divider sx={{ my: 1 }} />
                  {displayParamStatus("Nồng độ PO4", waterParam.po4, "mg/l")}

                  <Button
                    onClick={handleCheckParam}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, width: "100%" }}
                  >
                    Kiểm tra lại thông số
                  </Button>
                  <Button
                    onClick={changeToPondPage}
                    variant="contained"
                    color="inherit"
                    sx={{ mt: 3, width: "100%" }}
                  >
                    Quay lại hồ của tôi
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={handleChangeUpdate}
                  >
                    Cập nhật lại thông số
                  </Button>
                  {!recomendation || Object.keys(recomendation).length === 0 ? (
                    ""
                  ) : (
                    <Alert variant="filled" severity="warning" sx={{ mt: 2 }}>
                      {!show ? (
                        <>
                          {Object.entries(recomendation).map(([key, value]) => (
                            <Typography key={key}>{value}</Typography>
                          ))}
                          <Button
                            variant="contained"
                            onClick={() => recommendProducts()}
                            sx={{ mt: 2 }}
                          >
                            Xem sản phẩm đề xuất
                          </Button>
                        </>
                      ) : (
                        <>
                          <>
                            <Typography
                              variant="h5"
                              sx={{
                                mt: 2,
                                mb: 2,
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              Đề xuất 1 số sản phẩm cải thiện thông số:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                              }}
                            >
                              {Object.entries(recomendProduct).map(
                                ([category, products]) => (
                                  <Card
                                    key={category}
                                    sx={{
                                      p: 2,
                                      bgcolor: "background.paper",
                                      boxShadow: 3,
                                    }}
                                  >
                                    <Typography variant="h6" color="warning">
                                      {categoryNames[category] || category}
                                    </Typography>
                                    <List dense>
                                      {products.slice(0, 3).map((product) => (
                                        <ListItem
                                          key={product.id}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Typography
                                            variant="body1"
                                            sx={{ flexGrow: 1 }}
                                          >
                                            {product.productName}
                                          </Typography>
                                          <IconButton
                                            color="primary"
                                            onClick={() =>
                                              naviagtor(
                                                `/userhome/store/${product.id}`
                                              )
                                            }
                                          >
                                            <LinkIcon />
                                          </IconButton>
                                        </ListItem>
                                      ))}
                                      {products.length > 3 && (
                                        <Typography
                                          variant="body2"
                                          color="text.disabled"
                                          align="right"
                                        >
                                          ...còn nữa
                                        </Typography>
                                      )}
                                    </List>
                                  </Card>
                                )
                              )}
                            </Box>
                            <Button
                              color="secondary"
                              variant="contained"
                              startIcon={<ArrowBackIcon />}
                              onClick={() => setShow(false)}
                              sx={{ mt: 3, alignSelf: "center" }}
                            >
                              Quay lại
                            </Button>
                          </>
                        </>
                      )}
                    </Alert>
                  )}
                </>
              ) : (
                <>
                  <div style={{ marginLeft: "12px" }}>
                    <Form onSubmit={handleSubmit}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        container
                        spacing={2}
                        sx={{ mt: 3 }}
                      >
                        <TextField
                          fullWidth
                          label="Thời gian đo"
                          type="date"
                          name="measurementTime"
                          value={data.measurementTime}
                          onChange={handleChange}
                          sx={{ mb: 2 }}
                          error={!!error.time}
                          helperText={error.time}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>

                        <TextField
                          fullWidth
                          label="Nhiệt độ(°C)"
                          type="number"
                          name="temperature"
                          value={data.temperature}
                          onChange={handleChange}
                          sx={{ mb: 2 }}
                          error={!!error.temp}
                          helperText={error.temp}
                        ></TextField>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Nồng độ muối"
                            type="number"
                            name="salinity"
                            value={data.salinity}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.salt}
                            helperText={error.salt}
                          ></TextField>
                        </FormControl>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Độ pH"
                            type="number"
                            name="ph"
                            value={data.ph}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.ph}
                            helperText={error.ph}
                          ></TextField>
                        </FormControl>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Nồng độ O2"
                            type="number"
                            name="o2"
                            value={data.o2}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.o2}
                            helperText={error.o2}
                          ></TextField>
                        </FormControl>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Nồng độ NO2"
                            type="number"
                            name="no2"
                            value={data.no2}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.no2}
                            helperText={error.no2}
                          ></TextField>
                        </FormControl>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Nồng độ NO3"
                            type="number"
                            name="no3"
                            value={data.no3}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.no3}
                            helperText={error.no3}
                          ></TextField>
                        </FormControl>

                        <FormControl>
                          <TextField
                            fullWidth
                            label="Nồng độ PO4"
                            type="number"
                            name="po4"
                            value={data.po4}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            error={!!error.po4}
                            helperText={error.po4}
                          ></TextField>
                        </FormControl>
                      </Grid>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <CircularProgress color="inherit" /> : "Lưu"}
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setUpdate(false)}
                      >
                        Quay lại trang thông số
                      </Button>
                    </Form>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Alert severity="info">Bạn chưa thêm thông số chưa hồ</Alert>
              <Button
                onClick={changeToPondPage}
                variant="contained"
                color="inherit"
                sx={{ mt: 3, width: "100%" }}
              >
                Quay lại hồ của tôi
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewWaterParam;
