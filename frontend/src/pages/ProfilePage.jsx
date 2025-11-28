import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/profilePage.css";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        
        img.onerror = reject;
      };
      
      reader.onerror = reject;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      setSelectedImg(compressedImage);
      await updateProfile({ profilePic: compressedImage });
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div className="profile-page">
      <Container className="profile-container">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <div className="profile-card">
              <div className="profile-header">
                <h1 className="profile-title">Profile</h1>
                <p className="profile-subtitle">Manage your account information</p>
              </div>

              <div className="profile-avatar-section">
                <div className="avatar-wrapper">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="profile-avatar"
                  />
                  
                  <label
                    htmlFor="avatar-upload"
                    className={`avatar-edit-btn ${isUpdatingProfile ? "disabled" : ""}`}
                  >
                    <Camera size={20} />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                <p className="avatar-hint">
                  {isUpdatingProfile ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Uploading...
                    </>
                  ) : (
                    "Click the camera icon to update your photo"
                  )}
                </p>
              </div>

              <div className="profile-info-section">
                <div className="info-item">
                  <div className="info-label">
                    <User size={18} />
                    <span>Full Name</span>
                  </div>
                  <div className="info-value">
                    {authUser?.fullName}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <Mail size={18} />
                    <span>Email Address</span>
                  </div>
                  <div className="info-value">
                    {authUser?.email}
                  </div>
                </div>
              </div>

              <div className="account-info-section">
                <h2 className="section-title">
                  <Shield size={20} />
                  Account Information
                </h2>

                <div className="account-details">
                  <div className="detail-row">
                    <div className="detail-label">
                      <Calendar size={16} />
                      <span>Member Since</span>
                    </div>
                    <div className="detail-value">
                      {authUser.createdAt?.split("T")[0]}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">
                      <Shield size={16} />
                      <span>Account Status</span>
                    </div>
                    <div className="detail-value status-active">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;