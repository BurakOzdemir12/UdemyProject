namespace UdemyProject.Repository.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instructor { get; set; }
        public Decimal Price { get; set; }

        //public string UserId { get; set; } = default!;

    }
}
