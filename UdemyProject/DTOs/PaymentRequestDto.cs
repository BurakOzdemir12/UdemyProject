namespace UdemyProject.API.DTOs
{
    public class PaymentRequestDto
    {
        public decimal Amount { get; set; }
        public int CourseId { get; set; }
        public string PaymentDetails { get; set; }
    }
}
