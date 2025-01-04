using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UdemyProject.Repository.Entities;
using UdemyProject.Service.Interfaces;
using UdemyProject.Service.Services;
using UdemyProject.Shared.DTOs;

namespace UdemyProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;

        public OrderController(IOrderService orderService, IPaymentService paymentService)
        {
            _orderService = orderService;
            _paymentService = paymentService;
        }

        [HttpPost("buy/{courseId}")]
        public async Task<IActionResult> BuyCourse(int courseId, [FromBody] PurchaseRequestDto purchaseRequest)
        {/*
            var isPaymentSuccessful = await _paymentService.ProcessPaymentAsync(purchaseRequest.Amount, purchaseRequest.PaymentDetails);
            if (!isPaymentSuccessful)
            {
                return BadRequest("Ödeme başarısız oldu.");
            }
            */
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            var response = await _orderService.BuyCourseAsync(userId, courseId, purchaseRequest);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            await _paymentService.AddPaymentAsync(userId, courseId,purchaseRequest.TotalPrice ,purchaseRequest.Amount,  "Success");

            return Ok(response);
        }

       

        [HttpGet("user-courses")]
        public async Task<IActionResult> GetUserCourses()
        {
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            var response = await _orderService.GetUserCoursesAsync(userId);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }

        [HttpGet("user-payments")]
        public async Task<IActionResult> GetUserPayments()
        {
            //var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            /*
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }
            */
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            var response = await _paymentService.GetUserPaymentsAsync(userId);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _orderService.GetOrdersAsync();

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _orderService.GetOrderByIdAsync(id);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Order order)
        {
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj is not Guid userId)
            {
                return Unauthorized(Response<object>.Fail("Unauthorized access.", 401, true));
            }

            if (id != order.Id)
            {
                return BadRequest(Response<object>.Fail("Order ID mismatch.", 400, true));
            }

            var response = await _orderService.UpdateOrderAsync(order);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _orderService.DeleteOrderAsync(id);

            if (!response.IsSuccessful)
            {
                return StatusCode(response.StatusCode, response);
            }

            return NoContent();
        }
    }
}
