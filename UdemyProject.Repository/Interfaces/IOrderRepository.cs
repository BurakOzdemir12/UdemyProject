using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Repository.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> UserHasPurchasedCourseAsync(Guid userId, int courseId);

        Task<List<Course>> GetUserCoursesAsync(Guid userId);

        Task<List<Order>> GetAllAsync();
        Task<Order> GetByIdAsync(int id);
        Task AddAsync(Order order);
        Task DeleteAsync(int id);
        Task UpdateAsync(Order order);
    }
}
