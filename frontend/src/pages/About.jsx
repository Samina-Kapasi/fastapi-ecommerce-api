import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function About() {
  return (
    <Box
      sx={{
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
        pb: 8,
      }}
    >

      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "white",
          py: 10,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          boxShadow: 4,
        }}
      >

        <Container maxWidth="lg">

          <Grid
            container
            spacing={5}
            alignItems="center"
          >

            <Grid item xs={12} md={7}>

              <Typography
                variant="h2"
                fontWeight="bold"
              >
                About ShopEase
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  opacity: 0.95,
                  lineHeight: 1.8,
                }}
              >
                ShopEase is a modern online shopping platform built with
                React, FastAPI and MySQL. Our goal is to make online
                shopping fast, secure and enjoyable for everyone.
              </Typography>

              <Button
                component={Link}
                to="/products"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 5,
                  bgcolor: "white",
                  color: "#1565C0",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  "&:hover": {
                    bgcolor: "#ECEFF1",
                  },
                }}
              >
                Explore Products
              </Button>

            </Grid>

            <Grid
              item
              xs={12}
              md={5}
              textAlign="center"
            >

              <ShoppingBagIcon
                sx={{
                  fontSize: 220,
                  opacity: 0.95,
                }}
              />

            </Grid>

          </Grid>

        </Container>

      </Box>
            {/* Why Choose ShopEase */}

      <Container maxWidth="lg" sx={{ mt: 8 }}>

        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Why Choose ShopEase?
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{
            mb: 6,
            maxWidth: 700,
            mx: "auto",
          }}
        >
          We provide an amazing shopping experience with quality products,
          secure payments and lightning-fast delivery.
        </Typography>

        <Grid container spacing={4}>

          <Grid item xs={12} sm={6} md={3}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 10,
                },
              }}
            >

              <Typography fontSize={55}>
                🛍️
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                mt={2}
              >
                Premium Products
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Carefully selected products with the best quality.
              </Typography>

            </Paper>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 10,
                },
              }}
            >

              <Typography fontSize={55}>
                🚚
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                mt={2}
              >
                Fast Delivery
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Get your favourite products delivered quickly.
              </Typography>

            </Paper>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 10,
                },
              }}
            >

              <Typography fontSize={55}>
                🔒
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                mt={2}
              >
                Secure Payment
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Every payment is protected using secure technology.
              </Typography>

            </Paper>

          </Grid>

          <Grid item xs={12} sm={6} md={3}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 10,
                },
              }}
            >

              <Typography fontSize={55}>
                🎧
              </Typography>

              <Typography
                variant="h6"
                fontWeight="bold"
                mt={2}
              >
                24/7 Support
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Our support team is always ready to help you.
              </Typography>

            </Paper>

          </Grid>

        </Grid>
                {/* Statistics */}

        <Box sx={{ mt: 10 }}>

          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            ShopEase at a Glance
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  500+
                </Typography>

                <Typography color="text.secondary">
                  Products
                </Typography>

              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <Typography variant="h3" color="success.main" fontWeight="bold">
                  1K+
                </Typography>

                <Typography color="text.secondary">
                  Happy Customers
                </Typography>

              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <Typography variant="h3" color="secondary" fontWeight="bold">
                  24/7
                </Typography>

                <Typography color="text.secondary">
                  Customer Support
                </Typography>

              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                }}
              >
                <Typography variant="h3" color="warning.main" fontWeight="bold">
                  ★4.9
                </Typography>

                <Typography color="text.secondary">
                  Customer Rating
                </Typography>

              </Paper>
            </Grid>

          </Grid>

        </Box>

        {/* Mission */}

        <Paper
          elevation={5}
          sx={{
            mt: 10,
            p: 5,
            borderRadius: 5,
            background: "#ffffff",
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Our Mission
          </Typography>

          <Typography
            color="text.secondary"
            lineHeight={2}
          >
            Our mission is to make online shopping simple, secure, and
            enjoyable for everyone. We continuously strive to provide
            high-quality products, excellent customer service, fast delivery,
            and a seamless shopping experience that customers can trust.
          </Typography>

        </Paper>

        {/* Thank You */}

        <Paper
          elevation={5}
          sx={{
            mt: 6,
            p: 5,
            borderRadius: 5,
            textAlign: "center",
            background:
              "linear-gradient(135deg,#1565C0,#42A5F5)",
            color: "white",
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Thank You for Choosing ShopEase ❤️
          </Typography>

          <Typography
            sx={{
              maxWidth: 750,
              mx: "auto",
              opacity: 0.95,
              lineHeight: 1.8,
            }}
          >
            Every order you place motivates us to improve and serve you
            better. Thank you for trusting ShopEase as your online shopping
            destination. We look forward to making every shopping experience
            memorable.
          </Typography>

        </Paper>

      </Container>

    </Box>
  );
}

export default About;