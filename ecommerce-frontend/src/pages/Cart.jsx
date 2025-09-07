// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Cart() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   // Fetch cart on page load
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data);
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/cart/remove/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Refresh cart after removal
//       fetchCart();
//     } catch (err) {
//       console.error("Error removing item:", err.response?.data || err.message);
//     }
//   };

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   if (loading) return <p>Loading cart...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               style={{
//                 border: "1px solid #ddd",
//                 marginBottom: "10px",
//                 padding: "10px",
//                 borderRadius: "5px",
//               }}
//             >
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//               <button onClick={() => handleRemove(item._id)}>Remove</button>
//             </div>
//           ))}
//           <h3>Total: ₹{totalPrice}</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ for navigation

  // Fetch cart on page load
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:4000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // cart document contains `items` array
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // refresh after removal
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.itemId?.price || 0) * item.quantity,
    0
  );

  if (loading) return <p>Loading cart...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Top-left Shop Now button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/items")}
        >
          🛍️ Shop Now
        </button>
      </div>

      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{item.itemId?.name}</h3>
              <p>Price: ₹{item.itemId?.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemove(item.itemId._id)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;

