"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiCheckSquare,
  FiFileText,
  FiFolder,
  FiClock,
  FiMessageCircle,
  FiBell,
  FiRadio,
  FiAward,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

const StudentDashboardSidebar = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Correct way to get current path in App Router
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", icon: FiHome, path: "/studentdashboard" },
    { name: "Live Classes", icon: FiRadio, path: "/student-dashboard/live-classes" },
    { name: "Attendance", icon: FiUsers, path: "/student-dashboard/attendance" },
    { name: "Assignments", icon: FiCheckSquare, path: "/student-dashboard/assignments" },
    { name: "Exams & Results", icon: FiFileText, path: "/student-dashboard/exams" },
    { name: "Study Materials", icon: FiFolder, path: "/student-dashboard/materials" },
    { name: "Timetable", icon: FiClock, path: "/student-dashboard/timetable" },
    { name: "Messages & Chat", icon: FiMessageCircle, path: "/student-dashboard/messages" },
    { name: "Notifications", icon: FiBell, path: "/student-dashboard/notifications" },
    { name: "Certificates", icon: FiAward, path: "/student-dashboard/certificates" },
  ];

  const bottomItems = [
    { name: "Settings", icon: FiSettings, path: "/student-dashboard/settings" },
    { name: "Report History", icon: FiClock, path: "/student-dashboard/reports" },
    { name: "Send Feedback", icon: FiMessageCircle, path: "/student-dashboard/feedback" },
    { name: "Help", icon: FiHelpCircle, path: "/student-dashboard/help" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="student-dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="app-title">Student Portal</h1>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <FiBell />
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <img src="/user-avatar.jpg" alt="User" className="user-avatar" />
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-content">
            {/* Main Navigation */}
            <nav className="main-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.path} className="nav-link">
                    <div className={`nav-item ${isActive(item.path) ? "active" : ""}`}>
                      <div className="nav-item-content">
                        <Icon className="nav-icon" />
                        <span className="nav-text">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="bottom-section">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.path} className="bottom-link">
                    <div className={`bottom-item ${isActive(item.path) ? "active" : ""}`}>
                      <Icon className="bottom-icon" />
                      <span className="bottom-text">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          {children}
        </main>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .student-dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: "Inter", sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 60px;
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #4b5563;
        }

        .menu-toggle:hover {
          background-color: #f3f4f6;
        }

        .app-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-bell {
          position: relative;
          cursor: pointer;
          color: #6b7280;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          font-weight: 500;
          color: #1f2937;
        }

        .dashboard-content {
          display: flex;
          margin-top: 60px;
          min-height: calc(100vh - 60px);
        }

        .dashboard-sidebar {
          width: 240px;
          background-color: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 60px;
          height: calc(100vh - 60px);
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 900;
          transition: transform 0.3s ease;
        }

        .dashboard-sidebar.closed {
          transform: translateX(-100%);
        }

        .dashboard-sidebar.open {
          transform: translateX(0);
        }

        .sidebar-content {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .nav-link {
          width: 100%;
          display: block;
          text-decoration: none;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 20px;
          cursor: pointer;
          transition: background 0.18s ease;
          position: relative;
          text-align: left;
          user-select: none;
        }

        .nav-item:hover {
          background-color: #f9fafb;
        }

        .nav-item.active {
          background-color: #f0f4ff;
        }

        .nav-item.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #2840c6ff;
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          margin-right: 14px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .nav-item.active .nav-icon {
          color: #2840c6ff;
        }

        .nav-text {
          font-size: 14px;
          font-weight: 400;
          color: #1f2937;
        }

        .nav-item.active .nav-text {
          color: #282bc6ff;
          font-weight: 500;
        }

        .bottom-section {
          margin-top: auto;
          padding: 0 20px;
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
        }

        .bottom-link {
          width: 100%;
          display: block;
          text-decoration: none;
        }

        .bottom-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 0;
          cursor: pointer;
          transition: background 0.18s ease;
          position: relative;
          text-align: left;
          user-select: none;
        }

        .bottom-item:hover {
          background-color: #f9fafb;
        }

        .bottom-item.active {
          background-color: #f0f4ff;
        }

        .bottom-item.active::before {
          content: "";
          position: absolute;
          left: -20px;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #2840c6ff;
        }

        .bottom-icon {
          width: 18px;
          height: 18px;
          margin-right: 14px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .bottom-item.active .bottom-icon {
          color: #2840c6ff;
        }

        .bottom-text {
          font-size: 14px;
          font-weight: 400;
          color: #1f2937;
        }

        .bottom-item.active .bottom-text {
          color: #282bc6ff;
          font-weight: 500;
        }

        .main-content {
          flex: 1;
          padding: 24px;
          background-color: #f8fafc;
          transition: margin-left 0.3s ease;
        }

        .main-content.sidebar-open {
          margin-left: 240px;
        }

        .main-content.sidebar-closed {
          margin-left: 0;
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: 260px;
          }
          .main-content.sidebar-open {
            margin-left: 0;
          }
          .user-name {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboardSidebar;
