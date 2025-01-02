using System.Security.Claims;

namespace UdemyProject.API.Middlewares
{
    public class UserIdMiddleware
    {
        private readonly RequestDelegate _next;

        public UserIdMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.User.Identity != null && context.User.Identity.IsAuthenticated)
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!string.IsNullOrEmpty(userId) && Guid.TryParse(userId, out var userIdGuid))
                {
                    // UserId'yi HttpContext.Items'a ekliyoruz
                    context.Items["UserId"] = userIdGuid;
                }
            }

            await _next(context); // Bir sonraki middleware'e geç
        }
    }


}
