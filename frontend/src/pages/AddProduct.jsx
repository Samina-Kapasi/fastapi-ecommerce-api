import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
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

      <Paper sx={{ p: 4, maxWidth: 700, mx: "auto" }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Add Product
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Product
          </Button>

        </Box>

      </Paper>

    </Box>
  );
}

export default AddProduct;