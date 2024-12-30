using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UdemyProject.API.DTOs;
using UdemyProject.Service.Interfaces;

namespace UdemyProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequestDto request)
        {
            if (request == null || request.Amount <= 0) {
                return BadRequest("Geçersiz Ödeme Bilgisi");
                    }
            var userIdString = User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }
            var isPaymentSuccessful = await _paymentService
                .ProcessPaymentAsync(request.Amount, request.PaymentDetails);

            var status = isPaymentSuccessful ? "Success" : "Failed";

            await _paymentService.AddPaymentAsync(userId, request.CourseId, request.Amount, status);

            if (isPaymentSuccessful) {
                return Ok();//new { Message="Ödeme Başarılı"}
            }
            return BadRequest();//new { Message = "Ödeme Başarısız" }
        }

        [HttpGet("my-payments")]
        [Authorize]
        public async Task<IActionResult> GetUserPayments()
        {
            var userIdString = User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var payments = await _paymentService.GetUserPaymentsAsync(userId);
            return Ok(payments);
        }

        /*

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequestDto request)
        {
            if (request == null || request.Amount <= 0)
            {
                return BadRequest("Geçersiz Ödeme Bilgisi");
            }

            var userId = "AnonymousUser"; // Kimlik doğrulama olmadığı için sabit userId kullanılıyor

            var isPaymentSuccessful = await _paymentService.ProcessPaymentAsync(request.Amount, request.PaymentDetails);
            var status = isPaymentSuccessful ? "Success" : "Failed";

            await _paymentService.AddPaymentAsync(userId, request.CourseId, request.Amount, status);

            if (isPaymentSuccessful)
            {
                return Ok(new { Message = "Ödeme Başarılı" });
            }

            return BadRequest(new { Message = "Ödeme Başarısız" });
        }

        [HttpGet("my-payments")]
        public async Task<IActionResult> GetUserPayments()
        {
            var userId = "AnonymousUser"; // Kimlik doğrulama olmadığı için sabit userId kullanılıyor
            var payments = await _paymentService.GetUserPaymentsAsync(userId);
            return Ok(payments);
        }
        */

    }
}
