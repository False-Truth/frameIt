import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailsPage from './pages/GalleryDetailsPage';
import ContactPage from './pages/ContactPage';
import BillingPage from './pages/BillingPage';
import DashboardPage from './pages/DashboardPage';
import DatabaseQueryPage from './pages/DatabaseQueryPage';
import SignInPage from './pages/SignInPage';
import SignOutPage from './pages/SignOutPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/database-query" element={<DatabaseQueryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:id" element={<GalleryDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signout" element={<SignOutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
