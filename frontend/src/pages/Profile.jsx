import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function Profile() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchProfile() {

      try {

        const response = await api.get("/Logged-in_user");

        setProfile(response.data);

      }

      catch (err) {

        setError("Unable to load profile.");

      }

      finally {

        setLoading(false);

      }

    }

    fetchProfile();

  }, []);

  function handleLogout() {

    logout();

    navigate("/login");

  }

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
          maxWidth: 1100,
          mx: "auto",
          p: 5,
          borderRadius: 4,
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Avatar
            sx={{
              width: 110,
              height: 110,
              fontSize: 40,
              bgcolor: "#1976d2",
              mb: 2,
            }}
          >

            {profile.name.charAt(0).toUpperCase()}

          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Welcome, {profile.name} 👋
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Manage your account information
          </Typography>

        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid
          container
          spacing={3}
        >
                  <Grid item xs={12} md={6}>

            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >

              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  Personal Information
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography
                  color="text.secondary"
                >
                  Full Name
                </Typography>

                <Typography
                  variant="h6"
                  mb={2}
                >
                  {profile.name}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Email Address
                </Typography>

                <Typography
                  variant="h6"
                  mb={2}
                >
                  {profile.email}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  User ID
                </Typography>

                <Typography
                  variant="h6"
                >
                  #{profile.id}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={6}>

            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >

              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  Account Overview
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >

                  <Typography>
                    Total Orders
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    color="primary"
                  >
                    {profile.total_orders}
                  </Typography>

                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >

                  <Typography>
                    Cart Items
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    color="success.main"
                  >
                    {profile.cart_items}
                  </Typography>

                </Box>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  size="large"
                  onClick={handleLogout}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </Button>

              </CardContent>

            </Card>

          </Grid>
                  </Grid>

      </Paper>

    </Box>

  );

}

export default Profile;