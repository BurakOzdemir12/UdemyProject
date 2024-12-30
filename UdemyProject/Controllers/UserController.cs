using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using UdemyProject.Repository.Entities;

namespace UdemyProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;

        public UserController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string fullName,string email, string password, string userName)
        {
            var hasUser = await _userManager.FindByEmailAsync(email);
            if (hasUser != null)
            {
                return BadRequest("Bu mail adresi kullanılıyor");
            }

            var newUser = new AppUser()
            {
                FullName = fullName,
                UserName = userName,
                Email = email,
            };

            var createdUser = await _userManager.CreateAsync(newUser, password);
            if (!createdUser.Succeeded)
            {
                return BadRequest("Kullanıcı Oluşturulamadı");
            }

            await _signInManager.SignInAsync(newUser, isPersistent: false);
            return Ok(newUser);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Kullanıcı bulunamadı");
            }

            var passwordCheck = await _userManager.CheckPasswordAsync(user, password);
            if (!passwordCheck)
            {
                return BadRequest("Email veya şifre yanlış");
            }

            await _signInManager.SignInAsync(user, new AuthenticationProperties()
            {
                IsPersistent = true,
            });

            return Ok();
        }
       
    }
}
