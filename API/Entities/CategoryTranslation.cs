using System.Text.Json.Serialization;

namespace API.Entities
{
    public class CategoryTranslation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Locale { get; set; }
        [JsonIgnore]
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
    }
}