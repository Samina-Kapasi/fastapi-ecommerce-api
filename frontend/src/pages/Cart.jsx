import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import {
  Add,
  ArrowBack,
  Delete,
  Remove,
  ShoppingCartCheckout,
} from "@mui/icons-material";

import api from "../services/api";

const productImages = import.meta.glob(
  "../assets/products/*",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function getProductImage(imageName) {
  if (!imageName) {
    return productImages["../assets/products/no-image.png"];
  }

  const fileName = imageName.split("/").pop();

  const imagePath = `../assets/products/${fileName}`;

  return (
    productImages[imagePath] ||
    productImages["../assets/products/no-image.png"]
  );
}


function Cart() {
  const navigate = useNavigate();

  // ==============================
  // CART STATE
  // ==============================

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // REMOVE PRODUCT DIALOG
  // ==============================

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ==============================
  // SNACKBAR
  // ==============================

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");


  // ==============================
  // LOAD CART WHEN PAGE OPENS
  // ==============================

  useEffect(() => {
    loadCart();
  }, []);


  // ==============================
  // LOAD CART
  // ==============================

  async function loadCart() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cart/get");

      setItems(response.data);

    } catch (err) {
      console.error("Failed to load cart:", err);

      if (err.response?.status === 404) {
        setItems([]);
      } else {
        setError("Failed to load cart.");
      }

    } finally {
      setLoading(false);
    }
  }


  // ==============================
  // UPDATE QUANTITY
  // ==============================

  async function updateQty(item, quantity) {

    // Don't allow quantity less than 1
    if (quantity < 1) {
      return;
    }

    try {

      await api.put(`/cart/${item.cart_id}`, {
        quantity: quantity,
      });

      await loadCart();

    } catch (err) {

      console.error("Failed to update quantity:", err);

      const detail = err.response?.data?.detail;

      let errorMessage = "Unable to update quantity.";

      if (Array.isArray(detail)) {
        errorMessage = detail[0]?.msg || errorMessage;
      } else if (typeof detail === "string") {
        errorMessage = detail;
      }

      setMessage(errorMessage);
      setSeverity("error");
      setOpen(true);
    }
  }


  // ==============================
  // OPEN REMOVE DIALOG
  // ==============================

  function handleRemoveClick(cartId) {

    setSelectedProductId(cartId);

    setRemoveDialogOpen(true);
  }


  // ==============================
  // REMOVE PRODUCT
  // ==============================

  async function removeItem() {

    if (!selectedProductId) {
      return;
    }

    try {

      console.log(
        "Removing cart item:",
        selectedProductId
      );

      await api.delete(`/cart/${selectedProductId}`);

      // Close dialog
      setRemoveDialogOpen(false);

      // Clear selected cart ID
      setSelectedProductId(null);

      // Reload cart
      await loadCart();

      // Show success message
      setMessage("Product removed from cart.");
      setSeverity("success");
      setOpen(true);

    } catch (err) {

      console.error(
        "Failed to remove item:",
        err
      );

      const detail = err.response?.data?.detail;

      let errorMessage = "Unable to remove product.";

      // FastAPI validation error
      if (Array.isArray(detail)) {

        errorMessage =
          detail[0]?.msg ||
          errorMessage;

      }

      // Normal FastAPI error
      else if (typeof detail === "string") {

        errorMessage = detail;

      }

      setMessage(errorMessage);
      setSeverity("error");
      setOpen(true);
    }
  }


  // ==============================
  // PLACE ORDER
  // ==============================

  async function placeOrder() {

    try {

      await api.post("/order/add");

      setMessage("Order placed successfully!");
      setSeverity("success");
      setOpen(true);

      // Reload cart after order
      await loadCart();

      // Navigate to orders after short delay
      setTimeout(() => {
        navigate("/orders");
      }, 1000);

    } catch (err) {

      console.error(
        "Failed to place order:",
        err
      );

      const detail = err.response?.data?.detail;

      let errorMessage = "Unable to place order.";

      if (Array.isArray(detail)) {

        errorMessage =
          detail[0]?.msg ||
          errorMessage;

      } else if (typeof detail === "string") {

        errorMessage = detail;
      }

      setMessage(errorMessage);
      setSeverity("error");
      setOpen(true);
    }
  }


  // ==============================
  // CLOSE SNACKBAR
  // ==============================

  function handleSnackbarClose() {
    setOpen(false);
  }


  // ==============================
  // CALCULATE SUBTOTAL
  // ==============================

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.Quantity || 0),
    0
  );


  // ==============================
  // GST
  // ==============================

  const gst = subtotal * 0.18;


  // ==============================
  // GRAND TOTAL
  // ==============================

  const grandTotal = subtotal + gst;
    // ==============================
  // LOADING STATE
  // ==============================

  if (loading) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center">
          Loading cart...
        </Typography>
      </Container>
    );
  }


  // ==============================
  // ERROR STATE
  // ==============================

  if (error) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }


  // ==============================
  // EMPTY CART
  // ==============================

  if (items.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <ShoppingCartCheckout
          sx={{
            fontSize: 80,
            color: "primary.main",
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Your Cart is Empty
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Looks like you haven't added anything to
          your cart yet.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/products")}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          CONTINUE SHOPPING
        </Button>
      </Container>
    );
  }


  // ==============================
  // MAIN CART UI
  // ==============================

  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >

      <Container maxWidth="xl">

        {/* =========================
            PAGE TITLE
        ========================== */}

        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: "2.2rem",
              md: "3rem",
            },
            fontWeight: 500,
            mb: 3,
          }}
        >
          Shopping Cart
        </Typography>


        <Grid
          container
          spacing={3}
          sx = {{
                  alignItems:"flex-start",
          }}
        >

          {/* =========================
              CART ITEMS
          ========================== */}

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >

            {items.map((item) => (

              <Card
                key={item.cart_id}
                sx={{
                  display: "flex",
                  mb: 2,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 2,

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >

                {/* =====================
                    PRODUCT IMAGE
                ====================== */}

                <CardMedia
                  component="img"
                  image={getProductImage(item.image)}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      productImages["../assets/products/no-image.png"];
                  }}
                  sx={{
                    height: 260,
                    objectFit: "contain",
                    p: 2,
                  }}
                />

                {/* =====================
                    PRODUCT DETAILS
                ====================== */}

                <CardContent
                  sx={{
                    flex: 1,
                    p: 3,
                  }}
                >

                  <Typography
                    variant="h5"
                    fontWeight={500}
                    gutterBottom
                  >
                    {item.product_name}
                  </Typography>


                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    ₹{" "}
                    {Number(
                      item.price || 0
                    ).toLocaleString()}
                  </Typography>


                  <Typography
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    Available Stock :{" "}
                    {item.stock ?? "N/A"}
                  </Typography>


                  {/* =================
                      QUANTITY
                  ================== */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >

                    <IconButton
                      color="primary"
                      onClick={() =>
                        updateQty(
                          item,
                          Number(item.Quantity) - 1
                        )
                      }
                      disabled={
                        Number(item.Quantity) <= 1
                      }
                    >
                      <Remove />
                    </IconButton>


                    <Paper
                      elevation={1}
                      sx={{
                        width: 105,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>
                        {item.Quantity}
                      </Typography>
                    </Paper>


                    <IconButton
                      color="primary"
                      onClick={() =>
                        updateQty(
                          item,
                          Number(item.Quantity) + 1
                        )
                      }
                      disabled={
                        item.stock != null &&
                        Number(item.Quantity) >=
                          Number(item.stock)
                      }
                    >
                      <Add />
                    </IconButton>

                  </Box>


                  {/* =================
                      SUBTOTAL
                  ================== */}

                  <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                  >
                    Subtotal : ₹{" "}
                    {(
                      Number(item.price || 0) *
                      Number(item.Quantity || 0)
                    ).toLocaleString()}
                  </Typography>


                  {/* =================
                      REMOVE BUTTON
                  ================== */}

                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() =>
                      handleRemoveClick(
                        item.cart_id
                      )
                    }
                    sx={{
                      px: 0,
                      "&:hover": {
                        backgroundColor:
                          "transparent",
                      },
                    }}
                  >
                    REMOVE PRODUCT
                  </Button>

                </CardContent>

              </Card>

            ))}

          </Grid>


          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 2,
                position: {
                  md: "sticky",
                },
                top: 20,
              }}
            >

              <CardContent sx={{ p: 3 }}>

                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Order Summary
                </Typography>


                <Divider sx={{ my: 3 }} />


                {/* ITEMS TOTAL */}

                <Box
                   sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>
                    Items Total
                  </Typography>

                  <Typography>
                    ₹{" "}
                    {subtotal.toLocaleString()}
                  </Typography>
                </Box>


                {/* GST */}

                <Box
                   sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>
                    GST (18%)
                  </Typography>

                  <Typography>
                    ₹{" "}
                    {gst.toLocaleString()}
                  </Typography>
                </Box>


                {/* DELIVERY */}

                <Box
                   sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>
                    Delivery
                  </Typography>

                  <Typography>
                    FREE
                  </Typography>
                </Box>


                <Divider sx={{ my: 3 }} />


                {/* GRAND TOTAL */}

                <Box
                   sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                  >
                    Grand Total
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary"
                  >
                    ₹{" "}
                    {grandTotal.toLocaleString()}
                  </Typography>
                </Box>


                {/* CHECKOUT BUTTON */}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={
                    <ShoppingCartCheckout />
                  }
                  onClick={placeOrder}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>

              </CardContent>

            </Card>

          </Grid>

        </Grid>

      </Container>


      {/* =========================
          REMOVE CONFIRMATION DIALOG
      ========================== */}

      <Dialog
        open={removeDialogOpen}
        onClose={() => {
          setRemoveDialogOpen(false);
          setSelectedProductId(null);
        }}
        maxWidth="xs"
        fullWidth
      >

        <DialogTitle
          sx={{
            fontWeight: 600,
          }}
        >
          Remove Product?
        </DialogTitle>


        <DialogContent>

          <DialogContentText
            sx={{
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Are you sure you want to remove this
            product from your cart?
          </DialogContentText>

        </DialogContent>


        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >

          <Button
            onClick={() => {
              setRemoveDialogOpen(false);
              setSelectedProductId(null);
            }}
          >
            CANCEL
          </Button>


          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={removeItem}
          >
            REMOVE
          </Button>

        </DialogActions>

      </Dialog>


      {/* =========================
          SNACKBAR
      ========================== */}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >

        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>

      </Snackbar>

    </Box>
  );
}


export default Cart;