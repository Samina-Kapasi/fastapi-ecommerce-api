import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";

import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Accessories",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get("/filter", {
        params: {
          page: 1,
          limit: 6,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(to right,#1976d2,#42a5f5)",
          color: "white",
          textAlign: "center",
          py:
            {
            xs: 6,
            sm: 8,
            md: 10,
          },
          px: 2,
        }}
      >
        <Typography 
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4.5rem",
            },
            lineHeight: 1.2,
        }}>
          Welcome to ShopEase
        </Typography>

        <Typography 
          sx={{
          mt: 2,
          fontSize: {
            xs: "1.1rem",
            sm: "1.3rem",
            md: "1.5rem",
          },
          px: 2,
        }}>
          Discover Amazing Products at the Best Prices
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="warning"
          sx={{ mt: 4 }}
          startIcon={<ShoppingCartIcon />}
        >
          Shop Now
        </Button>
      </Box>

      {/* Categories */}

      <Box sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Featured Categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid size={{ xs: 12, md: 3 }}
                  key={category}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor: "#1976d2",
                    color: "white",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {category}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Products */}

      <Box sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Card
                elevation={5}
                sx={{
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={
                    product.image ||
                    "https://via.placeholder.com/300x220?text=No+Image"
                  }
                  alt={product.name}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {product.name}
                  </Typography>

                  <Typography color="primary" fontWeight="bold">
                    ₹ {product.price}
                  </Typography>

                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us */}

      <Box sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Why Shop With Us?
        </Typography>

        <Grid container spacing={3}>
          <Grid size ={{xs:12 ,md:3}}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Fast Delivery</Typography>
            </Paper>
          </Grid>

          <Grid size ={{xs:12 ,md:3}}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <SecurityIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Secure Payment</Typography>
            </Paper>
          </Grid>

          <Grid size ={{xs:12 ,md:3}}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <StarIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Premium Quality</Typography>
            </Paper>
          </Grid>

          <Grid size ={{xs:12 ,md:3}}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>24/7 Support</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;