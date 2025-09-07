import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./sign-up/SignUp"
import SignIn from './sign-in/SignIn';
import Items from './pages/Items';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />}/>
        <Route path="/items" element={<Items />} />
        <Route path="/cart" element={<Cart />} /> 
        {/* <Route path="/login" element={<Login />} />       
       */}
      </Routes>
    </Router>
  );
}

export default App;
