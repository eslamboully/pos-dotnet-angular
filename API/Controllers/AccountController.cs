using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;
        public AccountController(DataContext context,IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;

        }
        [HttpPost("register")]
        public async Task<ActionResult<LoggedUserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is Taken");
            
                using var hmac = new HMACSHA512();
                var computePassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));

                var newUser = new User
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Email = registerDto.Email,
                    PasswordHash = computePassword,
                    PasswordSalt = hmac.Key
                };
                await _context.Users.AddAsync(newUser);

                await _context.SaveChangesAsync();

                return new LoggedUserDto
                {
                    Id = newUser.Id,
                    Email = newUser.Email,
                    Token = _jwtService.GenerateJSONWebToken(newUser)
                };
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoggedUserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(user => user.Email == loginDto.Email);
            if (user != null)
            {
                using var hmac = new HMACSHA512(user.PasswordSalt);
                var computePassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for(int i=0;i < computePassword.Length;i++)
                {
                    if (user.PasswordHash[i] != computePassword[i]) return BadRequest("Password is not valid");
                }

                return new LoggedUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Token = _jwtService.GenerateJSONWebToken(user)
                };
            }

            return BadRequest("Email does not exist");
        }

        private async Task<bool> UserExists(string email,int id = 0)
        {
            if (id == 0){
                return await _context.Users.AnyAsync(user => user.Email == email); 
            }
                return await _context.Users.Where(user => user.Id != id).AnyAsync(user => user.Email == email); 
        }
    }
}