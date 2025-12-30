// src/components/ProfilePage.jsx - 100% WORKING VERSION
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";
import { Package, User, Mail, Phone, Calendar, BookOpen, Edit, ArrowLeft } from "lucide-react";
import { getProfile } from "../services/userService";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, profile, logout, setProfile } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Profile data fetch backend se
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.token) {
        try {
          setLoading(true);
          const profileData = await getProfile(user.token);
          if (profileData.status === "Success") {
            setProfile(profileData.data);
            setEnrolledCourses(profileData.data.enrolledCourses || []);
          } else {
            console.log("Profile fetch failed:", profileData.error);
            setError(profileData.error || "Failed to load profile");
            // If invalid token, logout
            if (profileData.error === "Invalid token") {
              logout();
              navigate("/login");
            }
          }
        } catch (err) {
          console.error("Profile fetch error:", err);
          setError("Failed to load profile");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.token, setProfile]);

  const avatarText = user?.email?.slice(0, 2).toUpperCase() || "WL";
  const handleBack = () => navigate(-1);

  // Loading state
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  // Error or no user
  if (error || !user) {
    return (
      <div className="profile-error">
        <h2>Profile not available</h2>
        <p>Please login again</p>
        <button onClick={() => navigate("/login")} className="back-button">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            Back
          </button>
          
          <div className="profile-info">
            <div className="profile-avatar">{avatarText}</div>
            <div className="profile-details">
              <h1 className="profile-name">
                {profile?.user?.name || user.email || 'User'}
              </h1>
              <div className="profile-contact">
                <div className="contact-item">
                  <Mail size={20} />
                  <span>{user.email}</span>
                </div>
                {profile?.user?.mobile && (
                  <div className="contact-item">
                    <Phone size={20} />
                    <span>{profile.user.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button className="edit-button" onClick={() => navigate("/edit-profile")}>
            <Edit size={20} />
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-header">
              <User size={20} />
              Total Courses
            </div>
            <h2 className="stat-value">{enrolledCourses.length}</h2>
          </div>
          
          <div className="stat-card stat-success">
            <div className="stat-header">
              <BookOpen size={20} />
              Completed
            </div>
            <h2 className="stat-value">0</h2>
          </div>
          
          <div className="stat-card stat-warning">
            <div className="stat-header">
              <Calendar size={20} />
              Active
            </div>
            <h2 className="stat-value">{enrolledCourses.length}</h2>
          </div>
        </div>

        {/* Courses Section */}
        <div className="courses-section">
          <h2 className="section-title">
            <Package size={28} />
            My Enrolled Courses
          </h2>
          
          {enrolledCourses.length > 0 ? (
            <div className="courses-grid">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-thumbnail">
                    <div className="progress-badge">In Progress</div>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">
                      {course.course_name || course.title || 'Course Title'}
                    </h3>
                    <div className="course-meta">
                      {course.start_date && course.end_date && (
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>
                            {new Date(course.start_date).toLocaleDateString()} - 
                            {new Date(course.end_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {course.fees && (
                        <div className="meta-item">
                          <span>₹{course.fees}</span>
                        </div>
                      )}
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '65%' }} />
                    </div>
                    <button className="continue-button">
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Package size={64} className="empty-icon" />
              <h3 className="empty-text">No courses enrolled yet</h3>
              <p>Browse our courses and start learning today!</p>
              <button 
                className="browse-button"
                onClick={() => navigate("/courses")}
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
