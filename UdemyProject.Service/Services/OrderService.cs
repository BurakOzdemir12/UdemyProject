using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Repository.Interfaces;
using UdemyProject.Service.Interfaces;

namespace UdemyProject.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task AddOrderAsync(Guid userId, int courseId)
        {
            var order = new Order
            {
                UserId = userId,
                CourseId = courseId,
                OrderDate = DateTime.UtcNow
            };

            await _orderRepository.AddAsync(order);
        }

        public async Task DeleteOrderAsync(int id)
        {
            await _orderRepository.DeleteAsync(id);
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetByIdAsync(id);
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _orderRepository.GetAllAsync();
        }

        public async Task<List<Course>> GetUserCoursesAsync(Guid userId)
        {
            return await _orderRepository.GetUserCoursesAsync(userId);
        }

        public async Task UpdateOrderAsync(Order order)
        {
            await _orderRepository.UpdateAsync(order);
        }
    }
}
