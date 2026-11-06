using LuxeServe.Models.Entities;
using LuxeServe.Repositories;

namespace LuxeServe.Services
{
    public class DishService
    {
        private readonly DishRepository _dishRepository;

        public DishService(DishRepository dishRepository)
        {
            _dishRepository = dishRepository;
        }

        public Task<List<Dish>> GetAllDishesAsync()
        {
            return _dishRepository.GetAllWithImagesAsync();
        }

        public Task<Dish?> GetDishByIdAsync(int dishId)
        {
            return _dishRepository.GetByIdAsync(dishId);
        }

        public async Task<bool> CreateDishAsync(Dish dish)
        {
            if (dish.Price < 0 || (dish.Calories.HasValue && dish.Calories < 0))
                return false;

            _dishRepository.Add(dish);
            return await _dishRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateDishAsync(int dishId, string? description, decimal price, int? calories, string? categories)
        {
            if (price < 0 || (calories.HasValue && calories < 0))
                return false;

            var existingDish = await _dishRepository.GetByIdAsync(dishId);
            if (existingDish == null) return false;

            existingDish.Description = description;
            existingDish.Price = price;
            existingDish.Calories = calories;
            existingDish.Categories = categories;

            return await _dishRepository.SaveChangesAsync();
        }
    }
}