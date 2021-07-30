using System.Collections.Generic;

namespace API.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public List<CategoryTranslation> CategoryTranslations { get; set; }
    }
}