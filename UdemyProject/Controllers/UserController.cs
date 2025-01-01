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
        public async Task<IActionResult> Register([FromForm]CreateUserDto createUserDto)
        {
            var user =  await _userService.UserRegisterAsync(createUserDto);
            return Ok(user);

        }
        
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var user= await _userService.GetUserByMail(HttpContext.User.Identity.Name);
            return Ok(user);
        }
    }
}
