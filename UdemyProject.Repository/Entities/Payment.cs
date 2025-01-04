using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UdemyProject.Repository.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public Guid UserId { get; set; } 
        public int CourseId { get; set; }  
        public decimal TotalPrice { get; set; }
        public decimal Amount { get; set; } 
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; } 
        public string PaymentMethod { get; set; } 

        public AppUser User { get; set; } 
        public Course Course { get; set; } 
    }
}
