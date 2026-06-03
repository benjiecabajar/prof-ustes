import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/forgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset, 4=success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // OTP input handling
  const handleOtp = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      document.getElementById("otp-5")?.focus();
    }
    e.preventDefault();
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  // Password strength
  const checks = [
    newPassword.length >= 8,
    /[A-Z]/.test(newPassword),
    /[0-9]/.test(newPassword),
    /[^A-Za-z0-9]/.test(newPassword),
  ];
  const strength = checks.filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthClass = ["", "weak", "fair", "good", "strong"][strength];

  const EyeIcon = ({ open }) => open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <div className="fp-page">
      <div className="fp-bg"><div className="fp-bg-overlay" /></div>

      <div className="fp-card">

        {/* Back button */}
        {step < 4 && (
          <button className="fp-back" onClick={() => navigate("/")} aria-label="Go back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className="fp-logo">
          <span className="logo-text">UST<span className="logo-accent">e</span>S</span>
          <p className="fp-tagline">Student Portal</p>
        </div>

        <div className="fp-divider" />

        {/* ── STEP 1: Email ── */}
        {step === 1 && (
          <div className="fp-step">
            <div className="fp-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="fp-title">Forgot Password?</h2>
            <p className="fp-desc">No worries. Enter your registered email address and we'll send you a verification code.</p>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              className="fp-btn"
              disabled={!email.includes("@")}
              onClick={() => { setStep(2); startResendTimer(); }}
            >
              Send Verification Code
            </button>

            <p className="fp-footer-link">
              Remembered it? <a href="/signup">Sign in instead</a>
            </p>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <div className="fp-step">
            <div className="fp-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h2 className="fp-title">Check Your Email</h2>
            <p className="fp-desc">
              We sent a 6-digit code to<br/>
              <strong>{email}</strong>
            </p>

            <div className="otp-group" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className={`otp-input ${digit ? "filled" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtp(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                />
              ))}
            </div>

            <button
              className="fp-btn"
              disabled={otp.some(d => !d)}
              onClick={() => setStep(3)}
            >
              Verify Code
            </button>

            <p className="fp-resend">
              Didn't receive it?{" "}
              {resendTimer > 0
                ? <span className="resend-timer">Resend in {resendTimer}s</span>
                : <button className="resend-btn" onClick={startResendTimer}>Resend code</button>
              }
            </p>
          </div>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 3 && (
          <div className="fp-step">
            <div className="fp-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 className="fp-title">Create New Password</h2>
            <p className="fp-desc">Your new password must be different from your previous password.</p>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrapper">
                <input
                  className="form-input"
                  type={showNew ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <button className="input-toggle" type="button" onClick={() => setShowNew(!showNew)}>
                  <EyeIcon open={showNew} />
                </button>
              </div>
              {newPassword && (
                <div className="pw-strength">
                  <div className="pw-bars">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`pw-bar ${i <= strength ? strengthClass : ""}`} />
                    ))}
                  </div>
                  <span className={`pw-label ${strengthClass}`}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-wrapper">
                <input
                  className="form-input"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  style={confirmPassword ? { borderColor: newPassword === confirmPassword ? "var(--success)" : "var(--error)" } : {}}
                />
                <button className="input-toggle" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {confirmPassword && (
                <p className={`match-hint ${newPassword === confirmPassword ? "match" : "no-match"}`}>
                  {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <button
              className="fp-btn"
              disabled={strength < 2 || newPassword !== confirmPassword}
              onClick={() => setStep(4)}
            >
              Reset Password
            </button>
          </div>
        )}

        {/* ── STEP 4: Success ── */}
        {step === 4 && (
          <div className="fp-step fp-success">
            <div className="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="fp-title">Password Reset!</h2>
            <p className="fp-desc">Your password has been successfully reset. You can now sign in with your new password.</p>
            <button className="fp-btn" onClick={() => window.location.href = "/"}>
              Back to Sign In
            </button>
          </div>
        )}

        {/* Step indicators */}
        {step < 4 && (
          <div className="fp-steps">
            {[1,2,3].map(s => (
              <div key={s} className={`fp-dot ${s === step ? "active" : s < step ? "done" : ""}`} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}