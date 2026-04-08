namespace IT04.Backend.Models
{
    public class IT04Model
    {
        public string Id { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Sex { get; set; } = string.Empty;
        public string BirthDay { get; set; } = string.Empty;
        public string Occupation { get; set; } = string.Empty;
        public string Profile { get; set; } = string.Empty; // Base64
        public DateTime CreatedAt { get; set; }
    }

    public class SaveResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
    }

    public class ValidationError
    {
        public string Field { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
