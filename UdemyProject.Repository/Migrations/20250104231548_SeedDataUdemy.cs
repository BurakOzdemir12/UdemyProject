using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace UdemyProject.Repository.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataUdemy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FullName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { new Guid("187970c8-36f0-44db-9f17-6305d8813770"), 0, "75ded145-661f-40d5-9164-13257271a8e9", new DateTime(2025, 1, 4, 23, 15, 46, 888, DateTimeKind.Utc).AddTicks(6453), "user2@example.com", true, "Jane Doe", false, null, "USER2@EXAMPLE.COM", "USER2", "AQAAAAIAAYagAAAAEL0Ii6Dl0tzf5XYzD8ybq2MVJz2SlOgUgzN5gxdWrsZ8iJD4wvLBFCPu+FagcmlyCg==", null, false, "efa7cdc1-edcd-4b9a-8626-bb9619be8df3", false, "user2" },
                    { new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc"), 0, "23168afa-169d-48b2-9849-baf0d6c69caf", new DateTime(2025, 1, 4, 23, 15, 46, 810, DateTimeKind.Utc).AddTicks(318), "user1@example.com", true, "John Doe", false, null, "USER1@EXAMPLE.COM", "USER1", "AQAAAAIAAYagAAAAELSxn5Do/O1dyhFSDBN03OWETdvN+xZk9Rlb/1U8Czpnj0hgg00H0c6qlb+Lar+0zA==", null, false, "03824288-c110-4672-b455-2e6e442ba684", false, "user1" },
                    { new Guid("f034198b-25ae-4ea2-99dc-1af0b20b8e50"), 0, "cc2b6620-14c1-4e81-b767-c49b629940d8", new DateTime(2025, 1, 4, 23, 15, 46, 987, DateTimeKind.Utc).AddTicks(4905), "admin@example.com", true, "Admin User", false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEGHHZG3wgodKpa73iinhN/lhzdYjv8Fq3zhC+f9PlPfEwIAxEWp6qP7pTZYSXTCw8w==", null, false, "98d25609-f029-40db-9184-7d7befcf28e9", false, "admin" }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "Category", "Description", "Instructor", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 0, "Learn C# from scratch", "John Smith", "C# Basics", 99.99m },
                    { 2, 6, "Master React", "Jane Smith", "React for Beginners", 79.99m },
                    { 3, 0, "Build web applications", "Mark Wilson", "ASP.NET Core", 119.99m },
                    { 4, 3, "Data analysis with Python", "Emily Johnson", "Python for Data Science", 89.99m },
                    { 5, 0, "Learn Java from zero", "David Lee", "Java Basics", 69.99m },
                    { 6, 5, "AI and Machine Learning", "Sophia Brown", "Machine Learning", 149.99m },
                    { 7, 7, "Marketing strategies", "Chris Green", "Digital Marketing", 59.99m },
                    { 8, 5, "Learn photography basics", "Laura White", "Photography", 39.99m },
                    { 9, 9, "Produce your own music", "James Black", "Music Production", 129.99m },
                    { 10, 8, "Stay healthy", "Olivia Blue", "Fitness and Wellness", 49.99m }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CourseId", "OrderDate", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3147), new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc") },
                    { 2, 2, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3154), new Guid("187970c8-36f0-44db-9f17-6305d8813770") },
                    { 3, 3, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3157), new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc") }
                });

            migrationBuilder.InsertData(
                table: "Payments",
                columns: new[] { "Id", "Amount", "CourseId", "PaymentDate", "PaymentMethod", "PaymentStatus", "TotalPrice", "UserId" },
                values: new object[,]
                {
                    { 1, 99.99m, 1, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3234), "Credit Card", "Completed", 99.99m, new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc") },
                    { 2, 79.99m, 2, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3244), "PayPal", "Completed", 79.99m, new Guid("187970c8-36f0-44db-9f17-6305d8813770") },
                    { 3, 119.99m, 3, new DateTime(2025, 1, 4, 23, 15, 47, 76, DateTimeKind.Utc).AddTicks(3247), "Credit Card", "Completed", 119.99m, new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("f034198b-25ae-4ea2-99dc-1af0b20b8e50"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("187970c8-36f0-44db-9f17-6305d8813770"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("9d33bb88-8f9e-468e-a99a-e3116960d9cc"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
