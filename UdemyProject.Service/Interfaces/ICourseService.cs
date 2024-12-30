using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Service.Interfaces
{
    public  interface ICourseService
    {
        Task<List<Course>> GetCoursesAsync();
        Task<Course> GetCourseByIdAsync(int id);
        Task AddCourseAsync(Course course);
        Task DeleteCourseAsync(int id);
        Task UpdateCourseAsync(Course course);
    }
}
