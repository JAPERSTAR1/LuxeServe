using LuxeServe.Models.Entities;
using LuxeServe.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LuxeServe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TablesController : ControllerBase
    {
        private readonly TableService _tableService;

        public TablesController(TableService tableService)
        {
            _tableService = tableService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Table>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllTables()
        {
            var tables = await _tableService.GetAllTablesAsync();
            return Ok(tables);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Table), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTableById(int id)
        {
            var table = await _tableService.GetTableByIdAsync(id);
            if (table == null)
            {
                return NotFound(new { Message = $"Table with ID {id} was not found." });
            }

            return Ok(table);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Table), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateTable([FromBody] Table table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _tableService.CreateTableAsync(table);
            if (!success)
            {
                return BadRequest(new { Message = "Failed to create table. Seating capacity must be greater than 0." });
            }

            return CreatedAtAction(nameof(GetTableById), new { id = table.TableId }, table);
        }

        [HttpPatch("{id:int}/seats")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTableSeats(int id, [FromBody] int newSeats)
        {
            if (newSeats <= 0)
            {
                return BadRequest(new { Message = "Seats capacity must be greater than 0." });
            }

            var success = await _tableService.UpdateTableSeatsAsync(id, newSeats);
            if (!success)
            {
                return NotFound(new { Message = $"Table with ID {id} was not found or seating capacity is invalid." });
            }

            return Ok(new { Message = "Table seats updated successfully.", TableId = id, Seats = newSeats });
        }
    }
}