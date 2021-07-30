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
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;
        public CategoriesController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<Category>>> Index()
        {
            return await _context.Categories.Include(c=>c.CategoryTranslations).ToListAsync();
        }

        [HttpGet("show/{id:int}")]
        public async Task<ActionResult<Category>> Show(int id)
        {
            return await _context.Categories.Include(c => c.CategoryTranslations).SingleOrDefaultAsync(c=>c.Id == id);
        }
        
        [HttpPost("store")]
        public async Task<ActionResult> Store(CategoryDto categoryDto)
        {
            var newCategory = new Category
            {
                CategoryTranslations = categoryDto.CategoryTranslations.Select(category => new CategoryTranslation
                {
                    Name = category.Name,
                    Locale = category.Locale,
                }).ToList()
            };
            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(CategoryDto categoryDto)
        {
            var category = await _context.Categories.Include(c=>c.CategoryTranslations).SingleOrDefaultAsync(c => c.Id == categoryDto.Id);
                category.CategoryTranslations = categoryDto.CategoryTranslations.Select(category => new CategoryTranslation
                {
                    Name = category.Name,
                    Locale = category.Locale,
                }).ToList(); 

            _context.Update(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("delete/{id:int}")]
        public async Task<ActionResult> Delete (int id)
        {
            var category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}