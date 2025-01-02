using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> ProcessPaymentAsync(decimal amount, string paymentDetails);
        Task AddPaymentAsync(Guid userId, int courseId, decimal amount, string status);
        Task<Response<List<Payment>>>GetUserPaymentsAsync(Guid userId);
    }
}
