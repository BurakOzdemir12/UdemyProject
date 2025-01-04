using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UdemyProject.Shared.DTOs
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string CurrentPassword { get; set; } 
        public string NewPassword { get; set; } 
    }
}
