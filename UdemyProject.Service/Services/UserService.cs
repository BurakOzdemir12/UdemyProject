using Azure;
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

        public async Task<AppUserDto> UserRegisterAsync(CreateUserDto createUserDto)
        {
            var user = new AppUser { 
                Email = createUserDto.Email, 
                UserName = createUserDto.UserName ,
                FullName = createUserDto.FullName ,
            };
            var hasUser = await _userManager.FindByEmailAsync(createUserDto.Email);

            if (hasUser != null)
            {
                throw new Exception("Kullanıcı mevcut");
            }

            var result = await _userManager.CreateAsync(user, createUserDto.Password);


            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                throw new Exception("Kullanıcı Oluşturulamadı");
            }

            await AssignDefaultRoleToUser(user);

            await _signInManager.SignInAsync(user, isPersistent: false);

            return new AppUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                UserName = user.UserName,
            };

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

        public async Task<AppUserDto> GetUserByMail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new Exception("Böyle Bir Kullanıcı bulunamadı");
            }
            return new AppUserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName
            };
        }
        
    }
}
