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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import { Link } from "react-router-dom";
import api from "../services/api";
import noImage from "../assets/products/no-image.png";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

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

async function deleteProduct() {

  try {

    await api.delete(`/products/${selectedProduct.id}`);

    setMessage("Product deleted successfully!");
    setSeverity("success");
    setOpenSnackbar(true);

    setOpenDialog(false);

    fetchProducts();

  } catch (err) {

    setMessage(
      err.response?.data?.detail ||
      "Unable to delete product."
    );

    setSeverity("error");
    setOpenSnackbar(true);

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
              <TableCell><b>Image</b></TableCell>
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
                <TableCell>
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImage;
                      }}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #ddd",
                      }}
                    />
                  </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹ {product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>

                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/admin/edit-product/${product.id}`}
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
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDialog(true);
                    }}
                    >
                    Delete
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          Delete Product
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedProduct?.name}</strong>?

            <br />
            <br />

            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={() => setOpenSnackbar(false)}
    severity={severity}
    sx={{ width: "100%" }}
  >
    {message}
  </MuiAlert>
</Snackbar>
    </Box>
  );
}

export default AdminProducts;