"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  FiHome, 
  FiRadio, 
  FiCompass, 
  FiGrid, 
  FiCheckSquare, 
  FiBookmark, 
  FiFileText,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiClock,
  FiMessageCircle,
  FiChevronDown
} from 'react-icons/fi';
import Link from "next/link";


const DashboardSidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});

  const [maxHeights, setMaxHeights] = useState({});

  const navItems = [
    { name: 'Home', icon: FiHome, path: '/dashboard' },
    { name: 'Teaching Resources', icon: FiRadio, path: '/dashboard/teacherresources'},
    { name: 'Explore', icon: FiCompass, path: '/dashboard/explore' },
    { name: 'Exams & Marks', icon: FiGrid, path: '/dashboard/exams' },
    { name: 'Assignments', icon: FiCheckSquare, path: '/dashboard/test'},
    { name: 'Attendance', icon: FiUsers, path: '/dashboard/attendance' },
    { name: 'Notification', icon: FiBookmark, path: '/dashboard/notification'},
  
  ];

  const subscriptions = [
    { name: 'Rock Smith', initials: 'RS', online: true, path: '/dashboard/subscription' },
    { name: 'Jessica William', initials: 'JW', online: true, path: '/dashboard/subscription' }
  ];

  const bottomItems = [
    { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
    { name: 'Report History', icon: FiClock, path: '/dashboard/reports' },
    { name: 'Send Feedback', icon: FiMessageCircle, path: '/dashboard/feedback' },
    { name: 'Help', icon: FiHelpCircle, path: '/dashboard/help' }
  ];

 
  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  
  useEffect(() => {
    const newHeights = {};
   
    Object.keys(dropdownRefs.current).forEach((key) => {
      const el = dropdownRefs.current[key];
      if (el) {
        const scrollH = el.scrollHeight;
        newHeights[key] = openDropdown === key ? `${scrollH}px` : '0px';
      }
    });
    setMaxHeights(newHeights);
    
  }, [openDropdown, navItems.length]);

  
  useEffect(() => {
   
    const handleResize = () => {
      const newHeights = {};
      Object.keys(dropdownRefs.current).forEach((key) => {
        const el = dropdownRefs.current[key];
        if (el) {
          const scrollH = el.scrollHeight;
          newHeights[key] = openDropdown === key ? `${scrollH}px` : '0px';
        }
      });
      setMaxHeights(newHeights);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openDropdown]);

  return (
    <>
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          {/* Main Navigation */}
          <nav className="main-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isDropdownOpen = openDropdown === item.name;
              return (
                <div key={item.name} className="nav-item-wrapper">
                  {item.children ? (
                    <>
                      {/* Toggle (div used to avoid invalid nesting with Link) */}
                      <div
                        role="button"
                        tabIndex={0}
                        className={`nav-item ${isDropdownOpen ? 'active' : ''}`}
                        onClick={() => toggleDropdown(item.name)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(item.name); }}
                        aria-expanded={isDropdownOpen}
                        aria-controls={`dropdown-${item.name}`}
                      >
                        <div className="nav-item-content">
                          <Icon className="nav-icon" />
                          <span className="nav-text">{item.name}</span>
                        </div>
                        <FiChevronDown
                          className={`dropdown-icon ${isDropdownOpen ? "expanded" : ""}`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Dropdown Menu: animated by inline style maxHeight computed from measured scrollHeight */}
                      <div
                        id={`dropdown-${item.name}`}
                        className={`dropdown-menu-wrapper ${isDropdownOpen ? 'open' : ''}`}
                        style={{ maxHeight: maxHeights[item.name] || '0px' }}
                        ref={(el) => { dropdownRefs.current[item.name] = el; }}
                      >
                        <div className="dropdown-menu">
                          {item.children.map((child) => (
                            <Link 
                              key={child.name} 
                              href={child.path}
                              className="dropdown-link"
                              onClick={() => setActiveItem(child.name)}
                            >
                              <div className={`dropdown-item ${activeItem === child.name ? 'active-child' : ''}`}>
                                {child.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.path} className="nav-link">
                      <div
                        className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                        onClick={() => setActiveItem(item.name)}
                        role="link"
                      >
                        <div className="nav-item-content">
                          <Icon className="nav-icon" />
                          <span className="nav-text">{item.name}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          
      

          {/* Bottom Functions */}
          <div className="bottom-section">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className="bottom-link"
                >
                  <div 
                    className="bottom-item"
                    onClick={() => setActiveItem(item.name)}
                  >
                    <Icon className="bottom-icon" />
                    <span className="bottom-text">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <style jsx>{`
        .dashboard-sidebar {
          width: 240px;
          height: calc(100vh - 60px);
          background-color: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 60px;
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

        /* Main Navigation */
        .main-nav {
          margin-bottom: 24px;
        }

        .nav-item-wrapper {
          width: 100%;
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
          justify-content: space-between;
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
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
          content: '';
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

        .dropdown-icon {
          width: 16px;
          height: 16px;
          color: #6b7280;
          transition: transform 0.22s ease;
          flex-shrink: 0;
        }

        .dropdown-icon.expanded {
          transform: rotate(180deg);
        }

       
        .dropdown-menu-wrapper {
          overflow: hidden;
          transition: max-height 0.28s cubic-bezier(.2,.9,.2,1);
          max-height: 0;
        }

        .dropdown-menu {
          width: 100%;
          background-color: #f9fafb;
          padding: 8px 0;
          border-left: 1px solid rgba(0,0,0,0.02);
        }

        .dropdown-link {
          width: 100%;
          display: block;
          text-decoration: none;
        }

        .dropdown-item {
          width: 100%;
          padding: 12px 20px 12px 52px;
          cursor: pointer;
          transition: background 0.16s ease, padding-left 0.16s ease;
          text-align: left;
          font-size: 13px;
          color: #6b7280;
          font-weight: 400;
          position: relative;
        }

        .dropdown-item::before {
          content: '•';
          position: absolute;
          left: 38px;
          color: #9ca3af;
          font-size: 16px;
        }

        .dropdown-item:hover {
          background-color: #f3f4f6;
          color: #1f2937;
          padding-left: 54px;
        }

        .dropdown-item:hover::before {
          color: #c62828;
          left: 40px;
        }

        .dropdown-item.active-child {
          background-color: #e8eefb;
          color: #1f2d6f;
        }

        /* Subscriptions Section */
        .subscriptions-section {
          margin-bottom: 24px;
          padding: 0 20px;
        }

        .section-header {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .subscription-link {
          width: 100%;
          display: block;
          text-decoration: none;
        }

        .subscription-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 8px 0;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-align: left;
        }

        .subscription-item:hover {
          opacity: 0.7;
        }

        .subscription-avatar {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .online-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 8px;
          height: 8px;
          background-color: #4744efff;
          border: 2px solid #ffffff;
          border-radius: 50%;
        }

        .subscription-name {
          font-size: 14px;
          font-weight: 400;
          color: #1f2937;
        }

        /* Bottom Section */
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
          background: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-align: left;
        }

        .bottom-item:hover {
          opacity: 0.7;
        }

        .bottom-icon {
          width: 18px;
          height: 18px;
          margin-right: 14px;
          color: #6b7280;
          flex-shrink: 0;
        }

        .bottom-text {
          font-size: 14px;
          font-weight: 400;
          color: #1f2937;
        }

        /* Scrollbar styling */
        .dashboard-sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .dashboard-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .dashboard-sidebar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 3px;
        }

        .dashboard-sidebar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: 260px;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardSidebar;