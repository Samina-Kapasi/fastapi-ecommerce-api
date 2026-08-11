import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function EditProduct() {
  const { product_id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  async function fetchProduct() {
    try {
      const response = await api.get(`/products/${product_id}`);

      setProduct(response.data);

      // Show existing image
      if (response.data.image) {
        setPreviewImage(
          `http://127.0.0.1:8000/${response.data.image}`
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load product."
      );
    }
  }

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);

      // Preview new image
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);

      // Only send image if user selected a new one
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await api.put(
        `/product/${product_id}`,
        formData
      );

      setMessage("Product updated successfully!");
      setSeverity("success");
      setOpen(true);

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      const detail = err.response?.data?.detail;

      const errorMessage =
        typeof detail === "string"
          ? detail
          : detail?.[0]?.msg ||
            "Unable to update product.";

      setMessage(errorMessage);
      setSeverity("error");
      setOpen(true);
    }
  }

  return (
    <Box sx={{ p: 5 }}>
      <Paper
        elevation={5}
        sx={{
          p: 4,
          maxWidth: 700,
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
        >
          Edit Product
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          Update product details and image.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleUpdate}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={3}
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <Box sx={{ mt: 3 }}>
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
                onChange={handleImageChange}
              />
            </Button>

            {/* Image Preview */}
            {previewImage && (
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  color={
                    selectedImage
                      ? "success.main"
                      : "text.secondary"
                  }
                  sx={{ mb: 1 }}
                >
                  {selectedImage
                    ? `✓ New image selected: ${selectedImage.name}`
                    : "Current Product Image"}
                </Typography>

                <Box
                  component="img"
                  src={previewImage}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Update Product
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default EditProduct;