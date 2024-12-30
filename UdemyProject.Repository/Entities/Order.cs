using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UdemyProject.Repository.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int CourseId { get; set; }
        public DateTime OrderDate { get; set; }

        public AppUser User { get; set; }
        public Course Course { get; set; }
    }
}
