using LuxeServe.Models.Entities;
using LuxeServe.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LuxeServe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DishesController : ControllerBase
    {
        private readonly DishService _dishService;

        public DishesController(DishService dishService)
        {
            _dishService = dishService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Dish>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllDishes()
        {
            var dishes = await _dishService.GetAllDishesAsync();
            return Ok(dishes);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Dish), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDishById(int id)
        {
            var dish = await _dishService.GetDishByIdAsync(id);
            if (dish == null)
            {
                return NotFound(new { Message = $"Dish with ID {id} was not found." });
            }

            return Ok(dish);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Dish), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateDish([FromBody] Dish dish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _dishService.CreateDishAsync(dish);
            if (!success)
            {
                return BadRequest(new { Message = "Failed to create dish. Price and calories cannot be negative." });
            }

            return CreatedAtAction(nameof(GetDishById), new { id = dish.DishId }, dish);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateDish(int id, [FromBody] Dish dishUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _dishService.UpdateDishAsync(
                id,
                dishUpdate.Description,
                dishUpdate.Price,
                dishUpdate.Calories,
                dishUpdate.Categories
            );

            if (!success)
            {
                return NotFound(new { Message = $"Dish with ID {id} was not found or provided invalid values (e.g. negative price/calories)." });
            }

            return Ok(new { Message = "Dish updated successfully.", DishId = id });
        }
    }
}