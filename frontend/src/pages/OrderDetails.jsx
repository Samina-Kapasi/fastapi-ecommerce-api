import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function OrderDetails() {

  const { order_id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchOrder() {

      try {

        const response = await api.get(`/orders/${order_id}`);

        setOrder(response.data);

      } catch (err) {

        setError("Unable to load order details.");

      } finally {

        setLoading(false);

      }

    }

    fetchOrder();

  }, [order_id]);

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >

        <CircularProgress />

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

  return (

    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        py: 5,
      }}
    >

      <Paper
        elevation={4}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 4,
          borderRadius: 4,
        }}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Order Details
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Complete information about your order.
        </Typography>

        <Grid
          container
          spacing={3}
          mb={4}
        >

          <Grid size={{xs:12 , md:3 }}>

            <Card>

              <CardContent>

                <Typography color="text.secondary">
                  Order ID
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  #{order.order_id}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid size={{xs:12, md:3 }}>

            <Card>

              <CardContent>

                <Typography color="text.secondary">
                  Status
                </Typography>

                <Chip
                  label={order.status}
                  color={
                    order.status === "Pending"
                      ? "warning"
                      : order.status === "Cancelled"
                      ? "error"
                      : "success"
                  }
                  sx={{ mt: 1 }}
                />

              </CardContent>

            </Card>

          </Grid>

          <Grid size = {{xs:12, md:3}}>

            <Card>

              <CardContent>

                <Typography color="text.secondary">
                  Order Date
                </Typography>

                <Typography fontWeight="bold">
                  {new Date(order.created_at).toLocaleString()}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid size={{xs:12, md:3}}>

            <Card>

              <CardContent>

                <Typography color="text.secondary">
                  Total Amount
                </Typography>

                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                >
                  ₹ {order.total_price}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        </Grid>

        <Divider sx={{ mb: 4 }} />

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Ordered Products
        </Typography>

        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 3,
          }}
        >

          <Table>

            <TableHead>

              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Product
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Quantity
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Price
                </TableCell>

                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Total
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
                              {order.products.map((product, index) => (

                <TableRow
                  key={index}
                  hover
                >

                  <TableCell>

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/80"
                      }
                      alt={product.product_name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />

                  </TableCell>

                  <TableCell>

                    <Typography
                      fontWeight="bold"
                    >
                      {product.product_name}
                    </Typography>

                  </TableCell>

                  <TableCell align="center">
                    {product.quantity}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {product.price}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {product.price * product.quantity}
                  </TableCell>

                </TableRow>

              ))}
                          </TableBody>

          </Table>

        </TableContainer>

        <Grid
          container
          spacing={4}
          sx={{
            mt: 4,
          }}
        >

          <Grid size={{xs:12 ,md:7}}>
          </Grid>

          <Grid size={{xs:12 , md:5}}>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Payment Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >

                <Typography>
                  Order Total
                </Typography>

                <Typography fontWeight="bold">
                  ₹ {order.total_price}
                </Typography>

              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >

                <Typography>
                  Delivery Charges
                </Typography>

                <Typography
                  color="success.main"
                  fontWeight="bold"
                >
                  FREE
                </Typography>

              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
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
                  ₹ {order.total_price}
                </Typography>

              </Box>

            </Paper>

          </Grid>

        </Grid>

      </Paper>

    </Box>

  );

}

export default OrderDetails;