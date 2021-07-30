using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        [Required]
        public List<CategoryTranslationDto> CategoryTranslations { get; set; }
    }
}