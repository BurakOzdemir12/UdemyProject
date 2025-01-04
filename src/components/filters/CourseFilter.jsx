import React, { useState, useMemo } from "react";
import { Box, Button, TextField, Pagination, Typography } from "@mui/material";
import CourseCard from "../cards/CourseCard";

const CoursesFilter = ({title, courses, coursesPerPage = 8, hideAddToCart = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <Box>
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
          label={title}
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >{title}
        
        </TextField>
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
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          alignItems: "stretch",
        }}
      >
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => (
            <Box
              key={course.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CourseCard course={course} hideAddToCart={hideAddToCart} />
            </Box>
          ))
        ) : (
          <Typography>Kurs Bulunamadı</Typography>
        )}
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
    </Box>
  );
};

export default CoursesFilter;
