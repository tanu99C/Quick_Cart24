import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "./pages/Home.jsx";       // Home page (neutral introduction)
import Login from "./pages/login.js";        // Login page
import Auth from "./pages/auth.js";          // Auth checker page
import Store from "./pages/Store.jsx";       // Store page for regular users
import Admin from "./pages/Admin.jsx";       // Admin page for sellers
import Navbar from "./components/Navbar.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { useShoppingItems } from "./context/ShoppingItemsContext.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const { products } = useShoppingItems();

  // If products is null (for example, if the Supabase DB is paused), show a message.
  if (!products)
    return (
      <div
        className="d-flex gap-5 text-center text-muted flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h4>
          Sorry, the database is paused 😢
          <br />
          try again later.
        </h4>
      </div>
    );

  return (
    <>
      {products.length <= 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <Navbar />
          <ShoppingCart />
          <Container className="bg-light">
            <Routes>
              {/* Home page as the entry point */}
              <Route path="/" element={<Home />} />
              {/* Login page for authentication */}
              <Route path="/login" element={<Login />} />
              {/* Auth page to process login state and redirect */}
              <Route path="/auth" element={<Auth />} />
              {/* Store page for regular users */}
              <Route path="/store" element={<Store />} />
              {/* Protected Admin page for sellers */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="seller">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* Catch-all: Redirect unknown paths to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Container>
          <ToastContainer
            pauseOnFocusLoss={false}
            position="bottom-right"
            draggablePercent={15}
          />
          <Footer />
        </>
      )}
    </>
  );
}
