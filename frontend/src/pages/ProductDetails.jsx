import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import laptop from "../assets/products/laptop.jfif";

function ProductDetails() {
  return (
    <Box sx={{ p: 5, background: "#f5f5f5", minHeight: "100vh" }}>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={5}>

          {/* Product Image */}

          <Grid item xs={12} md={6}>

            <img
              src={laptop}
              alt="Laptop"
              style={{
                width: "100%",
                borderRadius: "20px",
              }}
            />

          </Grid>

          {/* Product Information */}

          <Grid item xs={12} md={6}>

            <Chip
              label="In Stock"
              color="success"
              sx={{ mb: 2 }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              Gaming Laptop
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
              ₹55,999
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body1"
              color="text.secondary"
            >
              Experience high-performance gaming with the latest processor,
              RTX graphics, 16GB RAM, and a 144Hz display. Designed for
              gamers and professionals who demand speed and reliability.
            </Typography>

            <Typography
              mt={3}
              fontWeight="bold"
            >
              Category : Electronics
            </Typography>

            <Typography mt={1}>
              Available Stock : 12
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
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