import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {

    return (

        <Container maxWidth="md">

            <Box
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                }}
            >

                <Typography
                    variant="h1"
                    fontWeight="bold"
                    color="primary"
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                >
                    Oops! Page Not Found
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        mt: 2,
                        maxWidth: 500,
                    }}
                >
                    The page you are looking for doesn't exist or has been moved.
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 5,
                        px: 5,
                        py: 1.5,
                        borderRadius: 3,
                    }}
                >
                    Back to Home
                </Button>

            </Box>

        </Container>

    );

}

export default NotFound;