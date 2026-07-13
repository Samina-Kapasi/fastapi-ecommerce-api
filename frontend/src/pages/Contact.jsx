import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

function Contact() {

  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {

    e.preventDefault();

    setSuccess(true);

  }

  return (

    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        py: 6,
      }}
    >

      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(135deg,#1565C0,#42A5F5)",
          color: "white",
          textAlign: "center",
          py: 8,
          borderRadius: "0 0 40px 40px",
          mb: 6,
        }}
      >

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Contact Us
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            opacity: 0.9,
          }}
        >
          We'd love to hear from you. Get in touch with our team.
        </Typography>

      </Box>

      <Container maxWidth="lg">

        <Grid container spacing={4}>
                  {/* Contact Information */}

          <Grid item xs={12} md={5}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Get In Touch
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Have a question, suggestion, or need help with an order?
                We'd be happy to hear from you.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >

                <LocationOnIcon
                  color="primary"
                  sx={{ mr: 2 }}
                />

                <Box>

                  <Typography fontWeight="bold">
                    Address
                  </Typography>

                  <Typography color="text.secondary">
                    Rajkot, Gujarat, India
                  </Typography>

                </Box>

              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >

                <PhoneIcon
                  color="primary"
                  sx={{ mr: 2 }}
                />

                <Box>

                  <Typography fontWeight="bold">
                    Phone
                  </Typography>

                  <Typography color="text.secondary">
                    +91 98765 43210
                  </Typography>

                </Box>

              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >

                <EmailIcon
                  color="primary"
                  sx={{ mr: 2 }}
                />

                <Box>

                  <Typography fontWeight="bold">
                    Email
                  </Typography>

                  <Typography color="text.secondary">
                    support@shopease.com
                  </Typography>

                </Box>

              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <AccessTimeIcon
                  color="primary"
                  sx={{ mr: 2 }}
                />

                <Box>

                  <Typography fontWeight="bold">
                    Working Hours
                  </Typography>

                  <Typography color="text.secondary">
                    Monday - Saturday
                  </Typography>

                  <Typography color="text.secondary">
                    9:00 AM - 7:00 PM
                  </Typography>

                </Box>

              </Box>

            </Paper>

          </Grid>

          {/* Contact Form */}

          <Grid item xs={12} md={7}>

            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Send Us a Message
              </Typography>

              {success && (

                <Alert
                  severity="success"
                  sx={{ mb: 3 }}
                >
                  Thank you! Your message has been sent successfully.
                </Alert>

              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
              >

                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Subject"
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Message"
                  margin="normal"
                  multiline
                  rows={5}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                  }}
                >
                  Send Message
                </Button>

              </Box>

            </Paper>

          </Grid>
                  </Grid>

        {/* Social Media Section */}

        <Paper
          elevation={4}
          sx={{
            mt: 6,
            p: 5,
            borderRadius: 4,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Connect With Us
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,
            }}
          >
            Stay connected with ShopEase for the latest products,
            offers, and updates.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >

            <Button
              variant="outlined"
              color="primary"
            >
              GitHub
            </Button>

            <Button
              variant="outlined"
              color="primary"
            >
              LinkedIn
            </Button>

            <Button
              variant="outlined"
              color="primary"
            >
              Instagram
            </Button>

            <Button
              variant="outlined"
              color="primary"
            >
              Facebook
            </Button>

          </Box>

        </Paper>

        {/* Bottom Section */}

        <Box
          sx={{
            mt: 6,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            Thank You for Visiting ShopEase ❤️
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
            }}
          >
            We value every customer and strive to provide the best online
            shopping experience. If you have any questions or feedback,
            we're always here to help.
          </Typography>

        </Box>

      </Container>

    </Box>

  );

}

export default Contact;