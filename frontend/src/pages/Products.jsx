import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import mouse from "../assets/products/mouse.jfif";
import keyboard from "../assets/products/keyboard.jfif";
import headphones from "../assets/products/headphone.jfif";
import laptop from "../assets/products/laptop.jfif";
import phone from "../assets/products/mobile.jfif";
import watch from "../assets/products/watch.jfif";

function Products() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Gaming Mouse",
      price: 599,
      category: "Electronics",
      image: mouse,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 2499,
      category: "Electronics",
      image: keyboard,
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 3999,
      category: "Electronics",
      image: headphones,
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 2999,
      category: "Accessories",
      image: watch,
    },
    {
      id: 5,
      name: "Gaming Laptop",
      price: 55999,
      category: "Computers",
      image: laptop,
    },
    {
      id: 6,
      name: "Smart Phone",
      price: 18999,
      category: "Mobiles",
      image: phone,
    },
  ];

  return (
    <Box sx={{ p: 4, background: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        mb={4}
      >
        Our Products
      </Typography>

      <TextField
        fullWidth
        placeholder="Search Products..."
        sx={{ mb: 4, background: "white" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              onClick={() => navigate(`/products/${product.id}`)}
              sx={{
                cursor: "pointer",
                borderRadius: 4,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography color="text.secondary">
                  {product.category}
                </Typography>

                <Typography
                  variant="h5"
                  color="primary"
                  mt={2}
                >
                  ₹ {product.price}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    borderRadius: 3,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Add to Cart functionality coming soon!");
                  }}
                >
                  Add To Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;