using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using UdemyProject.Repository.Entities;
using UdemyProject.Service.Interfaces;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserDto createUserDto)
        {
            var response = await _userService.UserRegisterAsync(createUserDto);

            if (!response.IsSuccessful)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = response.Error.Errors
                });
            }

            return Ok(new
            {
                success = true,
                message = "Kullanıcı başarıyla oluşturuldu.",
                user = response.Data
            });
        }
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto updateUserDto)
        {
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            var response = await _userService.UpdateUserAsync(userId, updateUserDto);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            // Middleware tarafından eklenen UserId'yi kontrol ediyoruz
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            // UserService'den kullanıcı bilgilerini alıyoruz
            var response = await _userService.GetUserProfileAsync(userId);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }

    }
}
