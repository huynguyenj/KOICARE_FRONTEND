import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Thức ăn cao cấp cho cá Koi",
    price: "810.000đ",
    description: "Cám tăng màu cho các loại cá chép koi.",
    image:
      "https://kingkoifarm.com/wp-content/uploads/2022/07/thuc-an-cho-ca-koi-mau-lon-kingkoifarm.jpg",
  },
  {
    id: 2,
    name: "Bột vệ sinh hồ cá",
    price: "20.000đ",
    description:
      "Sản phẩm giúp làm trong nước hồ cá nhanh chóng. Sử dụng khi nước đó, đục.",
    image:
      "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 3,
    name: "Vemedim Trimesul cá",
    price: "375.000đ",
    description: "Phòng các bệnh nhiễm khuẩn cho cá nuôi nước ngọt, gói 1kg",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 4,
    name: "Vợt kim cương bắt cá Koi",
    price: "350.000đ",
    description: "Giúp bảo vệ cá trong quá trình chăm sóc cá.",
    image:
      "https://images.unsplash.com/photo-1513039464749-94912b3841ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 5,
    name: "BACTEVIT @",
    price: "375.000đ",
    description:
      "Bổ sung các vitamin và các vi sinh vật có lợi, cá tiêu hóa tốt, giảm hệ số thức ăn, tăng đề kháng, tăng tỷ lệ sống.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 6,
    name: "Extra BIO - Vi Sinh Làm Sạch Nước",
    price: "20.000đ",
    description:
      "Hạn chế rêu, không gây hại cho cá. Cải thiện quá trình trao đổi chất của cá.",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2314&q=80",
  },
  {
    id: 6,
    name: "Extra BIO - Vi Sinh Làm Sạch Nước",
    price: "20.000đ",
    description:
      "Hạn chế rêu, không gây hại cho cá. Cải thiện quá trình trao đổi chất của cá.",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2314&q=80",
  },
];

const Store = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 9;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          borderBottom: "2px solid #1976d2",
          paddingBottom: "10px",
          textAlign: "center",
        }}
      >
        Cửa hàng
      </Typography>
      <Grid container spacing={4}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={`/userhome/store/${product.id}`}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{}}>
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box
                sx={{p: 2, display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  sx={{ width: "100%" }}
                >
                  Mua ngay
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid> 
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      </Box>
    </Container>
  );
};

export default Store;
