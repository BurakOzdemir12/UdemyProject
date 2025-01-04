const baseUrl = process.env.REACT_APP_API_URL;

export const urlCourses = `${baseUrl}/api/Course`;
export const urlUserCourses= `${baseUrl}/api/Order/user-courses`;
export const urlUserPayments= `${baseUrl}/api/Order/user-payments`;
export const urlProfileUpdate= `${baseUrl}/api/User/update-profile
`;

console.log("API URL:", process.env.REACT_APP_API_URL);
console.log("Courses URL:", urlCourses);
