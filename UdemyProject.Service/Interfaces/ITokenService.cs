using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Shared.Configurations;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Interfaces
{
    public interface ITokenService
    {
        TokenDto createToken(AppUser userApp);
        ClientTokenDto createClientToken(Client client);
    }
}
