using Microsoft.AspNetCore.Mvc;
using IT04.Backend.Models;
using System.Text.RegularExpressions;

namespace IT04.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IT04Controller : ControllerBase
    {
        private static readonly List<IT04Model> _dataStore = new();

        [HttpPost("save")]
        public ActionResult<SaveResponse> SaveData([FromBody] IT04Model data)
        {
            var errors = ValidateFormData(data);
            
            if (errors.Count > 0)
            {
                return BadRequest(new { success = false, errors = errors });
            }

            // Generate unique ID
            data.Id = "ID" + DateTime.Now.Ticks;
            data.CreatedAt = DateTime.Now;
            
            // Save to in-memory store
            _dataStore.Add(data);

            var response = new SaveResponse
            {
                Success = true,
                Message = "save data success",
                Id = data.Id
            };

            return Ok(response);
        }

        private List<ValidationError> ValidateFormData(IT04Model data)
        {
            var errors = new List<ValidationError>();

            // Validate First Name
            if (string.IsNullOrWhiteSpace(data.FirstName))
            {
                errors.Add(new ValidationError { Field = "FirstName", Message = "First Name is required" });
            }

            // Validate Last Name
            if (string.IsNullOrWhiteSpace(data.LastName))
            {
                errors.Add(new ValidationError { Field = "LastName", Message = "Last Name is required" });
            }

            // Validate Email
            if (string.IsNullOrWhiteSpace(data.Email))
            {
                errors.Add(new ValidationError { Field = "Email", Message = "Email is required" });
            }
            else if (!IsValidEmail(data.Email))
            {
                errors.Add(new ValidationError { Field = "Email", Message = "Email format is invalid" });
            }

            // Validate Phone
            if (string.IsNullOrWhiteSpace(data.Phone))
            {
                errors.Add(new ValidationError { Field = "Phone", Message = "Phone is required" });
            }
            else if (!IsValidPhone(data.Phone))
            {
                errors.Add(new ValidationError { Field = "Phone", Message = "Phone must be 10 digits" });
            }

            // Validate Sex
            if (string.IsNullOrWhiteSpace(data.Sex))
            {
                errors.Add(new ValidationError { Field = "Sex", Message = "Sex is required" });
            }

            // Validate Birth Day
            if (string.IsNullOrWhiteSpace(data.BirthDay))
            {
                errors.Add(new ValidationError { Field = "BirthDay", Message = "Birth Day is required" });
            }
            else if (!IsValidDate(data.BirthDay))
            {
                errors.Add(new ValidationError { Field = "BirthDay", Message = "Birth Day format must be DD/MM/YYYY" });
            }

            // Validate Occupation
            if (string.IsNullOrWhiteSpace(data.Occupation))
            {
                errors.Add(new ValidationError { Field = "Occupation", Message = "Occupation is required" });
            }

            // Validate Profile
            if (string.IsNullOrWhiteSpace(data.Profile))
            {
                errors.Add(new ValidationError { Field = "Profile", Message = "Profile is required" });
            }

            return errors;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidPhone(string phone)
        {
            return Regex.IsMatch(phone, @"^[0-9]{10}$");
        }

        private bool IsValidDate(string date)
        {
            return Regex.IsMatch(date, @"^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$") &&
                   DateTime.TryParseExact(date, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out _);
        }

        [HttpGet("data")]
        public ActionResult<List<IT04Model>> GetAllData()
        {
            return Ok(_dataStore);
        }
    }
}
