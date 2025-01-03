const baseUrl = process.env.REACT_APP_API_URL;

export const urlCourses = `${baseUrl}/api/Course`;
console.log("API URL:", process.env.REACT_APP_API_URL);
console.log("Courses URL:", urlCourses);
