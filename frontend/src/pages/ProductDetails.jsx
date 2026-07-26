import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useParams } from "react-router-dom";

import api from "../services/api";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");

  useEffect(() => {

    fetchProduct();

  }, []);

  async function fetchProduct() {

    try {

      setLoading(true);

      const response = await api.get(`/products/${id}`);

      setProduct(response.data);

    } catch {

      setError("Product not found.");

    } finally {

      setLoading(false);

    }

  }

  async function addToCart() {

    try {

      await api.post("/cart/add", {
        product_id: product.id,
        quantity: 1,
      });

      setMessage("Product added to cart successfully.");

      setSeverity("success");

      setOpen(true);

    } catch {

      setMessage("Failed to add product.");

      setSeverity("error");

      setOpen(true);

    }

  }

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress size={60} />
      </Box>

    );

  }

  if (error) {

    return (

      <Box sx={{ p: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>

    );

  }

  return (

    <Box
      sx={{
        bgcolor: "#f4f7fb",
        minHeight: "100vh",
        py: 6,
        px: {
          xs: 2,
          md: 6,
        },
      }}
    >

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >

        <Grid container spacing={6}>

          {/* Product Image */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Box
              sx={{
                bgcolor: "#fafafa",
                borderRadius: 4,
                p: 3,
              }}
            >

              <Box
                component="img"
                src={
                  product.image ||
                  "https://placehold.co/600x500?text=No+Image"
                }
                alt={product.name}
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  transition: ".4s",

                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />

            </Box>

          </Grid>

          {/* Product Details */}

          <Grid size={{ xs: 12, md: 6 }}>

            <Chip
              label={
                product.stock > 0
                  ? "In Stock"
                  : "Out Of Stock"
              }
              color={
                product.stock > 0
                  ? "success"
                  : "error"
              }
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {product.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 2,
              }}
            >

              <Rating
                value={4.5}
                precision={0.5}
                readOnly
              />

              <Typography color="text.secondary">
                (120 Reviews)
              </Typography>

            </Box>

            <Typography
              variant="h3"
              color="primary"
              fontWeight="bold"
              mt={3}
            >
              ₹ {product.price.toLocaleString()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
              }}
            >
              {product.description}
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >

              <Chip
                label={`Category : ${product.category}`}
                color="primary"
              />

              <Chip
                label={`Stock : ${product.stock}`}
                color="success"
                variant="outlined"
              />

            </Box>

            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >

                <VerifiedIcon color="success" />

                <Typography>
                  100% Genuine Product
                </Typography>

              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >

                <LocalShippingIcon color="primary" />

                <Typography>
                  Free Delivery Available
                </Typography>

              </Box>

            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              disabled={product.stock === 0}
              onClick={addToCart}
              sx={{
                mt: 5,
                py: 1.8,
                borderRadius: 3,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Add To Cart
            </Button>

          </Grid>

        </Grid>

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
          severity={severity}
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>

    </Box>

  );

}

export default ProductDetails;