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
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task AddPaymentAsync(Guid userId, int courseId, decimal amount, string status)
        {
            var payment = new Payment
            {
                UserId = userId,
                CourseId = courseId,
                Amount = amount,
                PaymentDate = DateTime.UtcNow,
                PaymentStatus = status,
                PaymentMethod = "Credit Card" // Sabit örnek
            };

            await _paymentRepository.AddPaymentAsync(payment);
        }

        public async Task<List<Payment>> GetUserPaymentsAsync(Guid userId)
        {
            return await _paymentRepository.GetUserPaymentsAsync(userId);
        }

        public async Task<bool> ProcessPaymentAsync(decimal amount, string paymentDetails)
        {
            await Task.Delay(500); // Ödeme simülasyonu
            return !string.IsNullOrEmpty(paymentDetails) && amount > 0;
        }
    }
}
