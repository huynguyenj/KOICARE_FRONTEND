import React, {useState} from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Breadcrumbs,
  Grid,
  Rating,
} from "@mui/material";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../Store/Cart";
const products = [
  {
    id: 1,
    name: "Thức ăn cáo cấp cho cá Koi",
    price: "810.000đ",
    description: "Cám tăng màu cho các loại cá chép koi.",
    longDescription:
      "Thức ăn cao cấp này được đặc biệt thiết kế để tăng cường màu sắc và sức khỏe cho cá Koi...",
    image:
      "https://sanvuontrucxinh.com/upload/hinh_bai_viet/tin_tuc_tong_hop/thuc_an_tang_truong_ca_koi.jpg",
    rating: 4.5,
    reviews: 120,
  },
  // Add more products as needed
];

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart(); // Use the Cart context

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

    const handleAddToCart = () => {
      addToCart(product); // Add product to cart
    };


  return (
    <Box sx={{ p: { xs: 2, md: 2 }, width: 1200, mx: "auto" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          to="/userhome/store"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Cửa hàng
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Card with Product Image and Details */}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "38%" },
            height: "auto",
            objectFit: "cover",
            // transition: "transform 0.3s ease",
          }}
          image={product.image}
          alt={product.name}
        />
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: { xs: 2, md: 3 },
          }}
        >
          {/* Product Info */}
          <Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {product.price}
            </Typography>

            {/* Rating and Review Count */}
            <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Grid item>
                <Rating
                  name="read-only"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  ({product.reviews} đánh giá)
                </Typography>
              </Grid>
            </Grid>

            {/* Product Description */}
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.longDescription}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart} // Update this line
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#115293" },
                transition: "background-color 0.3s ease",
              }}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              component={Link}
              to="/userhome/store"
              variant="outlined"
              startIcon={<ArrowLeft />}
              fullWidth
              sx={{
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#115293",
                  color: "#115293",
                },
              }}
            >
              Quay lại cửa hàng
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Đánh giá sản phẩm
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
        </Typography>
      </Box>
    </Box>
  );
};

export default Detail;
