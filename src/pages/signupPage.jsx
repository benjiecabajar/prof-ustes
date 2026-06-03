import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signupPage.css";

const COURSES = [
  "BS Information Technology",
  "BS Technology Communication Management",
  "BS Electro Mechanical Engineering",
];

const YEAR_LEVELS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
const GENDERS = ["Male", "Female", "Prefer not to say"];

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [agreed, setAgreed]             = useState(false);
  const [viewedTerms, setViewedTerms]   = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showErrors, setShowErrors]     = useState(false);
  const [isUsernameManual, setIsUsernameManual] = useState(false);
  const [step, setStep]                 = useState(1); // 1 = personal, 2 = security (mobile)

  const [form, setForm] = useState({
    firstName: "", lastName: "", mi: "",
    dob: "", gender: "", contact: "",
    address: "", studentId: "", course: "", yearLevel: "",
    username: "", email: "", password: "", confirmPassword: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // Auto-suggest username based on name
  useEffect(() => {
    if (!isUsernameManual && (form.firstName || form.lastName)) {
      const suggested = `${form.firstName}${form.lastName ? "." + form.lastName : ""}`
        .toLowerCase()
        .replace(/\s+/g, ""); // Remove spaces
      
      setForm(prev => ({ ...prev, username: suggested }));
    }
  }, [form.firstName, form.lastName, isUsernameManual]);

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

  const isEmailValid = /\S+@\S+/.test(form.email);
  const isContactValid = /^09\d{9}$/.test(form.contact);
  const isStudentIdValid = /^\d+$/.test(form.studentId);
  const isDobValid = form.dob ? (new Date(form.dob) <= new Date(new Date().setFullYear(new Date().getFullYear() - 18))) : false;

  const pwRequirements = [
    { label: " 6+ characters", check: form.password.length >= 6 },
    { label: " Uppercase letter", check: /[A-Z]/.test(form.password) },
    { label: " A number", check: /[0-9]/.test(form.password) },
  ];
  const isPasswordValid = form.password.length >= 6 && pwRequirements.filter(r => r.check).length >= 3;

  const isFormComplete = Object.entries(form).every(([k, v]) => k === 'mi' ? true : v.trim() !== "");
  const isFormValid = isFormComplete && isEmailValid && isPasswordValid && isContactValid && isStudentIdValid && isDobValid && form.password === form.confirmPassword && agreed;

  const isFieldInvalid = (field) => {
    if (!showErrors) return false;
    const val = form[field];
    if (field === 'mi') return false;
    if (!val || val.trim() === "") return true;
    if (field === 'email' && !isEmailValid) return true;
    if (field === 'contact' && !isContactValid) return true;
    if (field === 'dob' && !isDobValid) return true;
    if (field === 'studentId' && !isStudentIdValid) return true;
    if (field === 'password' && !isPasswordValid) return true;
    if (field === 'confirmPassword' && form.password !== form.confirmPassword) return true;
    return false;
  };

  const gClass = (field) => `form-group ${isFieldInvalid(field) ? "error" : ""}`;
  const handleSignup = () => isFormValid ? console.log("Signup successful", form) : setShowErrors(true);

  return (
    <div className="signup-page">
      <div className="signup-bg"><div className="signup-bg-overlay"/></div>

      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <button className="signup-back" aria-label="Go back" onClick={() => navigate("/")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <div className="signup-logo">
            <span className="logo-text">UST<span className="logo-accent">e</span>S</span>
            <p className="signup-tagline">Student Portal</p>
          </div>
          <div style={{ width: 34 }} />
        </div>

        <div className="signup-divider" />

        <p className="signup-form-note" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', margin: '0 24px 12px', lineHeight: '1.5' }}>
          Note: Please ensure all information provided is accurate and matches your official school records.
        </p>

        <div className="signup-warnings-top" style={{ padding: '0 24px', marginBottom: '8px', textAlign: 'center' }}>
          {form.dob && !isDobValid && (
            <p className="match-hint no-match" style={{ marginBottom: '4px', textAlign: 'center', fontWeight: 'bold' }}>✗ Must be at least 18 years old to register</p>
          )}
          {showTermsError && !viewedTerms && (
            <p className="match-hint no-match" style={{ textAlign: 'center', fontWeight: 'bold' }}>✗ Please read the Terms & Conditions before agreeing</p>
          )}
        </div>

        {/* Two-column form */}
        <div className="signup-body">

          {/* ── LEFT: Personal Information ── */}
          <div className={`signup-col ${step === 1 ? "active" : ""}`}>
            <div className="col-label">
              <span className="col-step">01</span>
              Personal Information
            </div>

            <div className="field-row three-col">
              <div className={gClass("firstName") + " grow"}>
                <label className="form-label">First Name *</label>
                <input 
                  placeholder="First name" 
                  className="form-input" 
                  value={form.firstName} 
                  required
                  onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value.replace(/\d/g, "") }))} 
                />
              </div>
              <div className={gClass("lastName") + " grow"}>
                <label className="form-label">Last Name *</label>
                <input 
                  placeholder="Last name" 
                  className="form-input" 
                  value={form.lastName} 
                  required
                  onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value.replace(/\d/g, "") }))} 
                />
              </div>
              <div className={gClass("mi") + " mi-col"}>
                <label className="form-label">M.I. <span className="optional-text">(Optional)</span></label>
                <input 
                  placeholder="M.I." 
                  className="form-input" 
                  maxLength={2} 
                  value={form.mi} 
                  onChange={(e) => setForm(prev => ({ ...prev, mi: e.target.value.replace(/\d/g, "") }))} 
                />
              </div>
            </div>

            <div className="field-row two-col" style={{ marginBottom: '4px' }}>
              <div className={gClass("dob") + " grow"}>
                <label className="form-label">Date of Birth *</label>
                <input className="form-input" type="date" value={form.dob} onChange={set("dob")} required />
              </div>
              <div className={gClass("gender") + " grow"}>
                <label className="form-label">Gender *</label>
                <select className="form-select" value={form.gender} onChange={set("gender")} required>
                  <option value="" disabled>Select Gender</option>
                  {GENDERS.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className={gClass("contact")} style={{ marginBottom: '4px' }}>
              <label className="form-label">Contact Number *</label>
              <input 
                placeholder="09123456789" 
                className="form-input" 
                value={form.contact} 
                onChange={(e) => setForm(prev => ({ ...prev, contact: e.target.value.replace(/\D/g, "") }))} 
                maxLength={11}
                required
                style={form.contact ? { borderColor: isContactValid ? "var(--success)" : "var(--error)" } : {}}
              />
              {form.contact && !isContactValid && (
                <p className="match-hint no-match">✗ Contact must be 11 digits starting with 09</p>
              )}
            </div>

            <div className={gClass("address")} style={{ marginBottom: '4px' }}>
              <label className="form-label">Address *</label>
              <input placeholder="Street, City, Province" className="form-input" value={form.address} onChange={set("address")} required />
            </div>

            <div className={gClass("studentId")} style={{ marginBottom: '4px' }}>
              <label className="form-label">Student ID *</label>
              <input 
                placeholder="202400001" 
                className="form-input" 
                value={form.studentId} 
                onChange={(e) => setForm(prev => ({ ...prev, studentId: e.target.value.replace(/\D/g, "") }))} 
                required
                style={form.studentId ? { borderColor: isStudentIdValid ? "var(--success)" : "var(--error)" } : {}}
              />
              {form.studentId && !isStudentIdValid && (
                <p className="match-hint no-match">✗ Student ID must contain only numbers</p>
              )}
            </div>

            <div className="field-row two-col">
              <div className={gClass("course") + " grow"}>
                <label className="form-label">Course *</label>
                <select className="form-select" value={form.course} onChange={set("course")} required>
                  <option value="" disabled>Select Course</option>
                  {COURSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className={gClass("yearLevel") + " grow"}>
                <label className="form-label">Year Level *</label>
                <select className="form-select" value={form.yearLevel} onChange={set("yearLevel")} required>
                  <option value="" disabled>Year Level</option>
                  {YEAR_LEVELS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Divider (desktop) */}
          <div className="col-separator" />

          {/* ── RIGHT: Account Security ── */}
          <div className={`signup-col ${step === 2 ? "active" : ""}`}>
            <div className="col-label">
              <span className="col-step">02</span>
              Account Security
            </div>

            <div className={gClass("username")}>
              <label className="form-label">Username *</label>
              <input 
                placeholder="Choose a username" 
                className="form-input" 
                value={form.username} 
                required
                onChange={(e) => {
                  set("username")(e);
                  if (e.target.value !== "") setIsUsernameManual(true);
                }} 
              />
            </div>

            <div className={gClass("email")}>
              <label className="form-label">Email Address *</label>
              <input placeholder="example@email.com" className="form-input" type="email" 
                value={form.email} onChange={set("email")} 
                required
                style={form.email ? { borderColor: isEmailValid ? "var(--success)" : "var(--error)" } : {}}
              />
              {form.email && (
                <p className={`match-hint ${isEmailValid ? "match" : "no-match"}`}>
                  {isEmailValid ? "✓ Valid email format" : "✗ Email requires @ and a domain"}
                </p>
              )}
            </div>

            <div className={gClass("password")}>
              <label className="form-label">Password *</label>
              <div className="input-wrapper">
                <input placeholder="Create a strong password" className="form-input" type={showPassword ? "text" : "password"} value={form.password} onChange={set("password")} required />
                <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon open={showPassword}/>
                </button>
              </div>
              {form.password && (
                <div className="password-feedback">
                  <PasswordStrength score={pwRequirements.filter(r => r.check).length} />
                  <div className="pw-requirements">
                    {pwRequirements.map((req, idx) => (
                      <span key={idx} className={`req-chip ${req.check ? "met" : ""}`}>
                        {req.check ? "✓" : "○"} {req.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={gClass("confirmPassword")}>
              <label className="form-label">Confirm Password *</label>
              <div className="input-wrapper">
                <input 
                  placeholder="Re-enter your password"
                  className="form-input" 
                  type={showConfirm ? "text" : "password"} 
                  value={form.confirmPassword} onChange={set("confirmPassword")}
                  required
                  style={form.confirmPassword ? { borderColor: form.password === form.confirmPassword ? "var(--success)" : "var(--error)" } : {}}
                />
                <button type="button" className="input-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  <EyeIcon open={showConfirm}/>
                </button>
              </div>
              {form.confirmPassword && (
                <p className={`match-hint ${form.password === form.confirmPassword ? "match" : "no-match"}`}>
                  {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <label className="terms-label">
              <input 
                type="checkbox" 
                className="terms-checkbox" 
                checked={agreed} 
                onChange={e => {
                  if (!viewedTerms) {
                    setShowTermsError(true);
                    return;
                  }
                  setAgreed(e.target.checked);
                }} 
              />
              <span className={`terms-box ${agreed ? "checked" : ""} ${(showTermsError && !viewedTerms) || (showErrors && !agreed) ? "error" : ""}`}>
                {agreed && <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3"/></svg>}
              </span>
              <span className="terms-text">
                I agree to the{" "}
                <a href="#" className="terms-link" onClick={() => { setViewedTerms(true); setShowTermsError(false); }}>Terms & Conditions</a>
              </span>
            </label>

            <button className="signup-btn" onClick={handleSignup}>
              Create Account
            </button>
          </div>
        </div>

        {/* Mobile step nav */}
        <div className="mobile-steps">
          <button className={`step-pill ${step === 1 ? "active" : ""}`} onClick={() => setStep(1)}>Personal Info</button>
          <button className={`step-pill ${step === 2 ? "active" : ""}`} onClick={() => setStep(2)}>Account Security</button>
        </div>

        <p className="signup-login">Already have an account? <a href="#" className="login-link" onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}>Sign in</a></p>
      </div>
    </div>
  );
}

function PasswordStrength({ score }) {
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const classes = ["", "weak", "fair", "good", "strong"];

  return (
    <div className="pw-strength">
      <div className="pw-bars">
        {[1,2,3,4].map(i => (
          <div key={i} className={`pw-bar ${i <= score ? classes[score] : ""}`}/>
        ))}
      </div>
      <span className={`pw-label ${classes[score]}`}>{labels[score]}</span>
    </div>
  );
}