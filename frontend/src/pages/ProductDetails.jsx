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
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useParams } from "react-router-dom";

import api from "../services/api";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetchProduct();

  }, []);

  async function fetchProduct() {

    try {

      setLoading(true);

      const response = await api.get(`/products/${id}`);

      setProduct(response.data);

    }

    catch (err) {

      setError("Product not found");

    }

    finally {

      setLoading(false);

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

        <CircularProgress />

      </Box>

    );

  }

  if (error) {

    return (

      <Alert severity="error">

        {error}

      </Alert>

    );

  }

  return (

    <Box
      sx={{
        p: 5,
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >

        <Grid container spacing={5}>

          <Grid item xs={12} md={6}>

            <img
              src={
                product.image ||
                "https://via.placeholder.com/500x350?text=No+Image"
              }
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: "20px",
              }}
            />

          </Grid>

          <Grid item xs={12} md={6}>

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
              sx={{ mb: 2 }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
            >

              {product.name}

            </Typography>

            <Rating
              value={4.5}
              precision={0.5}
              readOnly
              sx={{ mt: 2 }}
            />

            <Typography
              variant="h4"
              color="primary"
              mt={3}
            >

              ₹ {product.price}

            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              color="text.secondary"
            >

              {product.description}

            </Typography>

            <Typography
              mt={3}
              fontWeight="bold"
            >

              Category : {product.category}

            </Typography>

            <Typography mt={1}>

              Available Stock : {product.stock}

            </Typography>

            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              sx={{
                mt: 4,
                borderRadius: 3,
                px: 5,
              }}
            >

              Add To Cart

            </Button>

          </Grid>

        </Grid>

      </Paper>

    </Box>

  );

}

export default ProductDetails;