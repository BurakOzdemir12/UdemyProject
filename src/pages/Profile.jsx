import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { urlProfileUpdate, urlUserCourses } from "../endpoints";
import useResponseUseFetch from "../hooks/useResponseUseFetch";
import CoursesFilter from "../components/filters/CourseFilter";
import UserWelcomeSection from "../components/UserWelcomeSection";
import { useAuth } from "../context/AuthContext";
import UpdateProfileModal from "../components/modals/ProfileUpdateModal";
import { Container } from "reactstrap";
import { putData } from "../services/apiServices";
import ProfileUpdateModal from "../components/modals/ProfileUpdateModal";

const Profile = () => {
  const { data: courses, loading, error } = useResponseUseFetch(urlUserCourses);
  const { user, updateProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <Box sx={{ padding: 5 }}>
      <Container maxWidth="xl">
        <UserWelcomeSection
          title="Öğrenim İçeriğiniz,"
          user={user}
          onEditProfile={() => setIsModalOpen(true)}
        />

        <ProfileUpdateModal
          user={user}
          updateProfile={updateProfile}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Kurslar */}
        {loading ? (
          <Typography>Yükleniyor...</Typography>
        ) : error && error.response?.status !== 404 ? (
          <Typography>Hata: {error.message}</Typography>
        ) : (
          <Box>
            {courses && courses.length > 0 ? (
              <CoursesFilter title="Kurslarımda ara" courses={courses} />
            ) : (
              <Typography>Kayıtlı kurs bulunamadı.</Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
