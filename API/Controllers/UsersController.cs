using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async  Task<ActionResult<List<MemberDto>>> Index()
        {
            return await _context.Users.Select(user => new MemberDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            }).ToListAsync();
        }

        [HttpGet("show/{id:int}")]
        public async Task<ActionResult<MemberDto>> Show(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return new MemberDto{
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
        }
        
        [HttpPost("store")]
        public async Task<ActionResult<MemberDto>> Store(UserDto user)
        {
            if (await UserExists(user.Email)) return BadRequest("Email is Taken");

            using var hmac = new HMACSHA512();
                var computePassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                var newUser = new User 
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PasswordHash = computePassword,
                    PasswordSalt = hmac.Key
                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
            

            return new MemberDto
            {
                Id = newUser.Id,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email
            };
        }
        [HttpPut("update")]
        public async Task<ActionResult<MemberDto>> Update(MemberUpdateDto user)
        {
            var existUser = await _context.Users.FindAsync(user.Id);
                existUser.FirstName = user.FirstName;
                existUser.LastName = user.LastName;
                existUser.Email = user.Email;
            
            if (await UserExists(user.Email,user.Id)) return BadRequest("Email is Taken");

            await _context.SaveChangesAsync();
            
            return new MemberDto
            {
                Id = existUser.Id,
                FirstName = existUser.FirstName,
                LastName = existUser.LastName,
                Email = existUser.Email
            };
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<ActionResult> Delete (int id)
        {
            var user = await _context.Users.FindAsync(id);
            _context.Users.Remove(user);

            await _context.SaveChangesAsync();
            return NoContent();
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