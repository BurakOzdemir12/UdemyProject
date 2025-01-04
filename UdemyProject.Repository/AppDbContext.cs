using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Repository
{
    public class AppDbContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<UserRefreshToken> userRefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedData.Seed(builder);

            // UserRefreshToken Configuration
            builder.Entity<UserRefreshToken>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Code).IsRequired();
                entity.Property(e => e.Expiration).IsRequired();
            });

            // Order Configuration
            builder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            builder.Entity<Order>()
                .HasOne(o => o.Course)
                .WithMany()
                .HasForeignKey(o => o.CourseId);

            // Payment Configuration
            builder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId);

            builder.Entity<Payment>()
                .HasOne(p => p.Course)
                .WithMany()
                .HasForeignKey(p => p.CourseId);

            builder.Entity<Course>()
     .Property(c => c.Price)
     .HasPrecision(18, 2); // 18 toplam basamak, 2 ondalık basamak

            builder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            builder.Entity<Payment>()
                .Property(p => p.TotalPrice)
                .HasPrecision(18, 2);
        }

        
        
    }
    public static class SeedData
    {
        public static void Seed(ModelBuilder builder)
        {
            // Password Hasher
            var passwordHasher = new PasswordHasher<AppUser>();

            // Users
            var users = new List<AppUser>
            {
                new AppUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "user1",
                    NormalizedUserName = "USER1",
                    Email = "user1@example.com",
                    NormalizedEmail = "USER1@EXAMPLE.COM",
                    EmailConfirmed = true,
                    FullName = "John Doe",
                    PasswordHash = passwordHasher.HashPassword(null, "Password123!"),
                    SecurityStamp = Guid.NewGuid().ToString()
                },
                new AppUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "user2",
                    NormalizedUserName = "USER2",
                    Email = "user2@example.com",
                    NormalizedEmail = "USER2@EXAMPLE.COM",
                    EmailConfirmed = true,
                    FullName = "Jane Doe",
                    PasswordHash = passwordHasher.HashPassword(null, "Password123!"),
                    SecurityStamp = Guid.NewGuid().ToString()
                },
                new AppUser
                {
                    Id = Guid.NewGuid(),
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@example.com",
                    NormalizedEmail = "ADMIN@EXAMPLE.COM",
                    EmailConfirmed = true,
                    FullName = "Admin User",
                    PasswordHash = passwordHasher.HashPassword(null, "AdminPassword123!"),
                    SecurityStamp = Guid.NewGuid().ToString()
                }
            };

            builder.Entity<AppUser>().HasData(users);

            // Courses
            var courses = new List<Course>
            {
                new Course { Id = 1, Name = "C# Basics", Description = "Learn C# from scratch", Instructor = "John Smith", Price = 99.99m, Category = CourseCategory.YazilimGelistirme },
                new Course { Id = 2, Name = "React for Beginners", Description = "Master React", Instructor = "Jane Smith", Price = 79.99m, Category = CourseCategory.Tasarim },
                new Course { Id = 3, Name = "ASP.NET Core", Description = "Build web applications", Instructor = "Mark Wilson", Price = 119.99m, Category = CourseCategory.YazilimGelistirme },
                new Course { Id = 4, Name = "Python for Data Science", Description = "Data analysis with Python", Instructor = "Emily Johnson", Price = 89.99m, Category = CourseCategory.BTveYazilim },
                new Course { Id = 5, Name = "Java Basics", Description = "Learn Java from zero", Instructor = "David Lee", Price = 69.99m, Category = CourseCategory.YazilimGelistirme },
                new Course { Id = 6, Name = "Machine Learning", Description = "AI and Machine Learning", Instructor = "Sophia Brown", Price = 149.99m, Category = CourseCategory.KisiselGelisim },
                new Course { Id = 7, Name = "Digital Marketing", Description = "Marketing strategies", Instructor = "Chris Green", Price = 59.99m, Category = CourseCategory.Pazarlama },
                new Course { Id = 8, Name = "Photography", Description = "Learn photography basics", Instructor = "Laura White", Price = 39.99m, Category = CourseCategory.KisiselGelisim },
                new Course { Id = 9, Name = "Music Production", Description = "Produce your own music", Instructor = "James Black", Price = 129.99m, Category = CourseCategory.Muzik },
                new Course { Id = 10, Name = "Fitness and Wellness", Description = "Stay healthy", Instructor = "Olivia Blue", Price = 49.99m, Category = CourseCategory.SaglikVeFitness }
            };

            builder.Entity<Course>().HasData(courses);

            // Orders
            var orders = new List<Order>
            {
                new Order { Id = 1, UserId = users[0].Id, CourseId = 1, OrderDate = DateTime.UtcNow },
                new Order { Id = 2, UserId = users[1].Id, CourseId = 2, OrderDate = DateTime.UtcNow },
                new Order { Id = 3, UserId = users[0].Id, CourseId = 3, OrderDate = DateTime.UtcNow },
            };

            builder.Entity<Order>().HasData(orders);

            // Payments
            var payments = new List<Payment>
            {
                new Payment { Id = 1, UserId = users[0].Id, CourseId = 1, TotalPrice = 99.99m, Amount = 99.99m, PaymentDate = DateTime.UtcNow, PaymentStatus = "Completed", PaymentMethod = "Credit Card" },
                new Payment { Id = 2, UserId = users[1].Id, CourseId = 2, TotalPrice = 79.99m, Amount = 79.99m, PaymentDate = DateTime.UtcNow, PaymentStatus = "Completed", PaymentMethod = "PayPal" },
                new Payment { Id = 3, UserId = users[0].Id, CourseId = 3, TotalPrice = 119.99m, Amount = 119.99m, PaymentDate = DateTime.UtcNow, PaymentStatus = "Completed", PaymentMethod = "Credit Card" }
            };

            builder.Entity<Payment>().HasData(payments);
        }
    }
}
