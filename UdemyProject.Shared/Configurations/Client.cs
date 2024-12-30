using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UdemyProject.Shared.Configurations
{
    public class Client
    {
        public string Id { get; set; }

        public string Secret { get; set; }

        public List<String> Audinces { get; set; }
    }
}
