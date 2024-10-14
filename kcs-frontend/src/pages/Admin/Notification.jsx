import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Paper,
  Container,
} from "@mui/material";
import {
  Delete,
  CheckCircle,
  WaterDrop,
  SetMeal,
  Opacity,
  Warning,
} from "@mui/icons-material";

const notifications = [
  {
    id: 1,
    title: "Feeding Time",
    content:
      "It's time to feed your koi fish. Remember to use the high-quality pellets.",
    date: "2023-04-15 10:30 AM",
    read: false,
    icon: <SetMeal color="primary" />,
  },
  {
    id: 2,
    title: "Water Quality Alert",
    content:
      "pH levels are slightly high. Consider adjusting your filtration system.",
    date: "2023-04-14 3:45 PM",
    read: true,
    icon: <Opacity color="warning" />,
  },
  {
    id: 3,
    title: "Temperature Check",
    content:
      "Water temperature is optimal at 21°C (70°F). Great job maintaining the environment!",
    date: "2023-04-13 11:20 AM",
    read: false,
    icon: <WaterDrop color="success" />,
  },
  {
    id: 4,
    title: "Health Inspection Due",
    content:
      "It's time for the monthly health check of your koi fish. Look for any signs of illness.",
    date: "2023-04-12 9:15 AM",
    read: true,
    icon: <CheckCircle color="info" />,
  },
  {
    id: 5,
    title: "Algae Growth Detected",
    content:
      "Slight algae growth noticed. Consider cleaning the pond or adjusting sunlight exposure.",
    date: "2023-04-11 7:50 PM",
    read: false,
    icon: <Warning color="error" />,
  },
];

const NotificationItem = ({ notification }) => {}

const Notification = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        minHeight: "93.1vh",
        py: 10
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ bgcolor: "white", borderRadius: 2 }}>
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                alignItems="flex-start"
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="mark as read"
                      color="primary"
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                }
                sx={{
                  opacity: notification.read ? 0.6 : 1,
                  "&:hover": { bgcolor: "#f0f9ff" },
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {notification.icon}
                      <Box sx={{ ml: 1 }}>{notification.title}</Box>
                      {!notification.read && (
                        <Chip
                          label="New"
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        {notification.date}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Notification;
