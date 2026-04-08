using ExamManager.Backend.Data;
using ExamManager.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamManager.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamController : ControllerBase
    {
        private readonly ExamDbContext _context;

        public ExamController(ExamDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamQuestion>>> GetExams()
        {
            var exams = await _context.ExamQuestions
                .OrderBy(e => e.Id)
                .ToListAsync();

            return Ok(exams);
        }

        [HttpPost]
        public async Task<ActionResult<ExamQuestion>> CreateExam(ExamQuestion exam)
        {
            var maxId = await _context.ExamQuestions.MaxAsync(e => (int?)e.Id) ?? 0;
            var newId = maxId + 1;

            var newExam = new ExamQuestion
            {
                Id = newId,
                Question = $"{newId}. {exam.Question}",
                Answer1 = exam.Answer1,
                Answer2 = exam.Answer2,
                Answer3 = exam.Answer3,
                Answer4 = exam.Answer4
            };

            _context.ExamQuestions.Add(newExam);
            await _context.SaveChangesAsync();

            await RenumberExams();

            return CreatedAtAction(nameof(GetExams), new { id = newExam.Id }, newExam);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _context.ExamQuestions.FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }

            _context.ExamQuestions.Remove(exam);
            await _context.SaveChangesAsync();

            await RenumberExams();

            return NoContent();
        }

        private async Task RenumberExams()
        {
            var exams = await _context.ExamQuestions.OrderBy(e => e.Id).ToListAsync();
            
            for (int i = 0; i < exams.Count; i++)
            {
                var currentQuestion = exams[i].Question;
                var cleanQuestion = System.Text.RegularExpressions.Regex.Replace(currentQuestion, @"^\d+\.\s*", "");
                exams[i].Question = $"{i + 1}. {cleanQuestion}";
            }

            await _context.SaveChangesAsync();
        }
    }
}
