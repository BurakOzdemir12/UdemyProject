namespace UdemyProject.Shared.DTOs
{
    public class PurchaseRequestDto
    {
        public decimal Amount { get; set; }
        public decimal TotalPrice { get; set; }
        public string PaymentMethod { get; set; } 
        public string PaymentDetails { get; set; } 
    }
}
