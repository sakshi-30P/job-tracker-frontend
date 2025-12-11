import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImage") || null
  );

  const [editableUser, setEditableUser] = useState(user);

  const [resume, setResume] = useState("");

  // Load resume on mount
  useEffect(() => {
    const savedResume = localStorage.getItem("userResume");

    if (user?.resume) {
      setResume(user.resume);
    } else if (savedResume) {
      setResume(savedResume);
    }
  }, [user]);

  // Profile Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // Resume Upload (PDF)
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;

      setResume(dataUrl);

      // For old compatibility
      localStorage.setItem("userResume", dataUrl);

      // ⭐ NEW — Save resume inside user object also
      const updatedUser = { ...editableUser, resume: dataUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditableUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  // Input change
  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(editableUser));
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="pro-container">
      <div className="pro-card">

        {/* Header section */}
        <div className="pro-header">
          <div className="pro-avatar">
            {profileImg ? (
              <img src={profileImg} alt="Profile" />
            ) : (
              editableUser?.name?.charAt(0)?.toUpperCase()
            )}
          </div>

          <label className="pro-upload">
            Change Photo
            <input type="file" onChange={handleImageUpload} />
          </label>

          <h2>{editableUser?.name}</h2>
          <p className="pro-email">{editableUser?.email}</p>
        </div>

        <hr className="pro-divider" />

        {/* Form Section */}
        <div className="pro-form">

          <div className="pro-input">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={editableUser?.name}
              onChange={handleChange}
            />
          </div>

          <div className="pro-input">
            <label>Email</label>
            <input type="email" disabled value={editableUser?.email} />
          </div>

          <div className="pro-input">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={editableUser?.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          {/* Resume Upload */}
          <div className="pro-input">
            <label>Resume (PDF)</label>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
          </div>

          {/* Resume Preview */}
          {resume && (
            <div className="pro-resume">
              <a href={resume} target="_blank" rel="noreferrer">
                📄 View Uploaded Resume
              </a>
            </div>
          )}

          <button className="pro-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
