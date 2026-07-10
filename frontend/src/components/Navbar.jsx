import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        background: "#fff",
        color: "#000",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}

        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
          }}
        >
          ShopEase
        </Typography>

        {/* Navigation */}

        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>

          <Button component={Link} to="/products" color="inherit">
            Products
          </Button>

          {isLoggedIn && (
            <>
              <Button component={Link} to="/orders" color="inherit">
                Orders
              </Button>

              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
            </>
          )}
        </Box>

        {/* Search */}

        <TextField
          size="small"
          placeholder="Search Products..."
          sx={{
            width: 300,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/orders"
                  onClick={handleClose}
                >
                  Orders
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;