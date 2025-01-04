using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Repository.Interfaces;
using UdemyProject.Service.Interfaces;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task AddPaymentAsync(Guid userId, int courseId, decimal amount, decimal totalPrice,string status)
        {
            var payment = new Payment
            {
                UserId = userId,
                CourseId = courseId,
                Amount = 1,
                TotalPrice = totalPrice,
                PaymentDate = DateTime.UtcNow,
                PaymentStatus = status,
                PaymentMethod = "Credit Card" // Sabit örnek
            };

            await _paymentRepository.AddPaymentAsync(payment);
        }

        public async Task<Response<List<Payment>>> GetUserPaymentsAsync(Guid userId)
        {
            var payments = await _paymentRepository.GetUserPaymentsAsync(userId);

            if (payments == null || !payments.Any())
            {
                return Response<List<Payment>>.Fail("No payments found for the user.", 404, true);
            }

            return Response<List<Payment>>.Success(payments, 200);
        }


        public async Task<bool> ProcessPaymentAsync(decimal amount, string paymentDetails)
        {
            await Task.Delay(500); // Ödeme simülasyonu
            return !string.IsNullOrEmpty(paymentDetails) && amount > 0;
        }

       
    }
}
