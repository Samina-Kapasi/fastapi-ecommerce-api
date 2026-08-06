import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
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

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  async function fetchProduct() {

    try {

      const response = await api.get(`/products/${product_id}`);

      setProduct(response.data);

    } catch (err){
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

  async function handleUpdate(e) {

  try {

    await api.put(`/product/${product_id}`, product);

    setMessage("Product updated successfully!");
    setSeverity("success");
    setOpen(true);

    setTimeout(() => {
      navigate("/admin/products");
    }, 1500);

  } catch (err) {

    setMessage(
      err.response?.data?.detail ||
      "Unable to update product."
    );

    setSeverity("error");
    setOpen(true);

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
          Edit Product
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

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

        <TextField
          fullWidth
          margin="normal"
          label="Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            onClick={handleUpdate}
            >
            Update Product
        </Button>

      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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