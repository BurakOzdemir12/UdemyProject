using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Interfaces
{
    public interface IUserService
    {
        Task<AppUserDto>UserRegisterAsync( CreateUserDto createUserDto);
        Task<AppUserDto> GetUserByMail(string email);
        Task AddRoleToUser();

    }
}
