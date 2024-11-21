import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWaterParamHistory } from "../../api/pond_fish";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
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

function PondWaterParam() {
  const { id } = useParams();
  const [paramHistory, setParamHistory] = useState([]);
  const navigator = useNavigate();

  const standardRanges = {
    temperature: { min: 5, max: 26 },
    salinity: { min: 0, max: 0.7 },
    ph: { min: 6.9, max: 8 },
    o2: { min: 5, max: 8 },
    no2: { max: 0 },
    no3: { max: 40 },
    po4: { max: 1 },
  };

  useEffect(() => {
    getHistoryParam();
  }, []);

  const getHistoryParam = async () => {
    try {
      const res = await getWaterParamHistory(id);
      processData(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const processData = (data) => {
    const formData = data.map((h) => {
      const no2 = parseFloat(h.no2) || 0;
      const ph = parseFloat(h.ph) || 0;
      const o2 = parseFloat(h.o2) || 0;
      const no3 = parseFloat(h.no3) || 0;
      const po4 = parseFloat(h.po4) || 0;
      const salinity = parseFloat(h.salinity) || 0;
      const temperature = parseFloat(h.temperature) || 0;
      const date = new Date(h.measurementTime).toLocaleDateString();
      return {
        no2,
        ph,
        o2,
        no3,
        po4,
        salinity,
        temperature,
        date,
      };
    });
    setParamHistory(formData);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: 10,
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`Ngày: ${label}`}</p>
          {payload.map((data, index) => {
            const key = data.dataKey;
            const value = data.value;
            const range = standardRanges[key];
            let notice = "";

            if (range) {
              if (
                (range.min !== undefined && value < range.min) ||
                (range.max !== undefined && value > range.max)
              ) {
                notice = " (Không đạt tiêu chuẩn)";
              }
            }

            return (
              <p key={index} style={{ color: data.color, margin: 0 }}>
                {`${data.name}: ${value} mg/l${notice}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Box sx={{ padding: 2, backgroundColor: "#fff", height: "auto" }}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 800, margin: "auto", padding: 2 }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Thống kê thông số của hồ
            </Typography>
            {paramHistory.length > 0 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={paramHistory}>
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
                        label={{
                          value: "Giá trị (mg/l)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" />
                      <Line
                        type="monotone"
                        dataKey="no2"
                        stroke="#1976d2"
                        name="NO2"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="o2"
                        stroke="#388e3c"
                        name="Oxi"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="no3"
                        stroke="#82ca9d"
                        name="NO3"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="po4"
                        stroke="#ff5722"
                        name="PO4"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="salinity"
                        stroke="#ff7043"
                        name="Độ mặn"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={{ textAlign: "center", marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigator("/userhome/pondlist")}
                  >
                    Quay lại danh sách cá
                  </Button>
                </Box>
              </>
            ) : (
              <Alert severity="info">Không có dữ liệu</Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default PondWaterParam;
