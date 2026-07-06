import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 40px",
                background: "#1976d2",
                color: "white"
            }}
        >
            <h2>E-Commerce</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px"
                }}
            >
                <Link to="/" style={{ color: "white" }}>Home</Link>

                <Link to="/products" style={{ color: "white" }}>Products</Link>

                <Link to="/cart" style={{ color: "white" }}>Cart</Link>

                <Link to="/orders" style={{ color: "white" }}>Orders</Link>

                <Link to="/profile" style={{ color: "white" }}>Profile</Link>

                <Link to="/login" style={{ color: "white" }}>Login</Link>
            </div>

        </nav>
    );
}

export default Navbar;