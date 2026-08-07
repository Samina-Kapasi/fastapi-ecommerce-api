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
    image: null,
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

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("image", product.image);

      await api.post("/product", formData);

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
              <Box sx={{ mt: 2 }}>

              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                Choose Product Image

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setProduct({
                        ...product,
                        image: file,
                      });
                    }
                  }}
                />
              </Button>

              {product.image && (
                <Box sx={{ mt: 2, textAlign: "center" }}>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Selected: {product.image.name}
                  </Typography>

                  <Box
                    component="img"
                    src={URL.createObjectURL(product.image)}
                    alt="Product preview"
                    sx={{
                      width: 180,
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid #ddd",
                    }}
                  />

                </Box>
              )}

            </Box>
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