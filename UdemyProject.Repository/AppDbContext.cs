using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UdemyProject.Repository.Entities;

namespace UdemyProject.Repository
{
    public class AppDbContext : IdentityDbContext<AppUser,AppRole,Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base (options)
        {

        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        //public DbSet<UserRefreshToken> userRefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Order>()
                    .HasOne(o => o.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(o => o.UserId);

            builder.Entity<Order>()
                .HasOne(o => o.Course)
                .WithMany()
                .HasForeignKey(o => o.CourseId);

            builder.Entity<Payment>()
                .HasOne(o=> o.User)
                .WithMany()
                .HasForeignKey(o => o.UserId);

            builder.Entity<Payment>()
                .HasOne(o=>o.Course)
                .WithMany()
                .HasForeignKey(o => o.CourseId);
        }

    }
}
