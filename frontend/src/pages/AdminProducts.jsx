import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";
import api from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

async function deleteProduct(productId) {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/products/${productId}`);

    fetchProducts();

    alert("Product deleted successfully.");

  } catch (err) {

    alert(
      err.response?.data?.detail ||
      "Unable to delete product."
    );

  }

}

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Manage Products
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/admin/add-product"
        sx={{ mb: 3 }}
      >
        Add Product
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Stock</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹ {product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteProduct(product.id)}
                    >
                    Delete
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>
    </Box>
  );
}

export default AdminProducts;