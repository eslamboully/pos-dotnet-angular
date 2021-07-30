using API.Entities;

namespace API.Interfaces
{
    public interface IJwtService
    {
        string GenerateJSONWebToken(User user);
    }
}