import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { urlCourses } from "../endpoints";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import UserWelcomeSection from "../components/UserWelcomeSection";

const Home = () => {
  const { data: courses, loading, error } = useFetch(urlCourses);
  const { user, logout } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 8;

  const categories = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map((course) => course.category))];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === null || course.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [filteredCourses, currentPage, coursesPerPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box 
    sx={{
      padding:{
        xl:10,
        xxl:10,
        md:5,
      }
    }}>
      <Container maxWidth="xl">
        <Header
          title="İhtiyacınız olan tüm yetkinlikler tek bir yerde"
          subtitle="Kritik yetkinliklerden teknik konulara kadar çeşitli alanları kapsayan Udemy, profesyonel gelişiminizi destekler.
"
        />
        <Box mt={5} mb={5}>
          <UserWelcomeSection user={user} />
          
        </Box>
        {/* Arama Alanı */}
        <Box
          sx={{
            maxWidth: "75%",
            display: "flex",
            gap: 2,
            marginBottom: 2,
            "@media (max-width:1024px)": { maxWidth: "100%" },
          }}
        >
          <TextField
            label="Dilediğiniz şeyi arayın"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Kategoriler */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginBottom: 4,
            justifyContent: "center",
          }}
        >
          <Button
            variant={!selectedCategory ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(null)}
          >
            Tümü
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Box>

        {/* Kurs Listesi */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // Mobil
              sm: "repeat(2, 1fr)", // Tablet
              md: "repeat(3, 1fr)", // Orta ekran
              lg: "repeat(4, 1fr)", // Büyük ekran
            },
            alignItems: "stretch",
          }}
        >
          {paginatedCourses.map((course) => (
            <Box
              key={course.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CourseCard course={course} />
            </Box>
          ))}
        </Box>

        {/* Sayfalandırma */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <Pagination
            count={Math.ceil(filteredCourses.length / coursesPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
