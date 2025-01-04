import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { urlCourses } from "../endpoints";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import UserWelcomeSection from "../components/UserWelcomeSection";
import CoursesFilter from "../components/filters/CourseFilter";
import { useAuth } from "../context/AuthContext";
import ProfileUpdateModal from "../components/modals/ProfileUpdateModal";
import { updateProfile } from "../services/apiServices";
import { ClipLoader } from "react-spinners";
const Home = () => {
  const { data: courses, loading, error } = useFetch(urlCourses);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ClipLoader color="#007BFF" size={180} />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <p>Error: {error.message}</p>
      </Box>
    );
  return (
    <Box>
      <Container  maxWidth="xl">
        <Header
          title="İhtiyacınız olan tüm yetkinlikler tek bir yerde"
          subtitle="Kritik yetkinliklerden teknik konulara kadar çeşitli alanları kapsayan Udemy, profesyonel gelişiminizi destekler."
        />
        <Box mt={5} mb={5}>
          <UserWelcomeSection title={"Tekrar hoş geldiniz, "}  user={user}
          onEditProfile={() => setIsModalOpen(true)} />
          <ProfileUpdateModal
          user={user}
          updateProfile={updateProfile}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        </Box>
        <CoursesFilter title={"Dilediğinizi şeyi aratın"} hideAddToCart courses={courses} />
      </Container>
    </Box>
  );
};

export default Home;
