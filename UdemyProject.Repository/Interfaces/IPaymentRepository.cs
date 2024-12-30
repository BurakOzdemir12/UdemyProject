using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Repository.Interfaces
{
    public interface IPaymentRepository
    {
        Task AddPaymentAsync(Payment payment);
        Task<List<Payment>> GetUserPaymentsAsync(Guid userId);
    }
}
