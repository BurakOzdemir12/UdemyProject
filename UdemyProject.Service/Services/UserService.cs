using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UdemyProject.Repository.Entities;
using UdemyProject.Service.Interfaces;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;

        public UserService(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        public Task AddRoleToUser()
        {
            throw new NotImplementedException();
        }


        public async Task<Response<AppUserDto>> UserRegisterAsync( CreateUserDto createUserDto)
        {
            var user = new AppUser
            {
                Email = createUserDto.Email,
                UserName = createUserDto.UserName,
                FullName = createUserDto.FullName,
            };

            var hasUser = await _userManager.FindByEmailAsync(createUserDto.Email);

            if (hasUser != null)
            {
                return Response<AppUserDto>.Fail("Kullanıcı zaten mevcut.", 400, true);
            }

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return Response<AppUserDto>.Fail(string.Join(", ", errors), 400, true);
            }

            await AssignDefaultRoleToUser(user);

            return Response<AppUserDto>.Success(new AppUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName,
            }, 200);
        }

        private async Task AssignDefaultRoleToUser(AppUser user)
        {
            const string defaultRole = "user";

            if (!await _roleManager.RoleExistsAsync(defaultRole))
            {
                await _roleManager.CreateAsync(new AppRole { Name = defaultRole });
            }

            await _userManager.AddToRoleAsync(user, defaultRole);
        }

        public async Task<Response<AppUserDto>> GetUserProfileAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return Response<AppUserDto>.Fail("Kullanıcı bulunamadı.", 404, true);
            }

            return Response<AppUserDto>.Success(new AppUserDto
            {
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email
            }, 200);
        }


        public async Task<Response<AppUserDto>> UpdateUserAsync(Guid userId, UpdateUserDto updateUserDto)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return Response<AppUserDto>.Fail("Kullanıcı bulunamadı.", 404, true);
            }

            user.UserName = updateUserDto.UserName ?? user.UserName;
            user.FullName = updateUserDto.FullName ?? user.FullName;
            user.Email = updateUserDto.Email ?? user.Email;

            if (!string.IsNullOrEmpty(updateUserDto.NewPassword))
            {
                var result = await _userManager.ChangePasswordAsync(user, updateUserDto.CurrentPassword, updateUserDto.NewPassword);
                if (!result.Succeeded)
                {
                    return Response<AppUserDto>.Fail("Şifre güncellemesi başarısız.", 400, true);
                }
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return Response<AppUserDto>.Fail("Kullanıcı güncellemesi başarısız.", 400, true);
            }

            return Response<AppUserDto>.Success(new AppUserDto
            {
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email
            }, 200);
        }


    }

}