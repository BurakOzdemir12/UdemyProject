using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UdemyProject.Repository.Entities;
using UdemyProject.Service.Interfaces;

namespace UdemyProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _courseService.GetCoursesAsync();
            return Ok(courses);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null)
            {
                return NotFound("Kurs bulunamadı");
            }
            return Ok(course);

        }
        [HttpPost]
        //[Authorize(Roles ="Admin")]
        public async Task<IActionResult> Create([FromForm] Course course)
        {
            course.Id = 0;
            if (course == null)
            {
                return BadRequest("Geçersiz Kurs Bilgisi");
            }
            await _courseService.AddCourseAsync(course);
            return CreatedAtAction(nameof(Get), course);
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] Course course)
        {
            if (id!= course.Id)
            {
                return BadRequest("Kurs id'si uyuşmuyor");
            }

            var existCourse = await _courseService.GetCourseByIdAsync(id);
            if(existCourse==null)
            {
                return NotFound("Kurs bulunamadı");
            }
            await _courseService.UpdateCourseAsync(course);
            return Ok(existCourse);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var existCourse = await _courseService.GetCourseByIdAsync(id);
            if (existCourse == null)
                return NotFound("Silinecek kurs bulunamadı.");

            await _courseService.DeleteCourseAsync(id);
            return NoContent();
        }
    }
}