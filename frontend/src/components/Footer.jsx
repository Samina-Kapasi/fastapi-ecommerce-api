import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";

function Footer() {

  return (

    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "white",
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >

      <Container maxWidth="lg">

        <Grid container spacing={5}>

          {/* Company */}

          <Grid size={{ xs:12 , md:4 }}>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              ShopEase
            </Typography>

            <Typography
              color="grey.400"
              sx={{
                lineHeight: 1.8,
              }}
            >
              ShopEase is a modern e-commerce platform built using
              React, FastAPI and MySQL. Our goal is to provide a fast,
              secure and enjoyable shopping experience.
            </Typography>

          </Grid>
                    {/* Quick Links */}

          <Grid size = {{xs:12 , sm:6 , md:4 }}>

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Quick Links
            </Typography>

            <Typography
              component={Link}
              to="/"
              sx={{
                display: "block",
                color: "grey.400",
                textDecoration: "none",
                mb: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Home
            </Typography>

            <Typography
              component={Link}
              to="/products"
              sx={{
                display: "block",
                color: "grey.400",
                textDecoration: "none",
                mb: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Products
            </Typography>

            <Typography
              component={Link}
              to="/about"
              sx={{
                display: "block",
                color: "grey.400",
                textDecoration: "none",
                mb: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              About Us
            </Typography>

            <Typography
              component={Link}
              to="/contact"
              sx={{
                display: "block",
                color: "grey.400",
                textDecoration: "none",
                mb: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Contact Us
            </Typography>

            <Typography
              component={Link}
              to="/faq"
              sx={{
                display: "block",
                color: "grey.400",
                textDecoration: "none",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              FAQ
            </Typography>

          </Grid>

          {/* Contact Information */}

          <Grid size={{ xs:12 , sm:6 , md:4 }}>

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Contact
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >

              <LocationOnIcon
                sx={{
                  mr: 1,
                  color: "#42A5F5",
                }}
              />

              <Typography color="grey.400">
                Rajkot, Gujarat, India
              </Typography>

            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >

              <PhoneIcon
                sx={{
                  mr: 1,
                  color: "#42A5F5",
                }}
              />

              <Typography color="grey.400">
                +91 98765 43210
              </Typography>

            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >

              <EmailIcon
                sx={{
                  mr: 1,
                  color: "#42A5F5",
                }}
              />

              <Typography color="grey.400">
                support@shopease.com
              </Typography>

            </Box>

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Follow Us
            </Typography>

            <IconButton
              color="inherit"
              href="https://github.com/Samina-Kapasi"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/samina-kapasi/"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>

          </Grid>
                  </Grid>

        {/* Bottom Footer */}

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            textAlign: "center",
          }}
        >

          <Typography
            color="grey.500"
          >
            © {new Date().getFullYear()} ShopEase. All Rights Reserved.
          </Typography>

          <Typography
            color="grey.500"
            sx={{ mt: 1 }}
          >
            Designed & Developed by <strong>Samina Kapasi</strong>
          </Typography>

        </Box>

      </Container>

    </Box>

  );

}

export default Footer;