import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleRegister() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.post("/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

  if (err.response) {

        const data = err.response.data;

        // FastAPI validation errors (422)
        if (data.detail && Array.isArray(data.detail)) {

        if (data.detail[0].loc.includes("email")) {
            setError("Please enter a valid email address.");
        } else {
            setError(data.detail[0].msg);
        }

        }

        // Normal HTTPException
        else if (data.detail) {
        setError(data.detail);
        }

        else {
        setError("Registration failed.");
        }

    } else {
        setError("Server is not responding.");
    }


    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#43cea2,#185a9d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 450,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
        >
          Create Account 🎉
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={3}
        >
          Join our E-Commerce Store
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 3,
          }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;