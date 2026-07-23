import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        mb={5}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="h5" mb={2}>
              📦 Products
            </Typography>

            <Typography color="text.secondary" mb={3}>
              Manage all products.
            </Typography>

            <Button
              component={Link}
              to="/admin/products"
              variant="contained"
              fullWidth
            >
              Manage Products
            </Button>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Admin;