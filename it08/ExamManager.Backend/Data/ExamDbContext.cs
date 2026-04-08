using ExamManager.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamManager.Backend.Data
{
    public class ExamDbContext : DbContext
    {
        public ExamDbContext(DbContextOptions<ExamDbContext> options) : base(options)
        {
        }

        public DbSet<ExamQuestion> ExamQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            modelBuilder.Entity<ExamQuestion>().HasData(
                new ExamQuestion
                {
                    Id = 1,
                    Question = "1.  1+1=?",
                    Answer1 = "1",
                    Answer2 = "2",
                    Answer3 = "3",
                    Answer4 = "4"
                },
                new ExamQuestion
                {
                    Id = 2,
                    Question = "2.  2+2=?",
                    Answer1 = "3",
                    Answer2 = "4",
                    Answer3 = "5",
                    Answer4 = "6"
                }
            );
        }
    }
}
