import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CartProvider } from "./pages/Store/Cart";
import { StrictMode } from "react";
createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
=======

    <CartProvider>
      <App />
    </CartProvider>

>>>>>>> 4dc1b09f92d0e19d6696ecc47c26cb6055d56be5
);
