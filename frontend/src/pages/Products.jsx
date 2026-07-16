import { useEffect, useState } from "react";
import {
  Box, Grid, Card, CardContent, CardMedia, Typography,
  Button, CircularProgress, Alert, TextField,
  MenuItem, Pagination, Chip
} from "@mui/material";
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

  return (
    <Box sx={{ p:4, bgcolor:"#f5f5f5", minHeight:"100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Our Products
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Product"
            value={search}
            onChange={(e)=>{setSearch(e.target.value);setPage(1);}}
          />
        </Grid>

        <Grid item xs={12} md={4}>
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

        <Grid item xs={12} md={4}>
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
              <Grid item xs={12}>
                <Alert severity="info">No products found.</Alert>
              </Grid>
            ) : (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                      image={product.image || "https://via.placeholder.com/400x300?text=No+Image"}
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
                          disabled={product.stock===0}
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

          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={10}
              page={page}
              onChange={(e,v)=>setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Products;
