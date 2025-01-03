namespace UdemyProject.Repository.Entities
{
    public enum CourseCategory
    {
        YazilimGelistirme,
        Isletme,
        FinansVeMuhasebe,
        BTveYazilim,
        OfisteVerimlilik,
        KisiselGelisim,
        Tasarim,
        Pazarlama,
        SaglikVeFitness,
        Muzik
    }
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instructor { get; set; }
        public Decimal Price { get; set; }

        public CourseCategory Category { get; set; } 

        //public string UserId { get; set; } = default!;

    }
}
