import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";

function Home() {
  const products = [
    { id: 1, name: "Gaming Mouse", price: 599 },
    { id: 2, name: "Mechanical Keyboard", price: 2499 },
    { id: 3, name: "Wireless Headphones", price: 3999 },
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Accessories",
  ];

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}

      <Box
        sx={{
          background:
            "linear-gradient(to right,#1976d2,#42a5f5)",
          color: "white",
          textAlign: "center",
          py: 10,
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Welcome to ShopEase
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Discover Amazing Products at the Best Prices
        </Typography>

        <Button
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
            <Grid item xs={12} md={3} key={category}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {category}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Products */}

      <Box sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Card elevation={5}>
                <CardContent>

                  <Box
                    sx={{
                      height: 180,
                      bgcolor: "#eeeeee",
                      mb: 2,
                    }}
                  />

                  <Typography variant="h6">
                    {product.name}
                  </Typography>

                  <Typography color="primary">
                    ₹ {product.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
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

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Fast Delivery</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <SecurityIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Secure Payment</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <StarIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography>Premium Quality</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
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