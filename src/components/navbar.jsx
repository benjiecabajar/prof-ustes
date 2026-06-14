import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/home") return null;

  // Navigation links for sections on the landing page


  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
        UST<span>e</span>S
      </div>


      <div className="nav-buttons">
        {pathname !== "/login" && (
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        )}
        {pathname !== "/signup" && (
          <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
        )}
      </div>
    </nav>
  );
}