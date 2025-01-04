using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository;
using UdemyProject.Repository.Entities;
using UdemyProject.Repository.Interfaces;
using UdemyProject.Service.Interfaces;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _dbContext;
        private readonly IOrderRepository _orderRepository;

        public OrderService(AppDbContext dbContext, IOrderRepository orderRepository)
        {
            _dbContext = dbContext;
            _orderRepository = orderRepository;
        }

        public async Task<Response<object>> BuyCourseAsync(Guid userId, int courseId, PurchaseRequestDto purchaseRequestDto)
        {
            var hasPurchased = await _orderRepository.UserHasPurchasedCourseAsync(userId, courseId);
            if (hasPurchased)
            {
                return Response<object>.Fail("Bu kurs zaten satın alınmış.", 400, true);
            }

            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                
                var order = new Order
                {
                    UserId = userId,
                    CourseId = courseId,
                    OrderDate = DateTime.UtcNow
                };

                await _orderRepository.AddAsync(order);
                await _dbContext.SaveChangesAsync();

                
                await transaction.CommitAsync();
                return Response<object>.Success(new
                {
                    message = "Kurs başarıyla satın alındı.",
                    courseId = courseId,
                    userId = userId,
                    orderId = order.Id,
                    orderDate = order.OrderDate
                }, 201);

            }
            catch(Exception ex)
            {
                await transaction.RollbackAsync();
                return Response<object>.Fail($"Satın alma işlemi sırasında bir hata oluştu: {ex.Message}", 500, true);
            }
        }
        public async Task<Response<List<Course>>> GetUserCoursesAsync(Guid userId)
        {
            var courses = await _orderRepository.GetUserCoursesAsync(userId);

            if (courses == null || !courses.Any())
            {
                return Response<List<Course>>.Fail("No courses found for the user.", 404, true);
            }

            return Response<List<Course>>.Success(courses, 200);
        }
        public async Task<Response<List<Order>>> GetOrdersAsync()
        {
            var orders = await _orderRepository.GetAllAsync();

            if (orders == null || !orders.Any())
            {
                return Response<List<Order>>.Fail("No orders found.", 404, true);
            }

            return Response<List<Order>>.Success(orders, 200);
        }

        public async Task<Response<Order>> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
            {
                return Response<Order>.Fail("Order not found.", 404, true);
            }

            return Response<Order>.Success(order, 200);
        }

        public async Task<Response<object>> DeleteOrderAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
            {
                return Response<object>.Fail("Order not found.", 404, true);
            }

            await _orderRepository.DeleteAsync(id);

            return Response<object>.Success(null, 204); // No Content
        }

        public async Task<Response<object>> UpdateOrderAsync(Order order)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(order.Id);
            if (existingOrder == null)
            {
                return Response<object>.Fail("Order not found.", 404, true);
            }

            existingOrder.CourseId = order.CourseId;
            existingOrder.OrderDate = order.OrderDate;

            await _orderRepository.UpdateAsync(existingOrder);

            return Response<object>.Success(204);
        }
    }
}
