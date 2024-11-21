import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFishHistory } from "../../api/pond_fish";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

function FishDevelopmentData() {
  const { id } = useParams();
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    getFishDevelopmentHistory();
  }, []);

  const getFishDevelopmentHistory = async () => {
    setLoading(true); // Start loading
    try {
      const res = await getFishHistory(id);
      if (res && res.result) {
        processData(res.result);
      }
    } catch (error) {
      console.error("Error fetching fish history:", error);
      setError("Failed to fetch fish history. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const processData = (data) => {
    const formattedData = data.map((item) => {
      const weight = parseFloat(item.weight);
      const size = parseFloat(item.size);
      const date = new Date(item.date);
      return {
        date: date.toLocaleDateString(), // Format date
        weight: isNaN(weight) ? 0 : weight,
        size: isNaN(size) ? 0 : size,
      };
    });
    setDataset(formattedData);
  };

  const handleChangePage = () => {
    navigator("/userhome/myfishlist");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Card
        variant="outlined"
        sx={{ maxWidth: 800, width: "100%", padding: 2 }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center">
            Biểu Đồ Thống Kê Xu Hướng Phát Triển Cá Koi
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography
              color="error"
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              {error}
            </Typography>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dataset}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      label={{
                        value: "Ngày",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "Cân nặng (kg)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Kích thước (cm)",
                        angle: -90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="weight"
                      stroke="#8884d8"
                      name="Cân nặng (kg)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="size"
                      stroke="#82ca9d"
                      name="Kích thước (cm)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{ textAlign: "center", marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangePage}
                >
                  Quay lại danh sách hồ
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default FishDevelopmentData;
