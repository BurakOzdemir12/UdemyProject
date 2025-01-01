using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UdemyProject.Repository.Entities;
using UdemyProject.Service.Interfaces;

namespace UdemyProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost("buy/{courseId}")]
        public async Task<IActionResult> BuyCourse(int courseId)
        {
            //var userIdString = User.FindFirst("sub")?.Value;
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            await _orderService.AddOrderAsync(userId, courseId);
            return Ok("Kurs başarıyla satın alındı.");
        }

        [HttpGet("my-courses")]
        public async Task<IActionResult> GetUserCourses()
        {
          // var userIdString = User.FindFirst("sub")?.Value;
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var courses = await _orderService.GetUserCoursesAsync(userId);
            return Ok(courses);
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _orderService.GetOrdersAsync();
            return Ok(courses);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _orderService.GetOrderByIdAsync(id);
            if (course == null)
            {
                return NotFound("Sipariş bulunamadı");
            }
            return Ok(course);

        }
       
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Order order)
        {
            if (id != order.Id)
            {
                return BadRequest("Sipariş uyuşmuyor");
            }
            var existCourse = await _orderService.GetOrderByIdAsync(id);
            if (existCourse == null)
            {
                return NotFound("Kurs bulunamadı");
            }
            await _orderService.UpdateOrderAsync(order);
            return Ok(existCourse);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existCourse = await _orderService.GetOrderByIdAsync(id);
            if (existCourse == null)
                return NotFound("Silinecek kurs bulunamadı.");

            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }
    }
}
