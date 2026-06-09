import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic and redirect to student portal
    navigate("/home");
  };

  return (
    <div className="login-page">
      {/* Background overlay */}
      <div className="login-bg">
        <div className="login-bg-overlay" />
      </div>

      {/* Card */}
      <div className="login-card">
        <button className="login-back" aria-label="Go back" onClick={() => navigate("/")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Logo */}
        <div className="login-logo">
          <span className="logo-text">
            UST<span className="logo-accent">e</span>S
          </span>
          <p className="login-tagline">Student Portal</p>
        </div>

        {/* Divider */}
        <div className="login-divider" />

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId" className="form-label">Student ID / Username</label>
            <input
              placeholder="Enter your student ID or username"
              id="studentId"
              type="text"
              className="form-input"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                placeholder="Enter your password"
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-row">
            <label className="remember-label">
              <input
                type="checkbox"
                className="remember-checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="remember-box">
                {remember && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                )}
              </span>
              <span className="remember-text">Remember me</span>
            </label>
            <a href="#" className="forgot-link" onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password");
            }}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="login-signup">
          Don't have an account?{" "}
          <a href="#" className="signup-link" onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}