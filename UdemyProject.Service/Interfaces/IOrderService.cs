using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Interfaces
{
    public interface IOrderService
    {
        Task<Response<object>> BuyCourseAsync(Guid userId, int courseId, PurchaseRequestDto purchaseRequestDto);
        Task<Response<List<Course>>> GetUserCoursesAsync(Guid userId);
        Task<Response<List<Order>>> GetOrdersAsync();
        Task<Response<Order>> GetOrderByIdAsync(int id);
        Task<Response<object>> DeleteOrderAsync(int id);
        Task<Response<object>> UpdateOrderAsync(Order order);
    }
}
