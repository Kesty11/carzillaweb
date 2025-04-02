import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import SellCarPage from './pages/SellCarPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CarsListPage from './pages/CarsListPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import MyListingsPage from './components/MyListingsPage';
import TestPage from './components/TestPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthListener from './components/AuthListener';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from './contexts/FirestoreContext';

function App() {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <AuthListener />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="cars" element={<CarsListPage />} />
              <Route path="car/:id" element={<CarDetailPage />} />
              <Route path="sell-car" element={<SellCarPage />} />
              <Route path="edit-car/:id" element={<SellCarPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:id" element={<BlogPostPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="my-listings" element={<MyListingsPage />} />
              <Route path="test" element={<TestPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
