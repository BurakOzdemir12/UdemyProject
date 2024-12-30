using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Service.Interfaces
{
    public interface IOrderService
    {
        Task<List<Course>> GetUserCoursesAsync(Guid userId);
        Task<List<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(Guid userId,int courseId);
        Task DeleteOrderAsync(int id);
        Task UpdateOrderAsync(Order order);
    }
}
