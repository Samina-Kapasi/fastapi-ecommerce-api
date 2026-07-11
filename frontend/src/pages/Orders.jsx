import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);

      const response = await api.get("/order/get");

      setOrders(response.data);

      setError("");
    } catch (err) {
      if (err.response?.status === 404) {
        setOrders([]);
      } else {
        setError("Unable to load orders.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function cancelOrder(orderId) {
    try {
      await api.put(`/order/${orderId}/cancel`);

      fetchOrders();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Unable to cancel order."
      );
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

  if (orders.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <ShoppingBagIcon
          sx={{
            fontSize: 90,
            color: "#1976d2",
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
        >
          No Orders Yet
        </Typography>

        <Typography
          color="text.secondary"
          mt={2}
        >
          Looks like you haven't placed any orders.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 5,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        My Orders
      </Typography>

      <Grid container spacing={3}>
                {orders.map((order) => (

          <Grid
            item
            xs={12}
            key={order.order_id}
          >

            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
              }}
            >

              <CardContent>

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                >

                  {/* Left Section */}

                  <Grid
                    item
                    xs={12}
                    md={8}
                  >

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      Order #{order.order_id}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      Customer : {order.user_name}
                    </Typography>

                    <Typography
                      color="primary"
                      mt={1}
                      fontWeight="bold"
                    >
                      Total Price : ₹ {order.total_price}
                    </Typography>

                  </Grid>

                  {/* Right Section */}

                  <Grid
                    item
                    xs={12}
                    md={4}
                    textAlign={{
                      xs: "left",
                      md: "right",
                    }}
                  >

                    <Chip
                      label={order.status}
                      color={
                        order.status === "Pending"
                          ? "warning"
                          : order.status === "Cancelled"
                          ? "error"
                          : "success"
                      }
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    />

                    <Box>

                      <Button
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          mr: 2,
                          mb: {
                            xs: 2,
                            md: 0,
                          },
                        }}
                        onClick={() =>
                          navigate(
                            `/orders/${order.order_id}`
                          )
                        }
                      >
                        View Details
                      </Button>

                      {order.status !== "Cancelled" && (

                        <Button
                          color="error"
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() =>
                            cancelOrder(order.order_id)
                          }
                        >
                          Cancel
                        </Button>

                      )}

                    </Box>

                  </Grid>

                </Grid>

              </CardContent>

            </Card>

          </Grid>

        ))}
              </Grid>

    </Box>

  );

}

export default Orders;