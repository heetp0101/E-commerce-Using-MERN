// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Items() {
//   const [items, setItems] = useState([]);
//   const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "" });

//   // Fetch items
//   const fetchItems = async () => {
//     try {
//       const res = await API.get("/items", { params: filters });
//       setItems(res.data);
//     } catch (err) {
//       console.error("Failed to fetch items", err);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [filters]);

//   // Handle filter changes
//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Items</h2>

//       {/* Filters */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           name="category"
//           placeholder="Category"
//           value={filters.category}
//           onChange={handleChange}
//         />
//         <input
//           name="minPrice"
//           type="number"
//           placeholder="Min Price"
//           value={filters.minPrice}
//           onChange={handleChange}
//         />
//         <input
//           name="maxPrice"
//           type="number"
//           placeholder="Max Price"
//           value={filters.maxPrice}
//           onChange={handleChange}
//         />
//         <button onClick={fetchItems}>Apply Filters</button>
//       </div>

//       {/* Items list */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
//         {items.map((item) => (
//           <div key={item._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
//             <h3>{item.name}</h3>
//             <p>Category: {item.category}</p>
//             <p>Price: ₹{item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";

// const Items = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/items");
//         if (!res.ok) throw new Error("Failed to fetch items");
//         const data = await res.json();
//         setItems(data);

//         console.log(" data name : ",data[1]);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const addToCart = async (itemId) => {
//     try {

//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:4000/api/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
//         body: JSON.stringify({ itemId, quantity: 1 }),
//       });

//       if (!res.ok) throw new Error("Failed to add item to cart");

//       setMessage("Item added to cart ✅");
//       setTimeout(() => setMessage(""), 2000);
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       setMessage("❌ Failed to add item to cart");
//       setTimeout(() => setMessage(""), 2000);
//     }
//   };

//   if (loading) return <p>Loading items...</p>;

//   return (
//     <div>
//       <h2>Available Items</h2>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       <ul>
//         {items.map((item) => (
//           <li key={item._id} style={{ marginBottom: "12px" }}>
//             <strong>{item.name}</strong> - ${item.price}
//             <button
//               style={{ marginLeft: "10px" }}
//               onClick={() => addToCart(item._id)}
//             >
//               Add to Cart
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Items;


// import React, { useEffect, useState } from "react";
// import "./Items.css"; // Import the CSS file

// const Items = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");


//   const itemImages = {
//     "iPhone 15 pro": "/iphone-15-pro.jpg",
//     "Maruti Suzuki 800": "/maruti-suzuki-800.png",
//     "Samsung Bluetooth Wireless Headphone": "/samsung-wireless-headphone.jpg",
//   };

//   console.log(itemImages["iPhone 15 pro"]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/items");
//         if (!res.ok) throw new Error("Failed to fetch items");
//         const data = await res.json();
//         setItems(data);
//         console.log(" data : ", data);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const addToCart = async (itemId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:4000/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ itemId, quantity: 1 }),
//       });

//       if (!res.ok) throw new Error("Failed to add item to cart");

//       setMessage("Item added to cart ✅");
//       setTimeout(() => setMessage(""), 2000);
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       setMessage("❌ Failed to add item to cart");
//       setTimeout(() => setMessage(""), 2000);
//     }
//   };

//   if (loading) return <p className="loading-text">Loading items...</p>;

//   return (
//     <div className="container">
//       <h2 className="title">Shop Our Products</h2>
//       {message && <p className="message">{message}</p>}

//       <div className="grid">
//         {items.map((item) => (
//           <div className="card" key={item._id}>
//             <div className="image-container">
//               <img
//                 src={itemImages[item.name]}  
//                 className="product-image"
//               />
//               {/* {item.category && <span className="badge">{item.category}</span>} */}
//             </div>

//             <h3 className="product-name">{item.name}</h3>
//             <p className="product-price">₹{item.price}</p>

//             <button className="add-btn" onClick={() => addToCart(item._id)}>
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Items;








import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook
import "./Items.css"; // Import the CSS file
import { API_BASE } from "../config";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ for navigation

  // Define item images (relative to public folder)
  const itemImages = {
    "iPhone 15 pro": "/iphone-15-pro.jpg",
    "Maruti Suzuki 800": "/maruti-suzuki-800.png",
    "Boat Wireless Headphone": "/wireless-headset-2.jpg",
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/items`);
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add item to cart");

      setMessage("Item added to cart ✅");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("❌ Failed to add item to cart");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/"); // redirect to login page
  };

  if (loading) return <p className="loading-text">Loading items...</p>;

  return (
    <div className="container">
      {/* ✅ Top-right buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "20px" }}>
        <button className="view-cart-btn" onClick={() => navigate("/cart")}>
          🛒 View Cart
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <h2 className="title">Shop Our Products</h2>
      {message && <p className="message">{message}</p>}

      <div className="grid">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <div className="image-container">
              <img
                src={itemImages[item.name]}
                alt={item.name}
                className="product-image"
              />
              {/* {item.category && <span className="badge">{item.category}</span>} */}
            </div>

            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">₹{item.price}</p>

            <button className="add-btn" onClick={() => addToCart(item._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
