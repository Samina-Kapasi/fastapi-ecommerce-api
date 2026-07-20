// Cart.jsx
import { useEffect, useState } from "react";
import {Box,Typography,Grid,Card,CardContent,CardMedia,Button,IconButton,Paper,Divider,CircularProgress,Alert} from "@mui/material";
import {Add,Remove,Delete} from "@mui/icons-material";
import {Link} from "react-router-dom";
import api from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Cart(){
    const [items,setItems]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
    useEffect(()=>{loadCart();},[]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    async function loadCart(){
        try
            {setLoading(true);
                const r=await api.get("/cart/get");
            setItems(r.data);
            }
        catch(e){
            if(e.response?.status===404)
                setItems([]);
            else setError("Failed to load cart.");
        }finally{
            setLoading(false);
        }
    }
    async function updateQty(i,q){
        if(q<1)
            return;
        try{
            await api.put(`/cart/${i.cart_id}`,{quantity:q});
            loadCart();
        }catch(e){
            alert(e.response?.data?.detail||"Unable to update");
        }
    }
    async function removeItem(id){
        if(!window.confirm("Remove this item?"))
            return;
        await api.delete(`/cart/${id}`);
        loadCart();
    }
   async function placeOrder() {
    try {

        const response = await api.post("/order/add");

        console.log(response.data);

        setMessage("Order placed successfully!");
        setSeverity("success");
        setOpen(true);

        loadCart();

    } catch (e) {

        console.log(e.response);

        setMessage(e.response?.data?.detail || "Failed to place order");
        setSeverity("error");
        setOpen(true);

    }
}
    const subtotal=items.reduce((a,b)=>a+b.price*b.Quantity,0),gst=Math.round(subtotal*0.18),total=subtotal+gst;
    if(loading)
        return <Box sx={{display:"flex",justifyContent:"center",mt:10}}><CircularProgress/></Box>;
    if(error)
        return <Alert severity="error">{error}</Alert>;
    if(items.length===0)
        return <Box sx={{textAlign:"center",mt:10}}>
            <Typography 
            variant="h3">🛒
            </Typography>
            <Typography 
            variant="h4">
                Your Cart is Empty
                </Typography>
            <Button 
            component={Link} to="/products" variant="contained" sx={{mt:3}}>
                Continue Shopping
                </Button>
            </Box>;
    return <Box 
    sx={{p:4,bgcolor:"#f5f5f5",minHeight:"100vh"}}>
        <Typography
         variant="h4" fontWeight="bold" mb={3}>
            Shopping Cart
            </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>{items.map(i=><Card key={i.cart_id} sx={{mb:2}}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <CardMedia component="img" height="220" image={i.image||"https://via.placeholder.com/300x220?text=No+Image"}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <CardContent>
                <Typography variant="h5">{i.product_name}</Typography>
                <Typography color="primary">₹ {i.price}</Typography>
                <Box 
                sx={{display:"flex",alignItems:"center",gap:1,my:2}}>
                    <IconButton onClick={()=>updateQty(i,i.quantity-1)}>
                        <Remove/></IconButton>
                <Typography>{i.Quantity}</Typography>
                <IconButton disabled={i.Quantity>=i.stock} onClick={()=>updateQty(i,i.Quantity+1)}>
                    <Add/></IconButton></Box><Typography>
                        Subtotal: ₹ {i.price*i.Quantity}</Typography>
                <Button color="error" startIcon={<Delete/>} onClick={()=>removeItem(i.cart_id)}>Remove
                </Button></CardContent></Grid></Grid></Card>)}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{p:3}}>
                    <Typography variant="h5">Order Summary</Typography>
                    <Divider sx={{my:2}}/><Typography>Items: ₹ {subtotal}</Typography>
                    <Typography>GST: ₹ {gst}</Typography><Typography>Delivery: FREE</Typography>
                    <Divider sx={{my:2}}/>
                    <Typography fontWeight="bold">
                        Grand Total: ₹ {total}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt:3 }}
                            onClick={placeOrder}
                        >
                            Proceed To Checkout
                        </Button>
                            </Paper>
                            </Grid>
                            </Grid>
                            <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <MuiAlert
                        onClose={() => setOpen(false)}
                        severity={severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </MuiAlert>
                </Snackbar>
                            </Box>;
}
