import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import {
  Add,
  Remove,
  Delete,
} from "@mui/icons-material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { Link } from "react-router-dom";

import api from "../services/api";

function Cart() {

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");

  useEffect(() => {

    loadCart();

  }, []);

  async function loadCart() {

    try {

      setLoading(true);

      setError("");

      const response = await api.get("/cart/get");

      setItems(response.data);

    } catch (err) {

      if (err.response?.status === 404) {

        setItems([]);

      } else {

        setError("Failed to load cart.");

      }

    } finally {

      setLoading(false);

    }

  }

  async function updateQty(item, quantity) {

    if (quantity < 1) return;

    try {

      await api.put(`/cart/${item.cart_id}`, {
        quantity,
      });

      loadCart();

    } catch (err) {

      setMessage(
        err.response?.data?.detail ||
        "Unable to update quantity."
      );

      setSeverity("error");

      setOpen(true);

    }

  }

  async function removeItem(cartId) {

    if (!window.confirm("Remove this product from cart?")) {

      return;

    }

    try {

      await api.delete(`/cart/${cartId}`);

      setMessage("Product removed successfully.");

      setSeverity("success");

      setOpen(true);

      loadCart();

    } catch {

      setMessage("Unable to remove product.");

      setSeverity("error");

      setOpen(true);

    }

  }

  async function placeOrder() {

    try {

      await api.post("/order/add");

      setMessage("Order placed successfully.");

      setSeverity("success");

      setOpen(true);

      loadCart();

    } catch (err) {

      setMessage(
        err.response?.data?.detail ||
        "Failed to place order."
      );

      setSeverity("error");

      setOpen(true);

    }

  }

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.Quantity,
    0
  );

  const gst = Math.round(subtotal * 0.18);

  const total = subtotal + gst;

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

        <Alert severity="error">

          {error}

        </Alert>

      </Box>

    );

  }

  if (items.length === 0) {

    return (
              <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "#f4f7fb",
        }}
      >
        <Typography variant="h1">
          🛒
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
        >
          Your Cart is Empty
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Looks like you haven't added anything yet.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            borderRadius: 3,
            px: 5,
          }}
        >
          Continue Shopping
        </Button>

      </Box>

    );

  }

  return (

    <Box
      sx={{
        bgcolor: "#f4f7fb",
        minHeight: "100vh",
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
        mb={4}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>

        {/* Cart Items */}

        <Grid size={{ xs: 12, lg: 8 }}>

          {items.map((item) => (

            <Card
              key={item.cart_id}
              sx={{
                mb: 3,
                borderRadius: 4,
                overflow: "hidden",
                transition: ".3s",

                "&:hover": {
                  boxShadow: 8,
                },
              }}
            >

              <Grid container>

                <Grid size={{ xs: 12, md: 4 }}>

                  <CardMedia
                    component="img"
                    image={
                      item.image ||
                      "https://placehold.co/500x350?text=No+Image"
                    }
                    height="260"
                    sx={{
                      objectFit: "cover",
                    }}
                  />

                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>

                  <CardContent>

                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {item.product_name}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="primary"
                      mt={1}
                    >
                      ₹ {item.price.toLocaleString()}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      Available Stock : {item.stock}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 3,
                      }}
                    >

                      <IconButton
                        color="primary"
                        onClick={() =>
                          updateQty(
                            item,
                            item.Quantity - 1
                          )
                        }
                      >
                        <Remove />
                      </IconButton>

                      <Paper
                        elevation={2}
                        sx={{
                          px: 3,
                          py: 1,
                          minWidth: 60,
                          textAlign: "center",
                        }}
                      >
                        {item.Quantity}
                      </Paper>

                      <IconButton
                        color="primary"
                        disabled={
                          item.Quantity >= item.stock
                        }
                        onClick={() =>
                          updateQty(
                            item,
                            item.Quantity + 1
                          )
                        }
                      >
                        <Add />
                      </IconButton>

                    </Box>

                    <Typography
                      fontWeight="bold"
                      mt={3}
                    >
                      Subtotal : ₹{" "}
                      {(item.price * item.Quantity).toLocaleString()}
                    </Typography>

                    <Button
                      color="error"
                      startIcon={<Delete />}
                      sx={{ mt: 2 }}
                      onClick={() =>
                        removeItem(item.cart_id)
                      }
                    >
                      Remove Product
                    </Button>

                  </CardContent>

                </Grid>

              </Grid>

            </Card>

          ))}

        </Grid>

        {/* Order Summary */}

        <Grid size={{ xs: 12, lg: 4 }}>

          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              position: "sticky",
              top: 90,
            }}
          >

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Order Summary
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Typography>
                Items Total
              </Typography>

              <Typography>
                ₹ {subtotal.toLocaleString()}
              </Typography>

            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Typography>
                GST (18%)
              </Typography>

              <Typography>
                ₹ {gst.toLocaleString()}
              </Typography>

            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
            >
              <Typography>
                Delivery
              </Typography>

              <Typography
                color="success.main"
                fontWeight="bold"
              >
                FREE
              </Typography>

            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Grand Total
              </Typography>

              <Typography
                variant="h6"
                color="primary"
                fontWeight="bold"
              >
                ₹ {total.toLocaleString()}
              </Typography>

            </Box>

            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{
                mt: 4,
                py: 1.6,
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={placeOrder}
            >
              Proceed To Checkout
            </Button>

          </Paper>

        </Grid>

      </Grid>
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

export default Cart;