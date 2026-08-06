import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Products",
      description: "View and manage all products.",
      icon: <Inventory2Icon sx={{ fontSize: 50 }} color="primary" />,
      button: "Manage Products",
      path: "/admin/products",
    },
    {
      title: "Add Product",
      description: "Create a new product.",
      icon: <AddBoxIcon sx={{ fontSize: 50 }} color="success" />,
      button: "Add Product",
      path: "/admin/add-product",
    },
    {
      title: "Categories",
      description: "Organize product categories.",
      icon: <CategoryIcon sx={{ fontSize: 50 }} color="warning" />,
      button: "Coming Soon",
      path: "",
    },
    {
      title: "Dashboard",
      description: "Admin analytics & reports.",
      icon: <DashboardIcon sx={{ fontSize: 50 }} color="secondary" />,
      button: "Coming Soon",
      path: "",
    },
  ];

  return (
    <Box sx={{ p: 5 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={5}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                textAlign: "center",
                p: 3,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <CardContent>

                {card.icon}

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mt={2}
                >
                  {card.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ my: 2 }}
                >
                  {card.description}
                </Typography>

                <Button
                  variant="contained"
                  disabled={!card.path}
                  onClick={() => navigate(card.path)}
                >
                  {card.button}
                </Button>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Admin;