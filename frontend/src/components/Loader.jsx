import { Box, CircularProgress, Typography } from "@mui/material";

function Loader() {

    return (

        <Box
            sx={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
            }}
        >

            <CircularProgress size={60} />

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Loading...
            </Typography>

        </Box>

    );

}

export default Loader;