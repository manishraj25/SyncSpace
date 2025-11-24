import { Route, Routes, useLocation } from 'react-router-dom';
import HomeNavbar from './components/HomeNavbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
      return <HomeNavbar />;
    }
    return null;
  };

  const renderFooter = () => {
    if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
      return <Footer />;
    }
    return null;
  };

  return (
    <>
      {renderNavbar()}
      <div className="min-h-[81.4vh] bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {renderFooter()}
    </>
  )
};

export default App;
