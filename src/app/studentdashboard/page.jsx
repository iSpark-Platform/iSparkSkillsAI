"use client";
import React, { useState } from "react";

const StudentHome = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredResource, setHoveredResource] = useState(null);
  const [hoveredAnnouncement, setHoveredAnnouncement] = useState(null);

  const today = new Date().toLocaleDateString("en-US", { 
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  // Styles
  const containerStyle = {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8px",
    borderBottom: "1px solid #e2e8f0",
    marginBottom: "16px",
  };

  const welcomeStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const dateStyle = {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const quickCardsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  };

  const cardStyle = (id) => ({
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    boxShadow: hoveredCard === id
      ? "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)"
      : "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    border: "1px solid #f1f5f9",
    position: "relative",
    overflow: "hidden",
    transform: hoveredCard === id ? "translateY(-4px)" : "translateY(0)",
    cursor: "pointer",
  });

  const cardAccentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
  };

  const cardTitleStyle = {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "8px",
    fontWeight: "500",
  };

  const cardValueStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 20px 0",
    paddingBottom: "12px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const taskItemStyle = (id, priority) => ({
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: hoveredTask === id ? "#f1f5f9" : "#fff",
    fontSize: "14px",
    marginBottom: "12px",
    border: `1px solid ${hoveredTask === id ? "#e2e8f0" : "#f1f5f9"}`,
    borderLeft: `4px solid ${priority === "high" ? "#ef4444" : priority === "medium" ? "#EF7C00" : "#10b981"}`,
    transition: "all 0.2s ease",
    transform: hoveredTask === id ? "translateX(4px)" : "translateX(0)",
    cursor: "pointer",
    boxShadow: hoveredTask === id ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
  });

  const taskContentStyle = { flex: 1 };
  const taskTitleStyle = { fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: "0 0 4px 0" };
  const taskMetaStyle = { fontSize: "14px", color: "#64748b", margin: 0 };
  const taskDueDateStyle = { fontSize: "13px", padding: "4px 8px", borderRadius: "4px", fontWeight: "500", marginLeft: "8px" };
  const taskPriorityStyle = { fontSize: "12px", padding: "2px 6px", borderRadius: "4px", fontWeight: "600", textTransform: "uppercase", marginLeft: "8px" };

  const eventItemStyle = (id) => ({
    display: "flex",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: hoveredEvent === id ? "#f1f5f9" : "#fff",
    fontSize: "14px",
    marginBottom: "12px",
    border: `1px solid ${hoveredEvent === id ? "#e2e8f0" : "#f1f5f9"}`,
    transition: "all 0.2s ease",
    transform: hoveredEvent === id ? "translateX(4px)" : "translateX(0)",
    cursor: "pointer",
    boxShadow: hoveredEvent === id ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
  });

  const eventDateStyle = { minWidth: "70px", height: "70px", backgroundColor: "#1640ff", color: "#fff", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginRight: "16px", flexShrink: 0 };
  const eventDayStyle = { fontSize: "24px", fontWeight: "700", margin: 0, lineHeight: 1 };
  const eventMonthStyle = { fontSize: "12px", fontWeight: "500", margin: 0, textTransform: "uppercase" };
  const eventContentStyle = { flex: 1 };
  const eventTitleStyle = { fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: "0 0 4px 0" };
  const eventTypeStyle = { display: "inline-block", fontSize: "12px", padding: "2px 8px", borderRadius: "4px", fontWeight: "600", textTransform: "uppercase" };

  const resourceCardStyle = (id) => ({
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: hoveredResource === id
      ? "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)"
      : "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    border: "1px solid #f1f5f9",
    position: "relative",
    overflow: "hidden",
    transform: hoveredResource === id ? "translateY(-4px)" : "translateY(0)",
    cursor: "pointer",
    minWidth: "220px",
    maxWidth: "280px",
  });

  const resourceTitleStyle = { fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: "0 0 8px 0" };
  const resourceMetaStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#64748b" };

  const announcementItemStyle = (id) => ({
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: hoveredAnnouncement === id ? "#f1f5f9" : "#fff",
    fontSize: "14px",
    marginBottom: "12px",
    border: `1px solid ${hoveredAnnouncement === id ? "#e2e8f0" : "#f1f5f9"}`,
    borderLeft: "4px solid #EF7C00",
    transition: "all 0.2s ease",
    transform: hoveredAnnouncement === id ? "translateX(4px)" : "translateX(0)",
    cursor: "pointer",
    boxShadow: hoveredAnnouncement === id ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
  });

  const announcementTitleStyle = { fontSize: "16px", fontWeight: "600", color: "#1e293b", margin: "0 0 8px 0" };
  const announcementContentStyle = { fontSize: "14px", color: "#475569", margin: "0 0 8px 0", lineHeight: 1.5 };
  const announcementMetaStyle = { fontSize: "12px", color: "#64748b", display: "flex", justifyContent: "space-between", alignItems: "center" };

  // SVG Icons (User, Date, Clipboard, Calendar, Folder, Megaphone)
  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1640ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const DateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const ClipboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="4" rx="1" ry="1"></rect>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const FolderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const MegaphoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18m-9-9v18"></path>
      <path d="M5.71 5.71 12 12l6.29-6.29"></path>
      <path d="M18.37 18.37 12 12l-6.37 6.37"></path>
    </svg>
  );

  // Sample data
  const tasks = [
    { id: 1, title: "Mathematics Chapter 5 Quiz", class: "Mathematics - Grade 5", due: "Today, 5:00 PM", priority: "high" },
    { id: 2, title: "Science Lab Report", class: "Science - Grade 5", due: "Tomorrow", priority: "medium" },
    { id: 3, title: "History Essay: The Roman Empire", class: "History - Grade 5", due: "Dec 15, 2023", priority: "low" },
  ];

  const events = [
    { id: 1, title: "Math Exam", date: "25", month: "Nov", type: "exam" },
    { id: 2, title: "Science Fair", date: "30", month: "Nov", type: "event" },
    { id: 3, title: "Sports Day", date: "05", month: "Dec", type: "event" },
  ];

  const recommendedResources = [
    { id: 1, title: "Interactive Algebra Practice", type: "Website", rating: 4.8 },
    { id: 2, title: "Biology: The Study of Life", type: "Video", rating: 4.9 },
    { id: 3, title: "World War II Timeline", type: "Article", rating: 4.7 },
  ];

  const announcements = [
    { id: 1, title: "Winter Break Schedule", content: "School will be closed from Dec 20 to Jan 5. Please ensure all assignments are submitted before the break.", date: "2 days ago", priority: "high" },
    { id: 2, title: "New Library Resources", content: "The school library has added 50 new educational resources available for both teachers and students.", date: "5 days ago", priority: "medium" },
  ];

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={welcomeStyle}><UserIcon />Welcome, Alex Johnson</h1>
        <span style={dateStyle}><DateIcon />{today}</span>
      </div>

      {/* Quick Overview Cards */}
      <div style={quickCardsStyle}>
        {[ 
          { id: 1, title: "Courses Enrolled", value: "6", color: "#1640ff" },
          { id: 2, title: "Today's Classes", value: "3", color: "#EF7C00" },
          { id: 3, title: "Pending Assignments", value: "4", color: "#1640ff" },
          { id: 4, title: "Upcoming Exams", value: "2", color: "#EF7C00" },
          { id: 5, title: "Notifications", value: "5", color: "#10b981" },
        ].map(card => (
          <div key={card.id} style={cardStyle(card.id)}
               onMouseEnter={() => setHoveredCard(card.id)}
               onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ ...cardAccentStyle, backgroundColor: card.color }} />
            <span style={cardTitleStyle}>{card.title}</span>
            <h2 style={cardValueStyle}>{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Tasks Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}><ClipboardIcon /> Pending Assignments</h2>
        {tasks.map(task => (
          <div key={task.id} style={taskItemStyle(task.id, task.priority)}
               onMouseEnter={() => setHoveredTask(task.id)}
               onMouseLeave={() => setHoveredTask(null)}>
            <div style={taskContentStyle}>
              <h3 style={taskTitleStyle}>{task.title}</h3>
              <p style={taskMetaStyle}>{task.class}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{...taskDueDateStyle, backgroundColor: "#f1f5f9"}}>{task.due}</span>
              <span style={{...taskPriorityStyle, backgroundColor: task.priority === "high" ? "#fee2e2" : task.priority === "medium" ? "#ffedd5" : "#d1fae5", color: task.priority === "high" ? "#b91c1c" : task.priority === "medium" ? "#c2410c" : "#047857"}}>{task.priority}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Events Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}><CalendarIcon /> Upcoming Events</h2>
        {events.map(event => (
          <div key={event.id} style={eventItemStyle(event.id)}
               onMouseEnter={() => setHoveredEvent(event.id)}
               onMouseLeave={() => setHoveredEvent(null)}>
            <div style={eventDateStyle}>
              <p style={eventDayStyle}>{event.date}</p>
              <p style={eventMonthStyle}>{event.month}</p>
            </div>
            <div style={eventContentStyle}>
              <h3 style={eventTitleStyle}>{event.title}</h3>
              <span style={eventTypeStyle}>{event.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Resources */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}><FolderIcon /> Recommended Resources</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {recommendedResources.map(res => (
            <div key={res.id} style={resourceCardStyle(res.id)}
                 onMouseEnter={() => setHoveredResource(res.id)}
                 onMouseLeave={() => setHoveredResource(null)}>
              <h3 style={resourceTitleStyle}>{res.title}</h3>
              <div style={resourceMetaStyle}>
                <span>{res.type}</span>
                <span>{res.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}><MegaphoneIcon /> Announcements</h2>
        {announcements.map(ann => (
          <div key={ann.id} style={announcementItemStyle(ann.id)}
               onMouseEnter={() => setHoveredAnnouncement(ann.id)}
               onMouseLeave={() => setHoveredAnnouncement(null)}>
            <h3 style={announcementTitleStyle}>{ann.title}</h3>
            <p style={announcementContentStyle}>{ann.content}</p>
            <div style={announcementMetaStyle}>
              <span>{ann.date}</span>
              <span>{ann.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
