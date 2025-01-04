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
        Task<Response<AppUserDto>>UserRegisterAsync( CreateUserDto createUserDto);
        Task<Response<AppUserDto>> UpdateUserAsync(Guid userId, UpdateUserDto updateUserDto);
        Task<Response<AppUserDto>> GetUserProfileAsync(Guid userId);
        Task AddRoleToUser();

    }
}
