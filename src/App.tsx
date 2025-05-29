import { Provider } from "react-redux";
import { store } from "./store"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}
