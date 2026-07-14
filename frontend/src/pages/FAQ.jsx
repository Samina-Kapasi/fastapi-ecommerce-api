import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQ() {

  return (

    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        pb: 8,
      }}
    >

      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "white",
          py: 8,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          textAlign: "center",
          mb: 6,
        }}
      >

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Frequently Asked Questions
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            opacity: 0.9,
          }}
        >
          Find answers to the most common questions about ShopEase.
        </Typography>

      </Box>

      <Container maxWidth="md">

        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
                  <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Everything you need to know about shopping with ShopEase.
          </Typography>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                How do I create an account?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                Click on the Register button in the navigation bar,
                fill in your details, and create your account. Once
                registered, you can log in and start shopping.
              </Typography>

            </AccordionDetails>

          </Accordion>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                How can I add products to my cart?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                Open any product, click the "Add To Cart" button,
                choose the quantity, and the product will be added
                to your shopping cart.
              </Typography>

            </AccordionDetails>

          </Accordion>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                Can I update or remove items from my cart?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                Yes. Visit the Cart page where you can increase,
                decrease, or remove products before placing your order.
              </Typography>

            </AccordionDetails>

          </Accordion>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                How do I place an order?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                After reviewing your cart, click the "Place Order"
                button. Your order will be created successfully if
                all products are in stock.
              </Typography>

            </AccordionDetails>

          </Accordion>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                Can I cancel my order?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                Yes. Go to the Orders page, open the order details,
                and click the Cancel Order button if the order is
                still eligible for cancellation.
              </Typography>

            </AccordionDetails>

          </Accordion>

          <Accordion>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography fontWeight="bold">
                Is my payment information secure?
              </Typography>

            </AccordionSummary>

            <AccordionDetails>

              <Typography color="text.secondary">
                Yes. ShopEase is designed with secure authentication
                and follows best practices to protect user data and
                account information.
              </Typography>

            </AccordionDetails>

          </Accordion>
                    {/* Need More Help */}

          <Paper
            elevation={3}
            sx={{
              mt: 5,
              p: 5,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(135deg,#1565C0,#42A5F5)",
              color: "white",
            }}
          >

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Still Have Questions?
            </Typography>

            <Typography
              sx={{
                mb: 4,
                maxWidth: 650,
                mx: "auto",
                opacity: 0.95,
              }}
            >
              Our support team is always ready to help you. If you couldn't
              find the answer you were looking for, feel free to contact us.
            </Typography>

            <Button
              variant="contained"
              color="inherit"
              href="/contact"
              sx={{
                color: "#1565C0",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#ECEFF1",
                },
              }}
            >
              Contact Support
            </Button>

          </Paper>

      </Paper>

    </Container>

  </Box>

);

}

export default FAQ;