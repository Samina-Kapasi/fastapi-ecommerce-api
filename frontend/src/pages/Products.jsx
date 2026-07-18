import { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  Button, CircularProgress, Alert, TextField,
  MenuItem, Pagination, Chip
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


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
      const res = await api.get("/filter", {
        params: {
          product_name: search || undefined,
          product_category: category || undefined,
          sort: sort || undefined,
          page,
          limit,
        },
      });
      setProducts(res.data);
    } catch (err) {
      if (err.response?.status === 404) setProducts([]);
      else setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }
  async function addToCart(productId) {

  try {

    const response = await api.post("/cart/add", {
      product_id: productId,
      quantity: 1,
    });

    setMessage("Product added to cart!");
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
    <Box sx={{ p:4, bgcolor:"#f5f5f5", minHeight:"100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Our Products
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid size={{xs: 12 , md : 4}}>
          <TextField
            fullWidth
            label="Search Product"
            value={search}
            onChange={(e)=>{setSearch(e.target.value);setPage(1);}}
          />
        </Grid>

        <Grid size={{xs: 12 , md : 4}}>
          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e)=>{setCategory(e.target.value);setPage(1);}}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{xs: 12 , md : 4}}>
          <TextField
            select
            fullWidth
            label="Sort"
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price_low">Price Low → High</MenuItem>
            <MenuItem value="price_high">Price High → Low</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.length === 0 ? (
              <Grid size={{ xs:12 }}>
                <Alert severity="info">No products found.</Alert>
              </Grid>
            ) : (
              products.map((product) => (
                <Grid key={product.id} 
                        size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{
                    height:"100%",
                    display:"flex",
                    flexDirection:"column",
                    borderRadius:3,
                    transition:"0.3s",
                    "&:hover":{transform:"translateY(-6px)",boxShadow:8}
                  }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image || "https://placehold.co/400x300?text=No+Image"}
                      alt={product.name}
                    />

                    <CardContent sx={{display:"flex",flexDirection:"column",flexGrow:1}}>
                      <Typography variant="h6" fontWeight="bold">
                        {product.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{my:2}}>
                        {product.description}
                      </Typography>

                      <Chip
                        label={product.category}
                        color="primary"
                        sx={{width:"fit-content",mb:2}}
                      />

                      <Typography variant="h5" color="primary" fontWeight="bold">
                        ₹ {product.price}
                      </Typography>

                      <Typography sx={{mt:1}}>
                        Stock : {product.stock}
                      </Typography>

                      <Box sx={{display:"flex",gap:1,mt:"auto",pt:3}}>
                        <Button
                          component={Link}
                          to={`/products/${product.id}`}
                          variant="outlined"
                          fullWidth
                        >
                          View
                        </Button>

                        <Button
                          variant="contained"
                          fullWidth
                          disabled={product.stock === 0}
                          onClick={() => addToCart(product.id)}
                        >
                          Add Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}>
            <Pagination
              count={10}
              page={page}
              onChange={(e,v)=>setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default Products;
