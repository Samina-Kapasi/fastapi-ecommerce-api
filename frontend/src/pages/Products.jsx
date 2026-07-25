import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
  Pagination,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";

import api from "../services/api";
import Loader from "../components/Loader";

function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const limit = 6;

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  async function fetchProducts() {

    try {

      setLoading(true);

      setError("");

      const response = await api.get("/filter", {
        params: {
          product_name: search || undefined,
          product_category: category || undefined,
          sort: sort || undefined,
          page,
          limit,
        },
      });

      setProducts(response.data);

    } catch (err) {

      if (err.response?.status === 404) {
        setProducts([]);
      } else {
        setError("Failed to load products.");
      }

    } finally {

      setLoading(false);

    }

  }

  async function addToCart(productId) {

    try {

      await api.post("/cart/add", {
        product_id: productId,
        quantity: 1,
      });

      setMessage("Product added to cart successfully.");

      setSeverity("success");

      setOpen(true);

    } catch (err) {

      console.log(err.response);

      setMessage("Failed to add product.");

      setSeverity("error");

      setOpen(true);

    }

  }

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        py: 5,
        px: {
          xs: 2,
          md: 5,
        },
      }}
    >
          <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
      >
        Explore Products
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Discover amazing products with powerful search and filtering.
      </Typography>

      {/* Search & Filters */}

      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
          mb: 5,
        }}
      >
        <Grid container spacing={2}>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search Products"
              placeholder="Laptop, Mobile..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Sort By"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="price_low">
                Price : Low → High
              </MenuItem>

              <MenuItem value="price_high">
                Price : High → Low
              </MenuItem>

            </TextField>
          </Grid>

        </Grid>
      </Box>

      {loading ? (

        <Loader />

      ) : error ? (

        <Alert severity="error">
          {error}
        </Alert>

      ) : (

        <>

          <Grid container spacing={4}>

            {products.length === 0 ? (

              <Grid size={{ xs: 12 }}>

                <Alert severity="info">
                  No products found.
                </Alert>

              </Grid>

            ) : (

              products.map((product) => (

                <Grid
                  key={product.id}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >

                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.35s",

                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 10,
                      },
                    }}
                  >

                    <CardMedia
                      component="img"
                      height="240"
                      image={
                        product.image ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={product.name}
                      sx={{
                        objectFit: "cover",
                        transition: "0.4s",

                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        noWrap
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          mb: 2,
                          minHeight: 45,
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Chip
                        label={product.category}
                        color="primary"
                        size="small"
                        sx={{
                          width: "fit-content",
                          mb: 2,
                          fontWeight: "bold",
                        }}
                      />

                      <Typography
                        variant="h5"
                        color="primary"
                        fontWeight="bold"
                      >
                        ₹ {product.price.toLocaleString()}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          color:
                            product.stock > 0
                              ? "green"
                              : "red",
                          fontWeight: 600,
                        }}
                      >
                        {product.stock > 0
                          ? `In Stock : ${product.stock}`
                          : "Out of Stock"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: "auto",
                          pt: 3,
                        }}
                      >

                        <Button
                          component={Link}
                          to={`/products/${product.id}`}
                          variant="outlined"
                          fullWidth
                          startIcon={<VisibilityIcon />}
                        >
                          View
                        </Button>

                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<ShoppingCartIcon />}
                          disabled={product.stock === 0}
                          onClick={() => addToCart(product.id)}
                        >
                          Add
                        </Button>

                      </Box>

                    </CardContent>

                  </Card>

                </Grid>

              ))

            )}

          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Pagination
              page={page}
              count={10}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </Box>

        </>

      )}

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

export default Products;