using LuxeServe.Data;
using LuxeServe.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Repositories
{
    public class DishRepository
    {
        private readonly LuxeServeDbContext _context;

        public DishRepository(LuxeServeDbContext context)
        {
            _context = context;
        }

        public async Task<List<Dish>> GetAllWithImagesAsync()
        {
            return await _context.Dishes
                .AsNoTracking()
                .Include(d => d.DishImages)
                .ToListAsync();
        }

        public async Task<Dish?> GetByIdAsync(int dishId)
        {
            return await _context.Dishes
                .Include(d => d.DishImages)
                .FirstOrDefaultAsync(d => d.DishId == dishId);
        }

        public void Add(Dish dish) => _context.Dishes.Add(dish);

        public void Update(Dish dish) => _context.Dishes.Update(dish);

        public void Delete(Dish dish) => _context.Dishes.Remove(dish);

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}