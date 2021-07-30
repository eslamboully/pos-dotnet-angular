using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CategoryTranslationDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Locale { get; set; }
    }
}