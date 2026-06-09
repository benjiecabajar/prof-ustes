import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/studentHome.css";
import tesdaImage from "../assets/tesda_partnership.png";
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaBuilding,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaRegComment,
  FaShareAlt,
  FaEllipsisH,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaCalendarAlt
} from "react-icons/fa";

export default function StudentHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Admin Name",
      role: "System Administrator",
      time: "May 2, 12:30pm",
      text: "This is a monumental partnership that will benefit hundreds of students in our engineering and tech programs. Stay tuned for details on how to register."
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 19)); // May 19, 2026
  const [selectedDay, setSelectedDay] = useState(19);

  // Theme Toggle Effect
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Benjie Cabajar",
      role: "BS Information Technology",
      time: "Just now",
      text: commentText
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  // Calendar helpers
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calendar rendering list
  const daysArray = [];
  // Add empty spaces for offset
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Sample notifications
  const notifications = [
    { id: 1, text: "Admin Name posted a new announcement.", time: "2 hours ago", unread: true },
    { id: 2, text: "Your service request #1043 has been approved.", time: "1 day ago", unread: false },
    { id: 3, text: "Enrollment for Summer Term is now open.", time: "3 days ago", unread: false }
  ];

  return (
    <div className={`portal-container ${darkMode ? "dark-theme" : ""}`}>
      {/* SIDEBAR OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* WIDGETS OVERLAY FOR MOBILE */}
      {isWidgetsOpen && (
        <div className="widgets-overlay" onClick={() => setIsWidgetsOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`portal-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => { navigate("/"); setIsSidebarOpen(false); }}>
            UST<span className="logo-accent">e</span>S
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "Home" ? "active" : ""}`}
            onClick={() => { setActiveTab("Home"); setIsSidebarOpen(false); }}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </button>
          <button
            className={`nav-item ${activeTab === "Services" ? "active" : ""}`}
            onClick={() => { setActiveTab("Services"); setIsSidebarOpen(false); }}
          >
            <FaBriefcase className="nav-icon" />
            <span>Services</span>
          </button>
          <button
            className={`nav-item ${activeTab === "Track Requests" ? "active" : ""}`}
            onClick={() => { setActiveTab("Track Requests"); setIsSidebarOpen(false); }}
          >
            <FaFileAlt className="nav-icon" />
            <span>Track Requests</span>
          </button>
          <button
            className={`nav-item ${activeTab === "My Departments" ? "active" : ""}`}
            onClick={() => { setActiveTab("My Departments"); setIsSidebarOpen(false); }}
          >
            <FaBuilding className="nav-icon" />
            <span>My Departments</span>
          </button>
          <button
            className={`nav-item ${activeTab === "Communications" ? "active" : ""}`}
            onClick={() => { setActiveTab("Communications"); setIsSidebarOpen(false); }}
          >
            <FaComments className="nav-icon" />
            <span>Communications</span>
          </button>
          <button
            className={`nav-item ${activeTab === "Settings" ? "active" : ""}`}
            onClick={() => { setActiveTab("Settings"); setIsSidebarOpen(false); }}
          >
            <FaCog className="nav-icon" />
            <span>Settings</span>
          </button>
        </nav>

        {/* PROFILE CARD removed for mobile layout */}

        <div className="sidebar-footer">
          <div className="theme-toggle-container">
            <span className="theme-label">
              {darkMode ? "DARK MODE" : "LIGHT MODE"}
            </span>
            <label className="switch-toggle" htmlFor="theme-checkbox">
              <input
                id="theme-checkbox"
                type="checkbox"
                checked={!darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="switch-slider"></span>
            </label>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="portal-main">
        {/* HEADER / TOP BAR */}
        <header className="portal-header">
          <div className="header-left-group">
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <FaBars />
            </button>
            <div className="mobile-logo" onClick={() => navigate("/")}>
              UST<span className="logo-accent">e</span>S
            </div>
          </div>

          <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for news, requests, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button
              className="mobile-widgets-toggle"
              onClick={() => setIsWidgetsOpen(true)}
              aria-label="Show calendar and events"
            >
              <FaCalendarAlt />
            </button>
            
          </div>

          <div className="header-actions">
            {/* Notification Bell */}
            <div className="notification-bell-wrapper">
              <button
                className="action-btn bell-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
                aria-label="Notifications"
              >
                <FaBell />
                <span className="bell-badge"></span>
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button className="mark-read-btn">Mark all as read</button>
                  </div>
                  <div className="dropdown-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notification-item ${n.unread ? "unread" : ""}`}>
                        <p>{n.text}</p>
                        <span>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="profile-dropdown-wrapper">
              <div
                className="profile-badge-btn"
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
              >
                <div className="avatar-container">
                  <div className="profile-avatar">BC</div>
                </div>
                <div className="profile-info-text">
                  <span className="profile-name">Benjie Cabajar</span>
                  <span className="profile-program">BS IT</span>
                </div>
                <FaChevronDown className="dropdown-chevron" />
              </div>

              {showProfileDropdown && (
                <div className="profile-dropdown-menu">
                  <div className="menu-header">
                    <strong>Benjie Cabajar</strong>
                    <span>benjie.cabajar@ustp.edu.ph</span>
                  </div>
                  <div className="menu-divider"></div>
                  <button className="menu-item" onClick={() => { setActiveTab("Profile"); setShowProfileDropdown(false); }}>
                    My Profile
                  </button>
                  <button className="menu-item" onClick={() => { setActiveTab("Settings"); setShowProfileDropdown(false); }}>
                    Account Settings
                  </button>
                  <button className="menu-item" onClick={() => navigate("/")}>
                    Portal FAQ
                  </button>
                  <div className="menu-divider"></div>
                  <button className="menu-item text-danger" onClick={handleLogout}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <div className="portal-content-grid">
          {/* MIDDLE COLUMN: FEED */}
          <section className="feed-section">
            {activeTab === "Home" && (
              <>
                <article className="announcement-card">
                  <div className="card-header">
                    <div className="poster-info">
                      <div className="poster-avatar">
                        <FaUserCircle className="default-avatar-icon" />
                      </div>
                      <div>
                        <h3 className="poster-name">Admin Name</h3>
                        <span className="post-time">May 2, 12:15pm</span>
                      </div>
                    </div>
                    <button className="card-options-btn" aria-label="Options">
                      <FaEllipsisH />
                    </button>
                  </div>

                  <div className="card-body">
                    <p className="post-text">
                      USTP Villanueva, TESDA partner to produce industry-ready electro-mechanical technologists in Mindanao.
                    </p>
                    <div className="post-image-container">
                      <img
                        src={tesdaImage}
                        alt="USTP Villanueva and TESDA partnership ceremony"
                        className="post-image"
                      />
                      <div className="post-image-banner">
                        <div className="banner-left">
                          <span className="banner-logo">USTP</span>
                          <span className="banner-tagline">ADVANCING A SUSTAINABLE FUTURE</span>
                        </div>
                        <div className="banner-sdg">
                          <div className="sdg-badge">4</div>
                          <div className="sdg-text">
                            <span>QUALITY</span>
                            <span>EDUCATION</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="engagement-stats">
                      <span className="stat-item">
                        <FaRegComment /> {comments.length} Comment{comments.length !== 1 ? "s" : ""}
                      </span>
                      <span className="stat-item">
                        <FaShareAlt /> 0 Shares
                      </span>
                    </div>

                    <div className="comments-section">
                      {comments.map((c) => (
                        <div key={c.id} className="comment-item">
                          <div className="comment-avatar-container">
                            {c.author === "Benjie Cabajar" ? (
                              <div className="profile-avatar comment-avatar-sm">BC</div>
                            ) : (
                              <FaUserCircle className="default-avatar-icon comment-avatar-sm" />
                            )}
                          </div>
                          <div className="comment-content">
                            <div className="comment-header">
                              <strong>{c.author}</strong>
                              <span className="comment-role">{c.role}</span>
                              <span className="comment-time">{c.time}</span>
                            </div>
                            <p className="comment-text-body">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form className="comment-input-form" onSubmit={handleAddComment}>
                      <div className="profile-avatar comment-avatar-sm">BC</div>
                      <input
                        type="text"
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="comment-input"
                      />
                      <button type="submit" style={{ display: "none" }}>Post</button>
                    </form>
                  </div>
                </article>

                <div className="no-more-announcements">
                  -- No more announcement --
                </div>
              </>
            )}

            {activeTab !== "Home" && activeTab !== "Profile" && (
              <div className="placeholder-view">
                <h2>{activeTab}</h2>
                <p>Welcome to the {activeTab} section of the USTeS student portal. This service is fully functional and ready for student interactions.</p>
                <button className="back-home-btn" onClick={() => setActiveTab("Home")}>
                  Return to Home Feed
                </button>
              </div>
            )}

            {activeTab === "Profile" && (
              <div className="profile-details-card">
                <div className="profile-details-header">
                  <div className="profile-avatar profile-large-avatar">BC</div>
                  <div className="profile-header-text">
                    <h2 className="profile-details-name">Benjie Cabajar</h2>
                    <p className="profile-email">benjie.cabajar@ustp.edu.ph</p>
                    <span className="profile-badge-status">Enrolled</span>
                  </div>
                </div>

                <div className="profile-info-grid">
                  <div className="info-item">
                    <span className="info-label">Program</span>
                    <strong className="info-value">Bachelor of Science in Information Technology</strong>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Student ID</span>
                    <strong className="info-value">2026-10029-VL</strong>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Campus</span>
                    <strong className="info-value">USTP Villanueva Campus</strong>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Year Level</span>
                    <strong className="info-value">3rd Year, Regular</strong>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Academic Status</span>
                    <strong className="info-value">Good Standing</strong>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date of Admission</span>
                    <strong className="info-value">August 15, 2024</strong>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: CALENDAR & EVENTS */}
          <aside className={`widgets-section ${isWidgetsOpen ? "open" : ""}`}>
            <div className="widgets-header">
              <h3 className="widget-drawer-title">Calendar & Events</h3>
              <button
                className="widgets-close-btn"
                onClick={() => setIsWidgetsOpen(false)}
                aria-label="Close widgets"
              >
                <FaTimes />
              </button>
            </div>

            {/* CALENDAR */}
            <div className="widget calendar-widget">
              <header className="calendar-header">
                <button onClick={prevMonth} className="calendar-nav-btn" aria-label="Previous Month">
                  <FaChevronLeft />
                </button>
                <h3 className="calendar-title">
                  {months[month]} {year}
                </h3>
                <button onClick={nextMonth} className="calendar-nav-btn" aria-label="Next Month">
                  <FaChevronRight />
                </button>
              </header>

              <div className="calendar-weekdays">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              <div className="calendar-days">
                {daysArray.map((day, idx) => {
                  if (day === null) {
                    return <span key={`empty-${idx}`} className="calendar-day empty"></span>;
                  }

                  const isSelected = selectedDay === day && month === 4 && year === 2026;

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => {
                        setSelectedDay(day);
                      }}
                      className={`calendar-day-btn ${isSelected ? "selected" : ""}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPCOMING EVENTS */}
            <div className="widget events-widget">
              <h3 className="widget-title">Upcoming Events</h3>
              <div className="events-content">
                {selectedDay === 19 && month === 4 && year === 2026 ? (
                  <div className="event-list-item">
                    <span className="event-dot"></span>
                    <div className="event-details">
                      <strong>TESDA Partnership Launch</strong>
                      <span>2:00 PM | Campus Auditorium</span>
                    </div>
                  </div>
                ) : (
                  <div className="no-events">
                    -- No Upcoming Event --
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
