import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "white",
        mt: 8,
        pt: 6,
        pb: 3,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
                    {/* Company Section */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 2,
              }}
            >
              ShopEase
            </Typography>

            <Typography
              sx={{
                color: "grey.400",
                lineHeight: 2,
                mb: 3,
              }}
            >
              ShopEase is a modern e-commerce platform built with React,
              FastAPI and MySQL. Our mission is to provide a fast, secure
              and enjoyable online shopping experience with high-quality
              products and excellent customer service.
            </Typography>

            <Typography
              sx={{
                color: "#42A5F5",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Shop Smart. Shop Easy.
            </Typography>
          </Grid>

          {/* Quick Links */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
              }}
            >
              Quick Links
            </Typography>

            <Link
              href="/"
              underline="none"
              color="grey.400"
              sx={{
                display: "block",
                mb: 1.5,
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  pl: 1,
                },
              }}
            >
              Home
            </Link>

            <Link
              href="/products"
              underline="none"
              color="grey.400"
              sx={{
                display: "block",
                mb: 1.5,
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  pl: 1,
                },
              }}
            >
              Products
            </Link>

            <Link
              href="/about"
              underline="none"
              color="grey.400"
              sx={{
                display: "block",
                mb: 1.5,
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  pl: 1,
                },
              }}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              underline="none"
              color="grey.400"
              sx={{
                display: "block",
                mb: 1.5,
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  pl: 1,
                },
              }}
            >
              Contact Us
            </Link>

            <Link
              href="/faq"
              underline="none"
              color="grey.400"
              sx={{
                display: "block",
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  pl: 1,
                },
              }}
            >
              FAQ
            </Link>
          </Grid>
                    {/* Contact Section */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2 }}
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
                  color: "#42A5F5",
                  mr: 1,
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
                  color: "#42A5F5",
                  mr: 1,
                }}
              />

              <Link
                href="tel:+919876543210"
                underline="none"
                color="grey.400"
                sx={{
                  transition: "0.3s",
                  "&:hover": {
                    color: "#42A5F5",
                  },
                }}
              >
                +91 98765 43210
              </Link>
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
                  color: "#42A5F5",
                  mr: 1,
                }}
              />

              <Link
                href="mailto:support@shopease.com"
                underline="none"
                color="grey.400"
                sx={{
                  transition: "0.3s",
                  "&:hover": {
                    color: "#42A5F5",
                  },
                }}
              >
                support@shopease.com
              </Link>
            </Box>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Follow Us
            </Typography>

            <IconButton
              href="https://github.com/Samina-Kapasi"
              target="_blank"
              sx={{
                color: "white",
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              href="https://www.linkedin.com/in/samina-kapasi/"
              target="_blank"
              sx={{
                color: "white",
                transition: "0.3s",
                "&:hover": {
                  color: "#42A5F5",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>

        </Grid>

        {/* Bottom Footer */}

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            textAlign: "center",
          }}
        >
          <Typography color="grey.500">
            © {new Date().getFullYear()} ShopEase. All Rights Reserved.
          </Typography>

          <Typography
            color="grey.500"
            sx={{ mt: 1 }}
          >
            Made with ❤️ using React, FastAPI & MySQL
          </Typography>

          <Typography
            color="grey.500"
            sx={{ mt: 1 }}
          >
            Designed & Developed by{" "}
            <Box
              component="span"
              sx={{
                color: "#42A5F5",
                fontWeight: "bold",
              }}
            >
              Samina Kapasi
            </Box>
          </Typography>
        </Box>

        {/* Scroll To Top Button */}

        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 25,
            right: 25,
            bgcolor: "#1976d2",
            color: "white",
            width: 50,
            height: 50,
            boxShadow: 4,
            transition: "0.3s",
            "&:hover": {
              bgcolor: "#1565c0",
              transform: "translateY(-4px)",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>

      </Container>
    </Box>
  );
}

export default Footer;