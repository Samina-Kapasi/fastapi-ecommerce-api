import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post("/product", product);

      alert("Product added successfully!");

      navigate("/admin/products");

    } catch (err) {

      setError("Unable to add product.");

    }

  }

  return (
    <Box sx={{ p: 5 }}>

      <Paper elevation={5}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 5,
          borderRadius: 4,
        }}>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Add New Product
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Fill all product details before submitting.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={product.image}
                onChange={handleChange}
              />
            </Grid>

          </Grid>
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Add Product
          </Button>

        </Box>

      </Paper>

    </Box>
  );
}

export default AddProduct;